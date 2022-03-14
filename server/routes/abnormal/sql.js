// SQL语句封裝
var abnormalSqls = {
    getAbnormalList: 'SELECT * FROM abnormal_info',
    addAbnormal: 'INSERT INTO abnormal_info',
    deleteAbnormal: 'UPDATE abnormal_info SET isShow=99 WHERE id=?',
};
module.exports = abnormalSqls;