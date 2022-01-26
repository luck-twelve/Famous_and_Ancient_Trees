/* eslint-disable @typescript-eslint/no-var-requires */
var express = require('express');
var router = express.Router();
var models = require('../db') //引入数据库配置
var mysql = require('mysql') //引入mysql

// 连接数据库
var conn = mysql.createConnection(models)
conn.connect()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// conn.end(); //关闭数据库

module.exports = router;
