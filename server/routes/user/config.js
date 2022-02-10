/* eslint-disable @typescript-eslint/no-var-requires */
const mysql = require('mysql'); // 引入mysql
const mysqlconfig = require('../../config/mysql'); // 引入mysql连接配置
const sql = require('./sql'); // 引入sql语句
var pool = mysql.createPool(mysqlconfig);
//响应JSON数据
var responseJSON = function (res, result) {
    if (typeof result == 'undefined') {
        res.json({
            code: "-200",
            msg: "操作失败"
        });
    } else {
        res.json(result);
    }
};
//引入token 
var vertoken = require('../../token')
var userControll = {
    checkLogin: function (req, res, next) {
        if (!req.body) {
            return res.json({
                code: 400,
                msg: '系统错误'
            })
        }
        //获取参数
        const params = [];
        params[0] = req.body.username
        params[1] = req.body.password
        if (params[0] === '' || params[1] === '') {
            return res.json({
                code: 403,
                msg: '用户名或密码不能为空'
            })
        } else {
            pool.getConnection(function (err, connection) {
                // 查询数据是否存在数据库中(user表没有设置索引)
                connection.query(sql.login, params, function (err, result) {
                    if (err) {
                        return res.json({
                            code: 500,
                            msg: err
                        })
                    } else {
                        if (result.length != 0) {
                            //调用生成token的方法
                            vertoken.setToken(result[0].uid, result[0].username).then(token => {
                                return res.json({
                                    code: 200,
                                    msg: '登录成功',
                                    jwtToken: token,
                                    flag: true
                                    //前端获取token后存储在localStroage中,
                                    //**调用接口时 设置axios(ajax)请求头Authorization的格式为`Bearer ` +token
                                })
                            })
                        } else {
                            //通过用户名查询
                            let login_params = [req.body.username]
                            connection.query(sql.queryByUsername, login_params, function (err, data) {
                                if (err) {
                                    throw err;
                                } else {
                                    if (data.length === 0) {
                                        return res.json({
                                            code: 404,
                                            msg: '用户不存在'
                                        })
                                    } else {
                                        if (req.body.username === data[0].username && req.body.password !== data[0].password) {
                                            return res.json({
                                                code: 403,
                                                msg: "密码错误"
                                            })
                                        } else {
                                            return res.json({
                                                code: 400,
                                                msg: '系统错误'
                                            })
                                        }
                                    }
                                }
                            })
                        }
                    }
                })
                connection.release();
            })
        }
    },
    getUserInfo: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            vertoken.getToken(req.headers['authorize_token']).then(params => {
                connection.query(sql.getUserInfo, params.uid, function (err, result) {
                    //将结果以json形式返回到前台
                    return res.json({
                        code: 200,
                        data: result ? result[0] : '',
                        msg: "操作成功",
                        flag: true
                    })
                })
            })
        })
    },
    logout: function (req, res, next) {
        return res.json({
            code: 200,
            msg: "操作成功",
            flag: true
        })
    },
    add: function (req, res, next) {
        console.log('add')
    },
    update: function (req, res, next) {
        console.log('update')
    },
    delete: function (req, res, next) {
        console.log('delete')
    },
    queryById: function (req, res, next) {
        console.log('queryById')
    },
    queryAll: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            connection.query('SELECT * FROM user', function (err, result) {
                //将结果以json形式返回到前台
                responseJSON(res, result);
                //释放链接
                connection.release();
            })
        })
    },
};
module.exports = userControll;