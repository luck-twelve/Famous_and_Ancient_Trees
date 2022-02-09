/* eslint-disable @typescript-eslint/no-var-requires */
const mysql = require('mysql'); // 引入mysql
const mysqlconfig = require('../../config/mysql'); // 引入mysql连接配置
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
var userControll = {
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
            var params = req.query || req.params; //前端传的参数（暂时写这里，在这个例子中没用）
            connection.query('SELECT * FROM user', function (err, result) {
                //将结果以json形式返回到前台
                responseJSON(res, result);
                //释放链接
                connection.release();
            })
        })
    }
};
module.exports = userControll;