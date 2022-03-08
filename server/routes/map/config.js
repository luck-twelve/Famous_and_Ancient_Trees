/* eslint-disable @typescript-eslint/no-var-requires */
const mysql = require('mysql'); // 引入mysql
const mysqlconfig = require('../../config/mysql'); // 引入mysql连接配置
var pool = mysql.createPool(mysqlconfig);

var mapControll = {
    getMapInfo: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            connection.query(`SELECT archive_id,listing,tree_nameZh,tree_species,longitude,latitude,description FROM archives_tree`, [], function (err, result) {
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