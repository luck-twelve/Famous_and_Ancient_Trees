/* eslint-disable @typescript-eslint/no-var-requires */
const mysql = require('mysql'); // 引入mysql
const mysqlconfig = require('../../config/mysql'); // 引入mysql连接配置
const sql = require('./sql'); // 引入sql语句
var pool = mysql.createPool(mysqlconfig);

//引入token 
var vertoken = require('../../token')
var fileControll = {
    getFileList: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            connection.query(sql.getFiles, function (err, result) {
                console.log('----------------------------------------')
                console.log('|-url: ' + 'getFileList')
                console.log('|-sql: ' + sql.getFiles)
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
    },
    setAvatar: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            connection.query(sql.setAvatar, function (err, result) {
                console.log('----------------------------------------')
                console.log('|-url: ' + 'setAvatar')
                console.log('|-sql: ' + sql.setAvatar)
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
    },
};
module.exports = fileControll;