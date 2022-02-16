// SQL语句封裝
var archivesSqls = {
    getArchives: 'SELECT * FROM trees',
    addArchives: 'INSERT INTO archives(treeName, treeType, treeAge, treeLocation, treeAdminister, treeHistoryLegend) VALUES(?,?,?,?,?,?)',
    updateArchives: 'UPDATE archives SET treeName=?, treeType=?, treeAge=?, treeLocation=?, treeAdminister=?, treeHistoryLegend=? WHERE tree_id=?',
    deleteArchives: 'DELETE FROM archives WHERE tree_id=?'
};
module.exports = archivesSqls;