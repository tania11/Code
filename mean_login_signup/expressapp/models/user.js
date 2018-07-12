var mongoose=require('mongoose');
var bcrypt=require('bcrypt');
var Schema=mongoose.Schema;
var SALT_WORK_FACTOR = 10;

var schema=new Schema({
    email : {type:String,require:true},
    username : {type:String,require:true},
    password : {type:String,require:true},
    creation_dt : {type:Date,require:true}
});

schema.pre('save', async function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')){
        return next();
    }

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

schema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports= mongoose.model('User',schema);

//https://lockmedown.com/node-js-password-storage-bcrypt/