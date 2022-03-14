/* eslint-disable @typescript-eslint/no-var-requires */
const mysql = require('mysql'); // 引入mysql
const mysqlconfig = require('../../config/mysql'); // 引入mysql连接配置
var pool = mysql.createPool(mysqlconfig);
const { query } = require('../functions'); // 引入已经封装好的全局函数

var imageControll = {
    getImage: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            query(connection, `SELECT * FROM images WHERE name=?`, 'imageControll', [req.query.name], function (result) {
                return res.json({
                    code: 200,
                    msg: '',
                    img: result?.[0].value,
                    flag: true
                })
            })
        })
    }
};
module.exports = imageControll;