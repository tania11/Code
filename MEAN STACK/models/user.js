const mongoose=require('mongoose');

var Schema=mongoose.Schema;

var userSchema=new Schema({
    user_name:{type:String, required:true},
    password:{type:String, required:true, select:false},
    },
    { collection : 'User' });

const User=module.exports=mongoose.model('User',userSchema,'User');