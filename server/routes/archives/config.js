/* eslint-disable @typescript-eslint/no-var-requires */
const mysql = require('mysql'); // 引入mysql
const mysqlconfig = require('../../config/mysql'); // 引入mysql连接配置
const sql = require('./sql'); // 引入sql语句
const { query, getFiltersql, getTotal, sqlAdd, sqlUpdate, formatDate } = require('../functions'); // 引入已经封装好的全局函数
const { getUsername, getUserRoles } = require('../token_info')
var pool = mysql.createPool(mysqlconfig);
pool.on('acquire', function (connection) {
    console.log('connection %d accuired', connection.threadId);
});

//引入token 
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
                        msg: "",
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
    getArchivesTree: async function (req, res, next) {
        let token_name = await getUsername(req)
        let token_roles = await getUserRoles(req)
        if (token_roles !== 'Admin') {
            req.body['create_user'] = token_name
        }
        pool.getConnection(function (err, connection) {
            const { reqSql, reqParams, noLimitSql } = getFiltersql(sql.getArchivesTree, req.body, 'all')
            query(connection, reqSql, 'getArchivesTree', reqParams, result => {
                getTotal(noLimitSql, pool).then(total => {
                    result?.forEach(item => {
                        item.create_time = formatDate(item.create_time)
                        item.update_time = formatDate(item.update_time)
                    })
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
    addArchivesTree: async function (req, res, next) {
        let token_name = await getUsername(req)
        req.body['create_user'] = token_name
        req.body['update_user'] = token_name
        let { reqsql, insertData } = sqlAdd(req, res, 'archives_tree', true)
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
    updateArchivesTree: async function (req, res, next) {
        let token_name = await getUsername(req)
        req.body['update_user'] = token_name
        let { reqsql, updatedData } = sqlUpdate(req, res, 'archives_tree', 'id', true)
        pool.getConnection(function (err, connection) {
            query(connection, reqsql, 'updateArchivesTree', [], result => {
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
    updateArchivesStatus: async function (req, res, next) {
        let reqsql = 'UPDATE archives_tree SET isShow=?'
        let reqParams = [req.body.isShow]
        if (req.body.reason) {
            reqsql += ' ,reson=?'
            reqParams.push(req.body.reson)
        }
        reqsql += ', update_user=? WHERE id=?'
        let token_name = await getUsername(req)
        reqParams.push(token_name, req.body.id)
        pool.getConnection(function (err, connection) {
            query(connection, reqsql, 'updateArchivesStatus', reqParams, result => {
                return res.json({
                    code: result?.affectedRows > 0 ? 200 : -200,
                    msg: result?.affectedRows > 0 ? "操作成功" : '操作失败',
                    flag: result?.affectedRows > 0,
                    showFlag: false
                })
            })
        })
    },
    deleteArchivesTree: async function (req, res, next) {
        let token_name = await getUsername(req)
        pool.getConnection(function (err, connection) {
            query(connection, sql.deleteArchivesTree, 'deleteArchivesTree', [token_name, req.query.id], result => {
                return res.json({
                    code: result?.affectedRows > 0 ? 200 : -200,
                    msg: result?.affectedRows > 0 ? "操作成功" : '操作失败',
                    flag: result?.affectedRows > 0,
                    showFlag: true
                })
            })
        })
    },
    // 获取全年异常情况
    getArchivesListEM: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            query(connection, sql.getArchivesListEM, 'getArchivesListEM', [], result => {
                let arr = []
                for (let i = 0; i < 12; i++) {
                    const m = result.find(xx => xx.col_month == i + 1)
                    if (m) {
                        arr.push(m.count)
                    } else {
                        arr.push('')
                    }
                }
                return res.json({
                    code: 200,
                    msg: '',
                    data: arr,
                    flag: true
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
                    result?.forEach(item => {
                        item.create_time = formatDate(item.create_time)
                        item.update_time = formatDate(item.update_time)
                    })
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
        let { reqsql, insertData } = sqlAdd(req, res, 'archives_Species')
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
        let { reqsql, updatedData } = sqlUpdate(req, res, 'archives_Species', 'id')
        pool.getConnection(function (err, connection) {
            query(connection, reqsql, 'updateArchivesSpecies', [], result => {
                updatedData.create_time = formatDate(updatedData.create_time)
                updatedData.create_time = formatDate(updatedData.update_time)
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