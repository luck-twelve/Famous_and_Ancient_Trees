/* eslint-disable @typescript-eslint/no-var-requires */
const mysql = require('mysql'); // 引入mysql
const mysqlconfig = require('../../config/mysql'); // 引入mysql连接配置
const sql = require('./sql'); // 引入mysql连接配置
const { formatDate } = require('../functions');
var pool = mysql.createPool(mysqlconfig);

var mapControll = {
    getMapInfo: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            connection.query(sql.getMapInfo, [], function (err, result) {
                result?.forEach(item => {
                    item.create_time = formatDate(item.create_time)
                    item.update_time = formatDate(item.update_time)
                })
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