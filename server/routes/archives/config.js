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
            query(connection, reqSql, reqParams, result => {
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
        const params = {
            treeName: req.body.treeName,
            treeType: req.body.treeType,
            treeAge: req.body.treeAge,
            treeLocation: req.body.treeLocation,
            treeAdminister: req.body.treeAdminister,
            treeHistoryLegend: req.body.treeHistoryLegend,
        };
        pool.getConnection(function (err, connection) {
            query(connection, sql.addArchives, params, result => {
                return res.json({
                    code: 200,
                    msg: "操作成功",
                    flag: true
                })
            })
        })
    },
    updateArchives: function (req, res, next) {
        const params = {
            tree_id: req.body.tree_id,
            treeName: req.body.treeName,
            treeType: req.body.treeType,
            treeAge: req.body.treeAge,
            treeLocation: req.body.treeLocation,
            treeAdminister: req.body.treeAdminister,
            treeHistoryLegend: req.body.treeHistoryLegend,
        };
        pool.getConnection(function (err, connection) {
            query(connection, sql.updateArchives, params, result => {
                return res.json({
                    code: result.changedRows > 0 ? 200 : -200,
                    msg: result.changedRows > 0 ? "操作成功" : '操作成功',
                    flag: result.changedRows > 0
                })
            })
        })
    },
    deleteArchives: function (req, res, next) {
        const params = [req.query.tree_id];
        pool.getConnection(function (err, connection) {
            query(connection, sql.deleteArchives, params, result => {
                return res.json({
                    code: 200,
                    msg: "操作成功",
                    flag: true
                })
            })
        })
    }
};
module.exports = archivesControll;