/* eslint-disable @typescript-eslint/no-var-requires */
const userControll = require('./config');

const userApi = (router) => {
    /* user controller */
    /**
     * @api {post} /api/user/login 登录
     * @apiDescription 登录
     * @apiName login
     * @apiGroup User
     * @apiParam {string} username 用户名
     * @apiParam {string} password 密码
     * @apiSuccess {string} jwtToken token
     * @apiSampleRequest http://localhost:3000/api/user/login
     * @apiVersion 1.0.0
     */
    router.post('/user/login', function (req, res, next) {
        userControll.checkLogin(req, res, next)
    })

    /**
     * @api {get} /api/user/getUserInfo 获取用户详细信息
     * @apiDescription 获取用户详细信息
     * @apiName getUserInfo
     * @apiGroup User
     * @apiSuccess {string} username 用户名
     * @apiSuccess {string} avatar 头像
     * @apiSuccess {string} roles 权限
     * @apiSampleRequest http://localhost:3000/api/user/getUserInfo
     * @apiVersion 1.0.0
     */
    router.get('/user/getUserInfo', function (req, res, next) {
        userControll.getUserInfo(req, res, next)
    })

    /**
     * @api {post} /api/user/logout 退出登录
     * @apiDescription 退出登录
     * @apiName logout
     * @apiGroup User
     * @apiSampleRequest http://localhost:3000/api/user/logout
     * @apiVersion 1.0.0
     */
    router.post('/user/logout', function (req, res, next) {
        userControll.logout(req, res, next)
    })

    /**
         * @api {post} /api/user/getUserList 用户列表
         * @apiDescription 用户列表
         * @apiName getUserList
         * @apiGroup User
         * @apiSampleRequest http://localhost:3000/api/user/getUserList
         * @apiVersion 1.0.0
         */
    router.post('/user/getUserList', function (req, res, next) {
        userControll.getUserList(req, res, next)
    })

    /**
         * @api {post} /api/user/addUser 新增用户
         * @apiDescription 新增用户
         * @apiName addUser
         * @apiGroup User
         * @apiSampleRequest http://localhost:3000/api/user/addUser
         * @apiVersion 1.0.0
         */
    router.post('/user/addUser', function (req, res, next) {
        userControll.addUser(req, res, next)
    })
}

module.exports = userApi;