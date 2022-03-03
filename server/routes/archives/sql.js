// SQL语句封裝
var archivesSqls = {
    getArchives: 'SELECT * FROM trees',
    addArchives: 'INSERT INTO trees(treeName, treeType, treeAge, treeLocation, treeAdminister, treeHistoryLegend) VALUES(?,?,?,?,?,?)',
    updateArchives: 'UPDATE trees SET treeName=?, treeType=?, treeAge=?, treeLocation=?, treeAdminister=?, treeHistoryLegend=? WHERE tree_id=?',
    deleteArchives: 'DELETE FROM trees WHERE tree_id=?',

    getArchivesTree: 'SELECT * FROM archives_tree',
    addArchivesTree: 'INSERT INTO archives_tree',
    // deleteArchivesTree: 'DELETE FROM archives_tree WHERE archive_id=?'
    deleteArchivesTree: 'UPDATE archives_tree SET isShow=0 WHERE archive_id=?'
};
module.exports = archivesSqls;