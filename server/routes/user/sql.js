// SQL语句封裝
var userSqls = {
    login: 'SELECT id,username,real_name,roles FROM user WHERE username=? and password=?',
    getUserInfo: 'SELECT username,avatar,real_name,roles,tag,create_time,update_time FROM user WHERE id=?',
    getUsers: 'SELECT id,username,avatar,real_name,roles,tag,create_time,update_time FROM user',
    getWorkers: `SELECT id,username,avatar,roles,tag,real_name,create_time,update_time FROM user WHERE roles='worker'`,
    getUsersByName: 'SELECT id,username,avatar,real_name,roles,tag,create_time,update_time FROM user WHERE username=?',
    getUsersByRoles: 'SELECT id,username,avatar,real_name,roles,tag,create_time,update_time FROM user WHERE roles=?',
    getUsersByNR: 'SELECT id,username,avatar,real_name,roles,tag,create_time,update_time FROM user WHERE username=? and roles=?',
    addUser: 'INSERT INTO user(username, password, avatar, roles, tag) VALUES(?,?,?,?,?)',
    updateUser: 'UPDATE user SET username=?, avatar=?, roles=?, tag=? WHERE id=?',
    deleteUser: 'DELETE FROM user WHERE id=?'
};
module.exports = userSqls;