// eslint-disable-next-line @typescript-eslint/no-var-requires
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
     * @apiSuccess {json} result
     * @apiSuccessExample {json} Success-Response:
     *  {
     *      "success" : "true",
     *      "result" : {
     *          "username" : "username",
     *          "password" : "password"
     *      }
     *  }
     * @apiSampleRequest http://localhost:3000/api/user/login
     * @apiVersion 1.0.0
     */
    router.post('/user/login', function (req, res, next) {
        userControll.queryAll(req, res, next)
    })

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
    router.get('/user/getUsers', function (req, res, next) {
        userControll.queryAll(req, res, next)
    })
}

module.exports = userApi;