const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const bodyPaser = require('body-parser');

const config = require('./config/key');

const {User} = require("./models/User");

app.use(bodyPaser.urlencoded({extended: true}));
app.use(bodyPaser.json());

mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('✅  MongoDB Connected...'))
    .catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello World 안녕하세요~~~'));
app.post('/register', (req,res) => {
    //회원가입할 때 필요한 정보들을 client에 가져오면
    //그것들을 데이터베이스에 넣어준다.
    const user = new User(req.body);
    user.save((err, userInfo) => {
        if(err) return res.json({success: false, err});
        return res.status(200).json({
            success: true
        });
    });
});

app.post('/login', (req, res) => {
    User.findOne({email: req.body.email}, (err, user) => {
        if(!user) {
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            })
        }
        //요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는지 확인
        user.comparePassword(req.body.password, (err,isMatch) => {
            if(err) return res.json({loginSuccess: false, message: "비밀번호가 틀렸습니다."})
        //비밀번호 까지 맞다면 토큰 생성하기
        user.generateToken((err, user) => {
        
        })
        
        })
    })
})

app.listen(port, () => console.log(`✅  Example app listening on port ${port}!`))