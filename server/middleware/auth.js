const {User} = require('../models/User');

let auth = (req, res, next) => {
    //인증 처리를 하는 곳
    //클라이언트 쿠키에서 토큰을 가져온다.
    token = req.cookies.token;
    User.findByToken(token, (err, user) => {
        //토큰을 복호화 한 후 유저를 찾는다.
        if(err) return err;
        if(!user) return res.json({isAuth: false, error: true});
        req.token = token;
        req.user = user;
        next();
    })
};

module.exports = { auth };
