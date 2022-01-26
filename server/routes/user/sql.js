// SQL语句封裝
var user = {
    insert: 'INSERT INTO user(uid, username, password) VALUES(?,?,?)',
    update: 'UPDATE user SET username=?, password=? WHERE uid=?',
    delete: 'DELETE FROM user WHERE uid=?',
    queryById: 'SELECT * FROM user WHERE uid=?',
    queryAll: 'SELECT * FROM user'
};
module.exports = user;