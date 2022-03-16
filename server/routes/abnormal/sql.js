// SQL语句封裝
var abnormalSqls = {
    getAbnormalList: 'SELECT * FROM abnormal_info',
    addAbnormal: 'INSERT INTO abnormal_info',
    deleteAbnormal: 'UPDATE abnormal_info SET isShow=99 WHERE id=?',

    getAbnormalListEM: "select date_format(create_time, '%m') as col_month, count(*) as count from abnormal_info group by col_month"
};
module.exports = abnormalSqls;