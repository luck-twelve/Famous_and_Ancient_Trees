/* eslint-disable @typescript-eslint/no-var-requires */
const mysql = require('mysql'); // 引入mysql
const mysqlconfig = require('../../config/mysql'); // 引入mysql连接配置
const sql = require('./sql'); // 引入sql语句
const { query, getFiltersql, getTotal, sqlAdd, sqlUpdate } = require('../functions'); // 引入已经封装好的全局函数
var pool = mysql.createPool(mysqlconfig);
pool.on('acquire', function (connection) {
    console.log('connection %d accuired', connection.threadId);
});

var abnormalControll = {
    getAbnormalList: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            const { reqSql, reqParams, noLimitSql } = getFiltersql(sql.getAbnormalList, req.body)
            query(connection, reqSql, 'getAbnormalList', reqParams, function (result) {
                getTotal(noLimitSql, pool).then(total => {
                    return res.json({
                        code: 200,
                        msg: '',
                        data: result,
                        total: total,
                        flag: true
                    })
                })
            })
        })
    },
    addAbnormal: function (req, res, next) {
        let reqsql = sqlAdd(req, res, 'abnormal_info')
        pool.getConnection(function (err, connection) {
            query(connection, reqsql, 'addAbnormal', [], result => {
                return res.json({
                    code: result?.affectedRows > 0 ? 200 : -200,
                    msg: result?.affectedRows > 0 ? "操作成功" : '操作失败',
                    flag: result?.affectedRows > 0,
                    showFlag: true
                })
            })
        })
    },
    updateAbnormal: function (req, res, next) {
        let { reqsql, updatedData } = sqlUpdate(req, res, 'abnormal_info', 'id')
        pool.getConnection(function (err, connection) {
            query(connection, reqsql, 'updateAbnormal', [], result => {
                return res.json({
                    code: result?.affectedRows > 0 ? 200 : -200,
                    data: updatedData,
                    msg: result?.affectedRows > 0 ? "保存成功" : '保存失败',
                    flag: result?.affectedRows > 0,
                    showFlag: true
                })
            })
        })
    },
    deleteAbnormal: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            query(connection, sql.deleteAbnormal, 'deleteAbnormal', [req.query.id], result => {
                return res.json({
                    code: result?.affectedRows > 0 ? 200 : -200,
                    msg: result?.affectedRows > 0 ? "操作成功" : '操作失败',
                    flag: result?.affectedRows > 0,
                    showFlag: true
                })
            })
        })
    },
};
module.exports = abnormalControll;