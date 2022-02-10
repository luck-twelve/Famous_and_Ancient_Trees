// SQL语句封裝
var menuSqls = {
    getAllMenu: 'SELECT * FROM menu',
    getUserInfo: 'SELECT username,avatar,roles FROM user WHERE uid=?'
};
module.exports = menuSqls;