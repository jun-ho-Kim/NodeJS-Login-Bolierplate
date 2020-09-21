const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10; //자리수

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        uniqui: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

const User = mongoose.model("User", userSchema);

//userSchema.pre, userSchema.method.newFucntion은 mongoose method
userSchema.pre('save', function(next){
    var user = this;
    //비밀번호가 바뀔 경우 user.password를 bcrypt를 통해 암호화한다.
    if(user.isModified('password')) {
        bcrypt.genSalt(saltRounds, function(err,salt) {
            if(err) return next(err)

            bcrypt.hash(user.password, salt, function(err, hash) {
                user.password = hash;
                next();
            })
        })
    } else {
        next();
    }
});


userSchema.methods.comparePassword = function(plainPassword, cb) {
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if(err) return cb(err);
        cb(null, isMatch);
    })
};



module.exports = {User};