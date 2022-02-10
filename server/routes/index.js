/* eslint-disable @typescript-eslint/no-var-requires */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

const userApi = require('./user')
const menuApi = require('./menu')

userApi(router);
menuApi(router);

module.exports = router;
