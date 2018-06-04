var express = require('express');
var router = express.Router();
async=require("async");
router.get('/', function(req, res, next) {
  var con=req.con;
  async.parallel(
    [
      function(callback){

        con.query('select * from account',function(errors,accounts){
          callback(errors,accounts);
        });

      }
    ],

    function(err,results){
      var data={accounts:results[0]};
      res.render('account/index',data);
    }
  )
});


router.get('/add', function(req, res, next) {
  res.render('account/add');
});

router.post('/add',function(req,res,next){
  var con=req.con;
  async.parallel(
    [
      function(callback){
        con.query('insert into account(firstname,lastname,email) values(?,?,?)',
        [req.body.firstname,req.body.lastname,req.body.email],function(errors,accounts){
          callback(errors);
        })
      }
    ],

    function(err,results){
      res.redirect('/account');
    }
  )
});

router.get('/delete/:id',function(req,res,next){
  var con=req.con;
  async.parallel(
    [
      function(callback){
        con.query('delete from account where id=?',
        [req.params.id],function(errors,accounts){
          callback(errors);
        })
      }
    ],

    function(err,results){
      res.redirect('/account');
    }
  )
});

router.get('/edit/:id',function(req,res,next){
  var con=req.con;
  async.parallel(
    [
      function(callback){
        con.query('select * from account where id=?',[req.params.id],function(errors,accounts){
          callback(errors,accounts[0]);
        })
      }
    ],

    function(err,results){
      var data={account:results[0]};
      res.render('account/edit',data);
    }
  )
});

router.post('/edit',function(req,res,next){
  var con=req.con;
  async.parallel(
    [
      function(callback){
        con.query('update account set firstname= ?, lastname= ?, email= ? where id=?',
        [req.body.firstname,req.body.lastname,req.body.email,req.body.id],function(errors,accounts){
          callback(errors);
        })
      }
    ],

    function(err,results){
      res.redirect('/account');
    }
  )
})

module.exports = router;
