/* eslint-disable @typescript-eslint/no-var-requires */
const mysql = require('mysql'); // 引入mysql
const mysqlconfig = require('../../config/mysql'); // 引入mysql连接配置
const sql = require('./sql'); // 引入sql语句
const { query, getFiltersql, getTotal, sqlAdd, sqlUpdate, formatDate, getLastMonthToday, getDate } = require('../functions'); // 引入已经封装好的全局函数
const { getUsername, getUserRoles } = require('../token_info')
var pool = mysql.createPool(mysqlconfig);
pool.on('acquire', function (connection) {
    console.log('connection %d accuired', connection.threadId);
});

// 时间验证
const checkTime = (i) => {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

var abnormalControll = {
    getAbnormalList: async function (req, res, next) {
        let defaultSql = sql.getAbnormalList
        let token_name = await getUsername(req)
        let token_roles = await getUserRoles(req)
        if (token_roles !== 'admin') {
            req.body['create_user'] = undefined
            defaultSql += ` WHERE create_user='${token_name}'`
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
        let token_roles = await getUserRoles(req)
        if (!(token_roles === 'admin' || token_roles === 'worker')) {
            return res.json({
                code: -200,
                msg: '操作失败，你没有此权限',
                flag: false,
                showFlag: true
            })
        }
        let token_name = await getUsername(req)
        req.body['create_user'] = token_name
        let { reqsql, insertData } = sqlAdd(req, res, 'abnormal_info')
        pool.getConnection(function (err, connection) {
            query(connection, reqsql, 'addAbnormal', [], result => {
                connection.query(sql.addAbTree, [insertData.listing])
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
        let create_user = req.body.create_user
        let token_name = await getUsername(req)
        let token_roles = await getUserRoles(req)
        if (!(create_user === token_name || token_roles === 'admin')) {
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
    controllAbnormal: async function (req, res, next) {
        let token_roles = await getUserRoles(req)
        if (token_roles !== 'worker' && token_roles !== 'admin') {
            return res.json({
                code: -200,
                msg: '操作失败，你没有此权限',
                flag: false,
                showFlag: true
            })
        }
        const statusOptions = {
            resolve: {
                sql: sql.controllResolve,
                params: [req.body.status, req.body.resolve_user, req.body.expect_finish_time, req.body.id]
            },
            reject: {
                sql: sql.controllReject,
                params: [req.body.status, req.body.reject_reason, req.body.id]
            },
            finish: {
                sql: sql.controllFinish,
                params: [req.body.status, req.body.finish_time, req.body.id]
            },
        }
        let reqsql = statusOptions[req.body.status].sql
        let params = statusOptions[req.body.status].params
        pool.getConnection(function (err, connection) {
            query(connection, reqsql, 'controllAbnormal', params, result => {
                return res.json({
                    code: result?.affectedRows > 0 ? 200 : -200,
                    msg: result?.affectedRows > 0 ? "操作成功" : '操作失败',
                    flag: result?.affectedRows > 0,
                    showFlag: true
                })
            })
        })
    },
    deleteAbnormal: async function (req, res, next) {
        // let create_user = req.body.create_user
        // let token_name = await getUsername(req)
        // let token_roles = await getUserRoles(req)
        // if (!(create_user === token_name || token_roles === 'admin')) {
        //     console.log(JSON.stringify(req.query))
        //     console.log(create_user, token_name)
        //     return res.json({
        //         code: -200,
        //         msg: '操作失败，你没有此权限',
        //         flag: false,
        //         showFlag: true
        //     })
        // }
        pool.getConnection(function (err, connection) {
            query(connection, sql.deleteAbnormal, 'deleteAbnormal', [req.query.id], result => {
                connection.query(sql.deleteAbTree, [req.query.listing])
                return res.json({
                    code: result?.affectedRows > 0 ? 200 : -200,
                    msg: result?.affectedRows > 0 ? "操作成功" : '操作失败',
                    flag: result?.affectedRows > 0,
                    showFlag: true
                })
            })
        })
    },

    // 获取每月异常情况
    getAbnormalListEM: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            query(connection, sql.getAbnormalListEM, 'getAbnormalListEM', [], result => {
                const start = getLastMonthToday();
                let date = new Date()
                let y = date.getFullYear()
                let m = checkTime(date.getMonth() + 1)
                let d = checkTime(date.getDate())
                const end = `${y}-${m}-${d}`;
                console.log(end)
                let startTime = getDate(start);
                const endTime = getDate(end);
                let dayMap = []
                let countMap = []
                while ((endTime.getTime() - startTime.getTime()) >= 0) {
                    const month = startTime.getMonth().toString().length == 1 ? "0" + startTime.getMonth().toString() : startTime.getMonth();
                    const day = startTime.getDate().toString().length == 1 ? "0" + startTime.getDate() : startTime.getDate();
                    dayMap.push(`${month}月${day}日`);
                    startTime.setDate(startTime.getDate() + 1);
                    const countItem = result.find(xx => xx.day == `${month}-${day}`)
                    if (countItem) {
                        countMap.push(countItem.count)
                    } else {
                        countMap.push(0)
                    }
                }
                return res.json({
                    code: 200,
                    msg: '',
                    data: {
                        dayMap,
                        countMap,
                    },
                    flag: true
                })
            })
        })
    },
    getAbnormalNumberTM: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            query(connection, sql.getAbnormalNumberTM, 'getAbnormalNumberTM', [], result => {
                return res.json({
                    code: 200,
                    msg: '',
                    data: result[0].count,
                    flag: true
                })
            })
        })
    },
    getAbnormalNumberLM: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            query(connection, sql.getAbnormalNumberLM, 'getAbnormalNumberLM', [], result => {
                return res.json({
                    code: 200,
                    msg: '',
                    data: result[0].count,
                    flag: true
                })
            })
        })
    },
};
module.exports = abnormalControll;