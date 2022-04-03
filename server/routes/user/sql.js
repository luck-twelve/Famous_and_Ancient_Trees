// SQL语句封裝
var userSqls = {
    login: 'SELECT id,username FROM user WHERE username=? and password=?',
    getUserInfo: 'SELECT username,avatar,roles,tag FROM user WHERE id=?',
    getUsers: 'SELECT id,username,avatar,roles,tag FROM user',
    getUsersByName: 'SELECT id,username,avatar,roles,tag FROM user WHERE username=?',
    getUsersByRoles: 'SELECT id,username,avatar,roles,tag FROM user WHERE roles=?',
    getUsersByNR: 'SELECT id,username,avatar,roles,tag FROM user WHERE username=? and roles=?',
    addUser: 'INSERT INTO user(username, password, avatar, roles, tag) VALUES(?,?,?,?,?)',
    updateUser: 'UPDATE user SET username=?, avatar=?, roles=?, tag=? WHERE id=?',
    deleteUser: 'DELETE FROM user WHERE id=?'
};
module.exports = userSqls;