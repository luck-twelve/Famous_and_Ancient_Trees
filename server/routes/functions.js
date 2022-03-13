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
    sqlAdd: (req, res, tableDB, setMarker) => {
        let reqsql = ''
        let keys = Object.keys(req.body)
        let insertId = uuid.v1()
        let isShow = tableDB === 'user' ? 1 : 0
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
    }
}
module.exports = actions;