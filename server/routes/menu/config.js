/* eslint-disable @typescript-eslint/no-var-requires */
const mysql = require('mysql'); // 引入mysql
const mysqlconfig = require('../../config/mysql'); // 引入mysql连接配置
const sql = require('./sql'); // 引入sql语句
var pool = mysql.createPool(mysqlconfig);
//响应JSON数据
var responseJSON = function (res, result) {
    if (typeof result == 'undefined') {
        res.json({
            code: "-200",
            msg: "操作失败"
        });
    } else {
        res.json(result);
    }
};
// 数组转树形结构
const toTrees = (data, roles) => {
    let root = [];
    if (roles !== 'admin') {
        data = data.filter(xx => xx.roles === roles)
    }
    data?.forEach(item => {
        // 根节点
        if (item.parent_id === null && !root.find(xx => xx.menu_id === item.parent_id)) {
            root.push(item);
            return;
        }
        // 父节点
        const parentEl = data.find(xx => xx.menu_id === item.parent_id);
        parentEl['children'] = [...(parentEl['children'] || []), item]
    });
    return root
}
//引入token 
var vertoken = require('../../token')
var menuControll = {
    getAllMenu: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            connection.query(sql.getAllMenu, function (err, result) {
                //将结果以json形式返回到前台
                responseJSON(res, result);
                //释放链接
                connection.release();
            })
        })
    },
    getMenus: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            vertoken.getToken(req.headers['authorize_token']).then(token => {
                connection.query(sql.getUserInfo, token.uid, function (err, info) {
                    connection.query(sql.getAllMenu, function (err, result) {
                        return res.json({
                            code: 200,
                            msg: '操作成功',
                            data: toTrees(result, info?.[0].roles),
                            flag: true
                        })
                    })
                })
            })
        })
    },
};
module.exports = menuControll;