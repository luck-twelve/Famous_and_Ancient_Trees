// SQL语句封裝
var userSqls = {
    login: 'SELECT uid,username FROM user WHERE username=? and password=?',
    getUserInfo: 'SELECT username,avatar,roles FROM user WHERE uid=?',
    getUsers: 'SELECT uid,username,avatar,roles FROM user',
    getUsersByName: 'SELECT uid,username,avatar,roles FROM user WHERE username=?',
    getUsersByRoles: 'SELECT uid,username,avatar,roles FROM user WHERE roles=?',
    getUsersByNR: 'SELECT uid,username,avatar,roles FROM user WHERE username=?,roles=?',
    // insert: 'INSERT INTO user(uid, username, password) VALUES(?,?,?)',
    // update: 'UPDATE user SET username=?, password=? WHERE uid=?',
    // delete: 'DELETE FROM user WHERE uid=?'
};
module.exports = userSqls;