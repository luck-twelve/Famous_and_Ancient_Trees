/* eslint-disable @typescript-eslint/no-var-requires */
const mysql = require('mysql'); // 引入mysql
const mysqlconfig = require('../../config/mysql'); // 引入mysql连接配置
const sql = require('./sql'); // 引入sql语句
const { query, getFiltersql, getTotal } = require('../functions'); // 引入已经封装好的全局函数
var pool = mysql.createPool(mysqlconfig);

//引入token 
var vertoken = require('../../token')
var archivesControll = {
    getArchives: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            const { reqSql, reqParams, noLimitSql } = getFiltersql(sql.getArchives, req.body)
            query(connection, reqSql, 'getArchives', reqParams, result => {
                getTotal(noLimitSql, pool).then(total => {
                    return res.json({
                        code: 200,
                        data: result,
                        total: total,
                        msg: "操作成功",
                        flag: true
                    })
                })
            })
        })
    },
    addArchives: function (req, res, next) {
        const params = [];
        params[0] = req.body.treeName
        params[1] = req.body.treeType
        params[2] = req.body.treeAge
        params[3] = req.body.treeLocation
        params[4] = req.body.treeAdminister
        params[5] = req.body.treeHistoryLegend
        pool.getConnection(function (err, connection) {
            query(connection, sql.addArchives, 'addArchives', params, result => {
                return res.json({
                    code: result?.affectedRows > 0 ? 200 : -200,
                    msg: result?.affectedRows > 0 ? "操作成功" : '操作失败',
                    flag: result?.affectedRows > 0,
                    showFlag: true
                })
            })
        })
    },
    updateArchives: function (req, res, next) {
        const params = [];
        params[0] = req.body.treeName
        params[1] = req.body.treeType
        params[2] = req.body.treeAge
        params[3] = req.body.treeLocation
        params[4] = req.body.treeAdminister
        params[5] = req.body.treeHistoryLegend
        params[6] = req.body.tree_id
        pool.getConnection(function (err, connection) {
            query(connection, sql.updateArchives, 'updateArchives', params, result => {
                return res.json({
                    code: result?.affectedRows > 0 ? 200 : -200,
                    msg: result?.affectedRows > 0 ? "操作成功" : '操作失败',
                    flag: result?.affectedRows > 0,
                    showFlag: true
                })
            })
        })
    },
    deleteArchives: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            query(connection, sql.deleteArchives, 'deleteArchives', [req.query.tree_id], result => {
                return res.json({
                    code: result?.affectedRows > 0 ? 200 : -200,
                    msg: result?.affectedRows > 0 ? "操作成功" : '操作失败',
                    flag: result?.affectedRows > 0,
                    showFlag: true
                })
            })
        })
    }
};
module.exports = archivesControll;