const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./db');
const advertController = require('./adverts/AdvertController');


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());
  app.use(express.static('uploads'));

app.use('/', advertController);


module.exports = app;