/* eslint-disable @typescript-eslint/no-var-requires */
var jwt = require('jsonwebtoken');
var jwtScrect = 'famous_and_ancient_trees_token';  //签名

//登录接口 生成token的方法
var setToken = function (uid, username) {
    return new Promise((resolve, reject) => {
        //expiresln 设置token过期的时间
        //{ uid: uid, username: username } 传入需要解析的值（ 一般为用户名，用户id 等）
        const token = jwt.sign({ uid: uid, username: username }, jwtScrect, { expiresIn: '24h' });
        resolve(token)
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
            var info = jwt.verify(token, jwtScrect);
            resolve(info);  //解析返回的值（sign 传入的值）
        }
    })
}

module.exports = {
    setToken,
    getToken
}