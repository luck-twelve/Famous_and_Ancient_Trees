/* eslint-disable @typescript-eslint/no-var-requires */
var uuid = require('node-uuid');
const actions = {
    getFiltersql: (sql, data, isShow) => {
        if (Object.keys(data).length > 0) {
            for (let i of Object.keys(data)) {
                if (i == 'pageNum' || i == 'pageSize') continue
                if (data[i]) {
                    if (!sql.includes(' WHERE ')) {
                        sql += ' WHERE '
                    } else {
                        sql += ' and '
                    }
                    sql += `${i}='${data[i]}'`
                }
            }
        }
        if (sql.includes(' WHERE ')) {
            // sql += ` and isShow=${isShow}`
            sql += ` and isShow!=99`
        } else {
            sql += ' WHERE isShow!=99'
        }
        let noLimit = sql
        sql += ' limit ?,?'
        let params = []
        let pageStart = ((data.pageNum - 1) * data.pageSize) || 0
        let pageEnd = (data.pageNum * data.pageSize) || 10
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
            console.group(action)
            console.dir({
                sql: sql,
                params: JSON.stringify(params),
                result: result?.length ? '' : JSON.stringify(result)
            })
            if (result?.length > 0) {
                console.table(result)
            }
            console.groupEnd()
            callback(result, err)
        })
    },
    sqlAdd: (req, res, tableDB) => {
        let reqsql = ''
        let keys = Object.keys(req.body)
        let insertId = uuid.v1()
        if (!keys?.length) {
            reqsql = `INSERT INTO ${tableDB}(id, isShow) VALUES('${insertId}', 0)`
        } else {
            if (keys.indexOf('id') === -1) {
                keys.push('id')
            }
            if (keys.indexOf('isShow') === -1) {
                keys.push('isShow')
            }
            if (tableDB.includes('archives_tree')) {
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
                    case 'isShow': value = 0; break;
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
    sqlUpdate: (req, res, tableDB, targetId) => {
        let keys = Object.keys(req.body)
        if (!keys?.length) return res.json({
            code: -200,
            msg: '操作失败',
            flag: false,
            showFlag: true
        })
        let reqsql = `UPDATE ${tableDB} SET `
        keys.splice(keys.indexOf(targetId), 1)
        keys.forEach((item, index) => {
            if (!req.body[item]) return
            reqsql += `${item}='${req.body[item]}'`
            if (index === keys.length - 1) {
                reqsql += ` WHERE ${targetId}='${req.body[targetId]}'`
            } else {
                reqsql += ','
            }
        })
        return { reqsql, updatedData: req.body }
    }
}
module.exports = actions;