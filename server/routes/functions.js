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
    query: (connection, sql, params, callback) => {
        connection.query(sql, params, function (err, result) {
            console.log('----------------------------------------')
            console.log('|-sql: ' + sql)
            console.log('|-params: ' + JSON.stringify(params))
            console.log('|-result: ' + JSON.stringify(result))
            console.log('---------------------------------------')
            console.log('')
            callback(result, err)
        })
    }
}
module.exports = actions;