// SQL语句封裝
var abnormalSqls = {
    getAbnormalList: 'SELECT * FROM abnormal_info',
    addAbnormal: 'INSERT INTO abnormal_info',
    deleteAbnormal: 'UPDATE abnormal_info SET isShow=99 WHERE id=?',
    getAbnormalListEM: `SELECT date_format(create_time, '%m-%d') as day, count(*) as count FROM abnormal_info WHERE isShow!=99 AND TO_DAYS(NOW()) - TO_DAYS(create_time) <= 30  GROUP BY day`,

    getAbnormalNumberTM: `SELECT count(*) AS count FROM abnormal_info WHERE DATE_FORMAT(create_time, '%Y%m') = DATE_FORMAT(CURDATE( ), '%Y%m')`,
    getAbnormalNumberLM: `SELECT count(*) AS count FROM abnormal_info WHERE PERIOD_DIFF(date_format(now( ), '%Y%m'), DATE_FORMAT(create_time, '%Y%m')) = 1`,

    addAbTree: `UPDATE archives_tree SET marker='marker_abnormal' WHERE listing=?`,
    deleteAbTree: `UPDATE archives_tree SET marker='marker_normal' WHERE listing=?`,

    controllResolve: `UPDATE abnormal_info SET status=?, resolve_user=?, expect_finish_time=? WHERE id=?`,
    controllFinish: `UPDATE abnormal_info SET status=?, finish_time=? WHERE id=?`,
    controllReject: `UPDATE abnormal_info SET status=?, reject_reason=? WHERE id=?`,
};
module.exports = abnormalSqls;