/* eslint-disable @typescript-eslint/no-var-requires */
const mysql = require('mysql'); // 引入mysql
const mysqlconfig = require('../config/mysql'); // 引入mysql连接配置
var pool = mysql.createPool(mysqlconfig);
//引入token 
var vertoken = require('../token')

const tokenControll = {
    getUserId: (req) => {
        return new Promise((resolve, reject) => {
            try {
                vertoken.getToken(req.headers['authorize_token']).then(token => {
                    resolve(token.id)
                })
            } catch {
                reject()
            }
        })
    },
    getUsername: (req) => {
        return new Promise((resolve, reject) => {
            try {
                vertoken.getToken(req.headers['authorize_token']).then(token => {
                    resolve(token.username)
                })
            } catch {
                reject()
            }
        })
    },
    getTokenInfo: (connection, req, res) => {
        vertoken.getToken(req.headers['authorize_token']).then(token => {
            connection.query('SELECT username,avatar,roles,isShow FROM user WHERE id=?', token.id, function (err, info) {
                console.log(info)
            })
        })
    }
}
module.exports = tokenControll;