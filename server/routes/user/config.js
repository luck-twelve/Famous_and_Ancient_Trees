/* eslint-disable @typescript-eslint/no-var-requires */
const mysql = require('mysql'); // 引入mysql
const mysqlconfig = require('../../config/mysql'); // 引入mysql连接配置
const sql = require('./sql'); // 引入sql语句
const { query, getFiltersql, getTotal, sqlAdd, sqlUpdate, formatDate } = require('../functions'); // 引入已经封装好的全局函数
var pool = mysql.createPool(mysqlconfig);

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
                query(connection, sql.login, 'login', params, function (result, err) {
                    if (err) {
                        return res.json({
                            code: 500,
                            msg: err
                        })
                    } else {
                        if (result.length != 0) {
                            let userInfo = result[0]
                            //调用生成token的方法
                            vertoken.setToken(userInfo.id, userInfo.username, userInfo.roles).then(token => {
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
                            query(connection, sql.getUsersByName, 'whyLoginErr', login_params, (data, err) => {
                                if (err) {
                                    throw err;
                                } else {
                                    if (data?.length === 0) {
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
                query(connection, sql.getUserInfo, 'getUserInfo', params.id, result => {
                    return res.json({
                        code: 200,
                        data: result ? result[0] : '',
                        msg: "",
                        flag: true
                    })
                })
            })
        })
    },
    logout: function (req, res, next) {
        return res.json({
            code: 200,
            msg: "退出登录成功",
            flag: true,
        })
    },
    getUserList: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            const { reqSql, reqParams, noLimitSql } = getFiltersql(sql.getUsers, req.body)
            query(connection, reqSql, 'getUserList', reqParams, result => {
                getTotal(noLimitSql, pool).then(total => {
                    result?.forEach(item => {
                        item.create_time = formatDate(item.create_time)
                        item.update_time = formatDate(item.update_time)
                    })
                    return res.json({
                        code: 200,
                        data: result,
                        total: total,
                        msg: "",
                        flag: true
                    })
                })
            })
        })
    },
    addUser: function (req, res, next) {
        req.body.password = req.body.password || '123456'
        switch (req.body.roles) {
            case 'admin': req.body.tag = 'danger'; break;
            case 'worker': req.body.tag = 'warning'; break;
            case 'people': req.body.tag = 'success'; break;
        }
        let { reqsql } = sqlAdd(req, res, 'user')
        pool.getConnection(function (err, connection) {
            query(connection, reqsql, 'addUser', [], result => {
                return res.json({
                    code: result?.affectedRows > 0 ? 200 : -200,
                    msg: result?.affectedRows > 0 ? "操作成功" : '操作失败',
                    flag: result?.affectedRows > 0,
                })
            })
        })
    },
    updateUser: function (req, res, next) {
        let reqBody = req.body
        const params = [];
        params[0] = reqBody.username
        params[1] = reqBody.avatar
        params[2] = reqBody.roles
        switch (reqBody.roles) {
            case 'admin': params[3] = 'danger'; break;
            case 'worker': params[3] = 'warning'; break;
            case 'people': params[3] = 'success'; break;
        }
        params[4] = reqBody.id
        pool.getConnection(function (err, connection) {
            query(connection, sql.updateUser, 'updateUser', params, result => {
                return res.json({
                    code: result?.affectedRows > 0 ? 200 : -200,
                    msg: result?.affectedRows > 0 ? "操作成功" : '操作失败',
                    flag: result?.affectedRows > 0,
                    showFlag: true
                })
            })
        })
    },
    deleteUser: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            query(connection, sql.deleteUser, 'deleteUser', [req.query.id], result => {
                return res.json({
                    code: result?.affectedRows > 0 ? 200 : -200,
                    msg: result?.affectedRows > 0 ? "操作成功" : '操作失败',
                    flag: result?.affectedRows > 0,
                    showFlag: true
                })
            })
        })
    }
};
module.exports = userControll;