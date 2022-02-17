// SQL语句封裝
var declareSqls = {
    getDeclare: 'SELECT * FROM trees',
    addDeclare: 'INSERT INTO trees(treeName, treeType, treeAge, treeLocation, treeAdminister, treeHistoryLegend) VALUES(?,?,?,?,?,?)',
    updateDeclare: 'UPDATE trees SET treeName=?, treeType=?, treeAge=?, treeLocation=?, treeAdminister=?, treeHistoryLegend=? WHERE tree_id=?',
    deleteDeclare: 'DELETE FROM trees WHERE tree_id=?'
};
module.exports = declareSqls;