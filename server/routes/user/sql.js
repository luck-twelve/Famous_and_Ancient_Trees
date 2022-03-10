// SQL语句封裝
var userSqls = {
    login: 'SELECT id,username FROM user WHERE username=? and password=?',
    getUserInfo: 'SELECT username,avatar,roles FROM user WHERE id=?',
    getUsers: 'SELECT id,username,avatar,roles FROM user',
    getUsersByName: 'SELECT id,username,avatar,roles FROM user WHERE username=?',
    getUsersByRoles: 'SELECT id,username,avatar,roles FROM user WHERE roles=?',
    getUsersByNR: 'SELECT id,username,avatar,roles FROM user WHERE username=? and roles=?',
    addUser: 'INSERT INTO user(username, password, avatar, roles) VALUES(?,?,?,?)',
    updateUser: 'UPDATE user SET username=?, password=?, avatar=?, roles=? WHERE id=?',
    deleteUser: 'DELETE FROM user WHERE id=?'
};
module.exports = userSqls;