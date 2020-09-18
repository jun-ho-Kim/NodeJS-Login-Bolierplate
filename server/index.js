const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const bodyPaser = require('body-parser');
const config = require('./config/key');

app.use(bodyPaser.urlencoded({extended: true}));
app.use(bodyPaser.json());

mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('✅  MongoDB Connected...'))
    .catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello World 안녕하세요~~~'));
app.listen(port, () => console.log(`✅  Example app listening on port ${port}!`))