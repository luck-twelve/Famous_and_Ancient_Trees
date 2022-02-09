/* eslint-disable @typescript-eslint/no-var-requires */
var express = require('express');
var router = express.Router();

const userApi = require('./user')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

userApi(router);

module.exports = router;
