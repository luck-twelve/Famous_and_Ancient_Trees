const actions = {
    getFiltersql: (sql, data) => {
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
        let keys = Object.keys(req.body)
        if (!keys?.length) return res.json({
            code: -200,
            msg: '操作失败',
            flag: false,
            showFlag: true
        })
        let reqsql = `INSERT INTO ${tableDB}(`
        let paramsSql = ' VALUES('
        keys.forEach((item, index) => {
            if (!req.body[item]) return
            reqsql += item
            paramsSql += `'${req.body[item]}'`
            if (index === keys.length - 1) {
                reqsql += ')'
                paramsSql += ')'
            } else {
                reqsql += ','
                paramsSql += ','
            }
        })
        reqsql += paramsSql
        return reqsql
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
        keys.remove(targetId)
        keys.forEach((item, index) => {
            if (!req.body[item]) return
            reqsql += `${item}=${req.body[item]}`
            if (index === keys.length - 1) {
                reqsql += ` WHERE ${targetId}=${req.body[targetId]}`
            } else {
                reqsql += ','
            }
        })
        return reqsql
    }
}
module.exports = actions;