// SQL语句封裝
var userSqls = {
    login: 'SELECT uid,username FROM user WHERE username=? and password=?',
    getUserInfo: 'SELECT username,avatar,roles FROM user WHERE uid=?',
    getUsers: 'SELECT uid,username,avatar,roles FROM user',
    getUsersByName: 'SELECT uid,username,avatar,roles FROM user WHERE username=?',
    getUsersByRoles: 'SELECT uid,username,avatar,roles FROM user WHERE roles=?',
    getUsersByNR: 'SELECT uid,username,avatar,roles FROM user WHERE username=? and roles=?',
    addUser: 'INSERT INTO user(username, password, avatar, roles) VALUES(?,?,?,?)',
    updateUser: 'UPDATE user SET username=?, password=?, avatar=?, roles=? WHERE uid=?',
    deleteUser: 'DELETE FROM user WHERE uid=?'
};
module.exports = userSqls;