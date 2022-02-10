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
var menuControll = {
    getAllMenu: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            connection.query(sql.getAllMenu, function (err, result) {
                //将结果以json形式返回到前台
                responseJSON(res, result);
                //释放链接
                connection.release();
            })
        })
    },
};
module.exports = menuControll;