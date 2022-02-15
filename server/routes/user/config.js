/* eslint-disable @typescript-eslint/no-var-requires */
const mysql = require('mysql'); // 引入mysql
const mysqlconfig = require('../../config/mysql'); // 引入mysql连接配置
const sql = require('./sql'); // 引入sql语句
var pool = mysql.createPool(mysqlconfig);

const getTotal = (reqsql, params) => {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            connection.query(reqsql, params, function (err, result) {
                resolve(result.length)
            })
        })
    })
}

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
            })
        }
    },
    getUserInfo: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            vertoken.getToken(req.headers['authorize_token']).then(params => {
                connection.query(sql.getUserInfo, params.uid, function (err, result) {
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
    getUserList: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            let reqsql = ''
            let params = []
            if (req.body.username && req.body.roles) {
                reqsql = sql.getUsersByNR
                params = [req.body.username, req.body.roles]
            } else if (req.body.username && !req.body.roles) {
                reqsql = sql.getUsersByName
                params = [req.body.username]
            } else if (!req.body.username && req.body.roles) {
                reqsql = sql.getUsersByRoles
                params = [req.body.roles]
            } else {
                reqsql = sql.getUsers
            }
            let pageStart = ((req.body.pageNum - 1) * req.body.pageSize) || 0
            let pageEnd = (req.body.pageNum * req.body.pageSize) || 10
            params = params.concat([pageStart, pageEnd])
            connection.query(reqsql + ' limit ?,?', params, function (err, result) {
                console.log('----------------------------------------')
                console.log('|-url: ' + 'getUserList')
                console.log('|-sql: ' + reqsql)
                console.log('|-params: ' + JSON.stringify(params))
                console.log('|-result: ' + JSON.stringify(result))
                console.log('---------------------------------------')
                console.log('')
                getTotal(reqsql, params).then(total => {
                    return res.json({
                        code: 200,
                        data: result,
                        total: total,
                        msg: "操作成功",
                        flag: true
                    })
                })
            })
        })
    },
    addUser: function (req, res, next) {
        const params = [];
        params[0] = req.body.username
        params[1] = req.body.password
        params[2] = req.body.avatar
        params[3] = req.body.roles
        pool.getConnection(function (err, connection) {
            connection.query(sql.addUser, params, function (err, result) {
                console.log(result)
                return res.json({
                    code: 200,
                    msg: "操作成功",
                    flag: true
                })
            })
        })
    },
    updateUser: function (req, res, next) {
        const params = [];
        params[0] = req.body.username
        params[1] = req.body.password
        params[2] = req.body.avatar
        params[3] = req.body.roles
        params[4] = req.body.uid
        pool.getConnection(function (err, connection) {
            connection.query(sql.updateUser, params, function (err, result) {
                console.log('----------------------------------------')
                console.log('|-url: ' + 'updateUser')
                console.log('|-sql: ' + sql.updateUser)
                console.log('|-params: ' + JSON.stringify(params))
                console.log('|-result: ' + JSON.stringify(result))
                console.log('---------------------------------------')
                console.log('')
                return res.json({
                    code: result.changedRows > 0 ? 200 : -200,
                    msg: result.changedRows > 0 ? "操作成功" : '操作成功',
                    flag: result.changedRows > 0
                })
            })
        })
    },
    deleteUser: function (req, res, next) {
        const params = [req.query.uid];
        pool.getConnection(function (err, connection) {
            connection.query(sql.deleteUser, params, function (err, result) {
                console.log('----------------------------------------')
                console.log('|-url: ' + 'deleteUser')
                console.log('|-sql: ' + sql.deleteUser)
                console.log('|-params: ' + JSON.stringify(params))
                console.log('|-result: ' + JSON.stringify(result))
                console.log('---------------------------------------')
                console.log('')
                return res.json({
                    code: 200,
                    msg: "操作成功",
                    flag: true
                })
            })
        })
    }
};
module.exports = userControll;