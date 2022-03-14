/* eslint-disable @typescript-eslint/no-var-requires */
const mysql = require('mysql'); // 引入mysql
const mysqlconfig = require('../../config/mysql'); // 引入mysql连接配置
const sql = require('./sql'); // 引入sql语句
const { query, getFiltersql, getTotal, sqlAdd, sqlUpdate, formatDate } = require('../functions'); // 引入已经封装好的全局函数
const { getUsername } = require('../token_info')
var pool = mysql.createPool(mysqlconfig);
pool.on('acquire', function (connection) {
    console.log('connection %d accuired', connection.threadId);
});

var abnormalControll = {
    getAbnormalList: async function (req, res, next) {
        let defaultSql = sql.getAbnormalList
        let token_name = await getUsername(req)
        if (token_name !== 'Admin') {
            req.body['username'] = undefined
            defaultSql += ` WHERE username='${token_name}'`
        }
        pool.getConnection(function (err, connection) {
            const { reqSql, reqParams, noLimitSql } = getFiltersql(defaultSql, req.body)
            query(connection, reqSql, 'getAbnormalList', reqParams, function (result) {
                getTotal(noLimitSql, pool).then(total => {
                    result?.forEach(item => {
                        item.create_time = formatDate(item.create_time)
                        item.update_time = formatDate(item.update_time)
                    })
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
    addAbnormal: async function (req, res, next) {
        req.body['username'] = await getUsername(req)
        let { reqsql, insertData } = sqlAdd(req, res, 'abnormal_info')
        pool.getConnection(function (err, connection) {
            query(connection, reqsql, 'addAbnormal', [], result => {
                return res.json({
                    code: result?.affectedRows > 0 ? 200 : -200,
                    data: insertData,
                    msg: result?.affectedRows > 0 ? "操作成功" : '操作失败',
                    flag: result?.affectedRows > 0,
                    showFlag: true
                })
            })
        })
    },
    updateAbnormal: async function (req, res, next) {
        let token_name = await getUsername(req)
        if (req.body.username !== token_name || req.body.username !== 'Admin') {
            return res.json({
                code: -200,
                msg: '操作失败，你没有此权限',
                flag: false,
                showFlag: true
            })
        }
        let { reqsql, updatedData } = sqlUpdate(req, res, 'abnormal_info', 'id')
        pool.getConnection(function (err, connection) {
            query(connection, reqsql, 'updateAbnormal', [], result => {
                updatedData.create_time = formatDate(updatedData.create_time)
                updatedData.update_time = formatDate(updatedData.update_time)
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