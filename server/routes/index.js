/* eslint-disable @typescript-eslint/no-var-requires */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

const userApi = require('./user')
const menuApi = require('./menu')
const archivesApi = require('./archives')

userApi(router)
menuApi(router)
archivesApi(router)

module.exports = router;
