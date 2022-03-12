/* eslint-disable @typescript-eslint/no-var-requires */
const mysql = require('mysql'); // 引入mysql
const mysqlconfig = require('../../config/mysql'); // 引入mysql连接配置
const sql = require('./sql'); // 引入sql语句
const { query, getFiltersql, getTotal, sqlAdd, sqlUpdate } = require('../functions'); // 引入已经封装好的全局函数
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
                        msg: "查询成功",
                        flag: true
                    })
                })
            })
        })
    },
    addArchives: function (req, res, next) {
        let reqsql = sqlAdd(req, res, 'trees')
        pool.getConnection(function (err, connection) {
            query(connection, reqsql, 'addArchives', [], result => {
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
            query(connection, sql.deleteArchives, 'deleteArchives', [req.query.id], result => {
                return res.json({
                    code: result?.affectedRows > 0 ? 200 : -200,
                    msg: result?.affectedRows > 0 ? "操作成功" : '操作失败',
                    flag: result?.affectedRows > 0,
                    showFlag: true
                })
            })
        })
    },


    /**
     * 古树名木管理
     */
    getArchivesTree: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            const { reqSql, reqParams, noLimitSql } = getFiltersql(sql.getArchivesTree, req.body)
            query(connection, reqSql, 'getArchivesTree', reqParams, result => {
                getTotal(noLimitSql, pool).then(total => {
                    return res.json({
                        code: 200,
                        data: result,
                        total: total,
                        msg: "查询成功",
                        flag: true
                    })
                })
            })
        })
    },
    addArchivesTree: function (req, res, next) {
        console.log(sqlAdd(req, res, 'archives_tree'))
        let { reqsql, insertData } = sqlAdd(req, res, 'archives_tree')
        pool.getConnection(function (err, connection) {
            query(connection, reqsql, 'addArchivesTree', [], result => {
                return res.json({
                    code: result?.affectedRows > 0 ? 200 : -200,
                    data: insertData,
                    msg: result?.affectedRows > 0 ? "新增成功" : '新增失败',
                    flag: result?.affectedRows > 0,
                    showFlag: true
                })
            })
        })
    },
    updateArchivesTree: function (req, res, next) {
        let { reqsql, updatedData } = sqlUpdate(req, res, 'archives_tree', 'id')
        pool.getConnection(function (err, connection) {
            query(connection, reqsql, 'updateArchivesTree', [], result => {
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
    updateArchivesStatus: function (req, res, next) {
        let reqsql = 'UPDATE archives_tree SET isShow=1 WHERE id=?'
        pool.getConnection(function (err, connection) {
            query(connection, reqsql, 'updateArchivesStatus', [req.body.id], result => {
                return res.json({
                    code: result?.affectedRows > 0 ? 200 : -200,
                    msg: result?.affectedRows > 0 ? "操作成功" : '操作失败',
                    flag: result?.affectedRows > 0,
                    showFlag: false
                })
            })
        })
    },
    deleteArchivesTree: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            query(connection, sql.deleteArchivesTree, 'deleteArchivesTree', [req.query.id], result => {
                return res.json({
                    code: result?.affectedRows > 0 ? 200 : -200,
                    msg: result?.affectedRows > 0 ? "操作成功" : '操作失败',
                    flag: result?.affectedRows > 0,
                    showFlag: true
                })
            })
        })
    },


    /**
     * 树种管理
     */
    getArchivesSpecies: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            const { reqSql, reqParams, noLimitSql } = getFiltersql(sql.getArchivesSpecies, req.body)
            query(connection, reqSql, 'getArchivesSpecies', reqParams, result => {
                getTotal(noLimitSql, pool).then(total => {
                    return res.json({
                        code: 200,
                        data: result,
                        total: total,
                        msg: "查询成功",
                        flag: true
                    })
                })
            })
        })
    },
    addArchivesSpecies: function (req, res, next) {
        console.log(sqlAdd(req, res, 'archives_tree'))
        let { reqsql, insertData } = sqlAdd(req, res, 'archives_tree')
        pool.getConnection(function (err, connection) {
            query(connection, reqsql, 'addArchivesSpecies', [], result => {
                return res.json({
                    code: result?.affectedRows > 0 ? 200 : -200,
                    data: insertData,
                    msg: result?.affectedRows > 0 ? "新增成功" : '新增失败',
                    flag: result?.affectedRows > 0,
                    showFlag: true
                })
            })
        })
    },
    updateArchivesSpecies: function (req, res, next) {
        let { reqsql, updatedData } = sqlUpdate(req, res, 'archives_tree', 'id')
        pool.getConnection(function (err, connection) {
            query(connection, reqsql, 'updateArchivesSpecies', [], result => {
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
    deleteArchivesSpecies: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            query(connection, sql.deleteArchivesSpecies, 'deleteArchivesSpecies', [req.query.id], result => {
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
module.exports = archivesControll;