var express = require('express');
var router = express.Router();
async=require("async");


router.get('/:page', function(req, res, next) {
  var con=req.con;
  let startNum = (parseInt(req.params.page)-1)*5;
  async.parallel({
    
      one:function(callback){
        con.query("select * from account limit ?, 5",[ startNum ],function(errors,accounts){
          callback(errors,accounts);
        });
      },

      two:function(callback){
        con.query("select count(*) as tot_count from account",function(errors,account_cnt){
          callback(errors,account_cnt);
        });
      }
    },

    function(err,results){
        var data={accounts:results,current_page:parseInt(req.params.page)};
        console.log(data);
        res.render('index',data);
    }
  )

});

router.get('/search', function(req, res, next) {
  var con=req.con;
  async.parallel(
    [
      function(callback){

        con.query('select * from account where firstname like %'+req.body.query+'%',function(errors,accounts){
          console.log(accounts);
          callback(errors,accounts);
        });

      }
    ],

    function(err,results){
      var data={accounts:results[0]};
      console.log(data);
      res.render('index',data);
    }
  )
});

router.get('/edit/:id', function(req, res, next) {
  var con=req.con;
  async.parallel(
    [
      function(callback){

        con.query('select * from account where id=?',[req.params.id],function(errors,accounts){
          callback(errors,accounts[0]);
        });

      }
    ],

    function(err,results){
      var data={accounts:results[0]};
      res.render('edit',data);
    }
  )
});

router.post('/edit', function(req, res, next) {
  var con=req.con;
  async.parallel(
    [
      function(callback){

        con.query('update account set firstname= ?, lastname= ?, email= ? where id=?',
        [req.body.firstname,req.body.lastname,req.body.email,req.body.id],function(errors,accounts){
          callback(errors);
        });

      }
    ],

    function(err,results){
      res.redirect('/');
    }
  )
});

router.get('/delete/:id', function(req, res, next) {
  var con=req.con;
  async.parallel(
    [
      function(callback){

        con.query('delete from account where id=?',[req.params.id],function(errors,accounts){
          callback(errors);
        });

      }
    ],

    function(err,results){
      res.redirect('/');
    }
  )
});


router.get('/1/addnew',function(req,res,next){
  res.render('add');
});

router.post('/add', function(req, res, next) {
  var con=req.con;
  async.parallel(
    [
      function(callback){

        con.query('insert into account(firstname,lastname,email) values(?,?,?)',
        [req.body.firstname,req.body.lastname,req.body.email],function(errors,accounts){
          callback(errors);
        });

      }
    ],

    function(err,results){
      res.redirect('/');
    }
  )
});

module.exports = router;
