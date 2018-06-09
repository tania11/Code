var express=require('express');
const router=express.Router();

const User=require('../models/user');

router.get('/userList',function(req,res,next){
    User.find(function(err,users){
        res.json(users);
    });

    console.log('Retrieving users');
});

router.post('/user',function(req,res,next){
    
        let newUser=new User({
            user_name : req.body.user_name,
            password : req.body.password
        });
    
        newUser.save(function(error,user){
            if(error){
                res.json({message:'Failed to add contact'+error});
            }
            else{
                res.json({message:'contact added successfully'});
            }
        });
    });

module.exports=router;