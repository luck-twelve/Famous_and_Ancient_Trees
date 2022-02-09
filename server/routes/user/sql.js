// SQL语句封裝
var userSqls = {
    login: 'SELECT username,uid FROM user WHERE username=? and password=?',
    queryAll: 'SELECT * FROM user',
    queryById: 'SELECT * FROM user WHERE uid=?',
    queryByUsername: 'SELECT username FROM user WHERE username=?',
    insert: 'INSERT INTO user(uid, username, password) VALUES(?,?,?)',
    update: 'UPDATE user SET username=?, password=? WHERE uid=?',
    delete: 'DELETE FROM user WHERE uid=?'
};
module.exports = userSqls;