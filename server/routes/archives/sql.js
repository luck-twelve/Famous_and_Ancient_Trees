// SQL语句封裝
var archivesSqls = {
    getArchives: 'SELECT * FROM trees',
    addArchives: 'INSERT INTO trees(treeName, treeType, treeAge, treeLocation, treeAdminister, treeHistoryLegend) VALUES(?,?,?,?,?,?)',
    updateArchives: 'UPDATE trees SET treeName=?, treeType=?, treeAge=?, treeLocation=?, treeAdminister=?, treeHistoryLegend=? WHERE tree_id=?',
    deleteArchives: 'DELETE FROM trees WHERE tree_id=?'
};
module.exports = archivesSqls;