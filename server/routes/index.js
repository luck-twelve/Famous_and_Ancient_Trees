/* eslint-disable @typescript-eslint/no-var-requires */
var express = require('express');
var router = express.Router();

const user = require('./user')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/* user controller */
/**
 * @api {get} /api/user/getUsers 获取全部用户
 * @apiDescription 获取全部用户
 * @apiName getUsers
 * @apiGroup User
 * @apiParam {string} username 用户名
 * @apiParam {string} password 密码
 * @apiSuccess {json} result
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "success" : "true",
 *      "result" : {
 *          "username" : "username",
 *          "password" : "password"
 *      }
 *  }
 * @apiSampleRequest http://localhost:3000/api/user/getUsers
 * @apiVersion 1.0.0
 */
router.get('/getUsers', function (req, res, next) {
  user.queryAll(req, res, next)
})

module.exports = router;
