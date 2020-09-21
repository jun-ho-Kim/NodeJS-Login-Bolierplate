const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10; //자리수
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
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

userSchema.methods.generateToken = function(cb) {
    var user = this;
    console.log('user_id', user_id);
    const token = jwt.sign(user._id.toHexString(), 'secertToken');

    user.token = token;
    user.save(function(err, user){
        if(err) return cb(err);
        cb(null, user);
    })
};

userSchema.statics.findByToken = function(token, cb) {
    var user = this;
    // user._id + 'secretToken' = token;
    //토큰을 jwt.verify()함수를 이용해 decode 한다.
    jwt.verify(token, 'secretToken', function(err, decoded) {
        //유저 아이디를 이용해서 유저를 찾은 다음에
        //클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인(verify 함수 사용)
        user.findOne({_id: decoded, token}, function(err, user) {
            //클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하면 user를 return
            if(err) return cb(err);
            cb(null, user);
        })
    })
}


module.exports = {User};