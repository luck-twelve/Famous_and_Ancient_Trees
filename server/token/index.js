/* eslint-disable @typescript-eslint/no-var-requires */
var jwt = require('jsonwebtoken');
var jwtScrect = 'famous_and_ancient_trees_token';  //签名

//登录接口 生成token的方法
var setToken = function (id, username, roles) {
    return new Promise((resolve, reject) => {
        try {
            //expiresln 设置token过期的时间
            //{ id: id, username: username, roles: roles } 传入需要解析的值（ 一般为用户名，用户id，用户权限 等）
            const token = jwt?.sign({ id: id, username: username, roles: roles }, jwtScrect, { expiresIn: '2h' });
            resolve(token)
        } catch {
            reject()
        }
    })
}
//各个接口需要验证token的方法
var getToken = function (token) {
    return new Promise((resolve, reject) => {
        if (!token) {
            console.log('token是空的')
            reject({
                error: 'token 是空的'
            })
        } else {
            //第二种  改版后的
            var info = jwt?.verify(token, jwtScrect, (err, decoded) => {
                if (err) {
                    console.log('err-------------')
                    console.log(err)
                    return {
                        code: '401',
                        msg: 'token已过期'
                    }
                } else {
                    return decoded
                }
            });
            // if(info.iat < info.exp){
            //     return true //开始时间小于结束时间，代表token还有效
            // }else{
            //     return false
            // }
            console.log(info)
            resolve(info);  //解析返回的值（sign 传入的值）
        }
    })
}

module.exports = {
    setToken,
    getToken
}