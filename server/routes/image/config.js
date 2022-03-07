/* eslint-disable @typescript-eslint/no-var-requires */
const mysql = require('mysql'); // 引入mysql
const mysqlconfig = require('../../config/mysql'); // 引入mysql连接配置
var pool = mysql.createPool(mysqlconfig);

var imageControll = {
    getMarker: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            connection.query(`SELECT * FROM image WHERE name='marker'`, [], function (err, result) {
                return res.json({
                    code: 200,
                    msg: '操作成功',
                    data: result?.[0],
                    flag: true
                })
            })
        })
    }
};
module.exports = imageControll;