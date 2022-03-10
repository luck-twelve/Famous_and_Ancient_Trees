// SQL语句封裝
var declareSqls = {
    getDeclare: 'SELECT * FROM trees',
    addDeclare: 'INSERT INTO trees(treeName, treeType, treeAge, treeLocation, treeAdminister, treeHistoryLegend) VALUES(?,?,?,?,?,?)',
    updateDeclare: 'UPDATE trees SET treeName=?, treeType=?, treeAge=?, treeLocation=?, treeAdminister=?, treeHistoryLegend=? WHERE id=?',
    deleteDeclare: 'DELETE FROM trees WHERE id=?'
};
module.exports = declareSqls;