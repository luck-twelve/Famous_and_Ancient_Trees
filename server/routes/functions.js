/* eslint-disable @typescript-eslint/no-var-requires */
var uuid = require('node-uuid');
const actions = {
    getFiltersql: (sql, data, type) => {
        if (Object.keys(data).length > 0) {
            for (let i of Object.keys(data)) {
                if (i == 'pageNum' || i == 'pageSize') continue
                if (data[i]) {
                    if (sql.includes(' WHERE ')) {
                        sql += ' AND '
                    } else {
                        sql += ' WHERE '
                    }
                    sql += `${i}='${data[i]}'`
                }
            }
        }
        if (sql.includes(' WHERE ')) {
            sql += ` AND`
        } else {
            sql += ` WHERE`
        }
        sql += ` isShow!=99`
        if (type === 'all') { // 查询所有用户正常档案
            sql += ' OR isShow=1'
            for (let i of Object.keys(data)) {
                let skipList = ['pageNum', 'pageSize', 'create_user']
                if (skipList.indexOf(i) != -1) continue
                if (data[i]) {
                    sql += ` AND ${i}='${data[i]}'`
                }
            }
            if (Object.keys(data).indexOf('marker') != -1) {
                sql += ` AND marker='marker_normal'`
            }
        }
        if (data.create_user === 'Admin') { // 如果是管理员，则查询其他用户未审核档案
            sql += ' OR isShow=2'
        }
        let noLimit = sql
        sql += ' LIMIT ?,?'
        let params = []
        let pageStart = ((data.pageNum - 1) * data.pageSize) || 0
        let pageEnd = parseInt(data.pageSize) || 10
        params = params.concat([pageStart, pageEnd])
        return { reqSql: sql, reqParams: params, noLimitSql: noLimit }
    },
    getTotal: (reqsql, pool) => {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                connection.query(reqsql, function (err, result) {
                    resolve(result?.length || 0)
                })
            })
        })
    },
    query: (connection, sql, action, params, callback) => {
        connection.query(sql, params, function (err, result) {
            console.log(`sql:` + sql)
            console.log(`params:` + JSON.stringify(params))
            console.log(`result:` + JSON.stringify(result) + `\n`)
            // console.group(action)
            // console.dir({
            //     sql: sql,
            //     params: JSON.stringify(params),
            //     result: result?.length ? '' : JSON.stringify(result)
            // })
            // if (result?.length > 0) {
            //     console.table(result)
            // }
            // console.groupEnd()
            callback(result, err)
        })
    },
    sqlAdd: (req, res, tableDB, setMarker) => {
        let reqsql = ''
        let keys = Object.keys(req.body)
        let insertId = uuid.v1() // 用于生成唯一识别符
        let isShow = 0
        switch (tableDB) {
            case 'user': isShow = 1; break;
            case 'abnormal_info': isShow = 1; break;
        }
        if (!keys?.length) {
            reqsql = `INSERT INTO ${tableDB}(id, isShow) VALUES('${insertId}', ${isShow})`
        } else {
            if (keys.indexOf('id') === -1) {
                keys.push('id')
            }
            if (keys.indexOf('isShow') === -1) {
                keys.push('isShow')
            }
            if (setMarker) {
                if (keys.indexOf('marker') === -1) {
                    keys.push('marker')
                }
            }
            reqsql = `INSERT INTO ${tableDB}(`
            let paramsSql = ' VALUES('
            for (let i = 0; i < keys.length; i++) {
                let item = keys[i]
                let key = item
                let value = req.body[item]
                switch (item) {
                    case 'id': value = insertId; break;
                    case 'isShow': value = isShow; break;
                    case 'marker': value = 'marker_normal'; break;
                }
                reqsql += key
                paramsSql += `'${value}'`
                if (i === keys.length - 1) {
                    reqsql += ')'
                    paramsSql += ')'
                } else {
                    reqsql += ','
                    paramsSql += ','
                }
            }
            reqsql += paramsSql
        }
        return { reqsql, insertData: { id: insertId, ...req.body } }
    },
    sqlUpdate: (req, res, tableDB, targetId, setMarker) => {
        let reqBody = req.body
        let keys = Object.keys(reqBody)
        if (!keys?.length) return res.json({
            code: -200,
            msg: '操作失败',
            flag: false,
            showFlag: true
        })
        let reqsql = `UPDATE ${tableDB} SET `
        keys.splice(keys.indexOf(targetId), 1)
        if (keys.indexOf('create_time') !== -1) {
            keys.splice(keys.indexOf('create_time'), 1)
        }
        if (keys.indexOf('update_time') !== -1) {
            keys.splice(keys.indexOf('update_time'), 1)
        }
        if (setMarker) {
            if (keys.indexOf('marker') === -1) {
                keys.push('marker')
                reqBody['marker'] = 'marker_normal'
            }
        }
        for (let i = 0; i < keys.length; i++) {
            let item = keys[i]
            if (!reqBody[item]) return
            reqsql += `${item}='${reqBody[item]}'`
            if (i === keys.length - 1) {
                reqsql += ` WHERE ${targetId}='${reqBody[targetId]}'`
            } else {
                reqsql += ','
            }
        }
        return { reqsql, updatedData: reqBody }
    },
    formatDate: (inputTime) => {
        if (!inputTime && typeof inputTime !== 'number') {
            return '';
        }
        var localTime = '';
        inputTime = new Date(inputTime).getTime();
        const offset = (new Date()).getTimezoneOffset();
        localTime = (new Date(inputTime - offset * 60000)).toISOString();
        localTime = localTime.substr(0, localTime.lastIndexOf('.'));
        localTime = localTime.replace('T', ' ');
        return localTime;
    },
    // 30天前的今天
    getLastMonthToday: () => {
        var lastMonthToday = new Date(
            new Date().getTime() - 30 * 24 * 60 * 60 * 1000
        );
        var lastMonthYear = lastMonthToday.getFullYear();
        var lastMonth = lastMonthToday.getMonth() + 1;
        var lastMonthDay =
            lastMonthToday.getDate < 10
                ? "0" + lastMonthToday.getDate
                : lastMonthToday.getDate();
        return lastMonthYear + "-" + lastMonth + "-" + lastMonthDay;
    },
    // 字符串转日期
    getDate: (datestr) => {
        var temp = datestr.split("-");
        var date = new Date(temp[0], temp[1], temp[2]);
        return date;
    }
}
module.exports = actions;