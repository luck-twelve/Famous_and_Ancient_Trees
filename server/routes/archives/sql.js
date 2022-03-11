// SQL语句封裝
var archivesSqls = {
    getArchives: 'SELECT * FROM trees',
    addArchives: 'INSERT INTO trees(treeName, treeType, treeAge, treeLocation, treeAdminister, treeHistoryLegend) VALUES(?,?,?,?,?,?)',
    updateArchives: 'UPDATE trees SET treeName=?, treeType=?, treeAge=?, treeLocation=?, treeAdminister=?, treeHistoryLegend=? WHERE id=?',
    deleteArchives: 'DELETE FROM trees WHERE id=?',

    getArchivesTree: 'SELECT * FROM archives_tree',
    addArchivesTree: 'INSERT INTO archives_tree',
    // deleteArchivesTree: 'DELETE FROM archives_tree WHERE id=?'
    deleteArchivesTree: 'UPDATE archives_tree SET isShow=99 WHERE id=?'
};
module.exports = archivesSqls;