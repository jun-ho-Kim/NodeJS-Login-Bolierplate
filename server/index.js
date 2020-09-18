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
    const user = new User(req.body)
    user.save((err, userInfro) => {
        if(err) return res.json({success: false, err});
        return res.status(200).json({
            success: true
        });
    });
});

app.listen(port, () => console.log(`✅  Example app listening on port ${port}!`))