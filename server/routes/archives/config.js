/* eslint-disable @typescript-eslint/no-var-requires */
const mysql = require('mysql'); // 引入mysql
const mysqlconfig = require('../../config/mysql'); // 引入mysql连接配置
const sql = require('./sql'); // 引入sql语句
var pool = mysql.createPool(mysqlconfig);

//引入token 
var vertoken = require('../../token')
var archivesControll = {
    getArchivesList: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            let reqsql = ''
            let params = []
            if (req.body.username && req.body.roles) {
                reqsql = sql.getArchivesByNR
                params = [req.body.username, req.body.roles]
            } else if (req.body.username && !req.body.roles) {
                reqsql = sql.getArchivesByName
                params = [req.body.username]
            } else if (!req.body.username && req.body.roles) {
                reqsql = sql.getArchivesByRoles
                params = [req.body.roles]
            } else {
                reqsql = sql.getArchives
            }
            connection.query(reqsql, params, function (err, result) {
                console.log('----------------------------------------')
                console.log('|-url: ' + 'getArchivesList')
                console.log('|-sql: ' + reqsql)
                console.log('|-params: ' + JSON.stringify(params))
                console.log('|-result: ' + JSON.stringify(result))
                console.log('---------------------------------------')
                console.log('')
                return res.json({
                    code: 200,
                    data: result,
                    msg: "操作成功",
                    flag: true
                })
            })
        })
    }
};
module.exports = archivesControll;