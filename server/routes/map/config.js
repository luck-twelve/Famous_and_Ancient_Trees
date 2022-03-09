/* eslint-disable @typescript-eslint/no-var-requires */
const mysql = require('mysql'); // 引入mysql
const mysqlconfig = require('../../config/mysql'); // 引入mysql连接配置
const sql = require('./sql'); // 引入mysql连接配置
var pool = mysql.createPool(mysqlconfig);

var mapControll = {
    getMapInfo: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            connection.query(sql.getMapInfo, [], function (err, result) {
                return res.json({
                    code: 200,
                    msg: '操作成功',
                    data: result,
                    flag: true
                })
            })
        })
    }
};
module.exports = mapControll;