// SQL语句封裝
var archivesSqls = {
    getArchives: 'SELECT * FROM trees',
    addArchives: 'INSERT INTO trees(treeName, treeType, treeAge, treeLocation, treeAdminister, treeHistoryLegend) VALUES(?,?,?,?,?,?)',
    updateArchives: 'UPDATE trees SET treeName=?, treeType=?, treeAge=?, treeLocation=?, treeAdminister=?, treeHistoryLegend=? WHERE id=?',
    deleteArchives: 'DELETE FROM trees WHERE id=?',

    getArchivesTree: 'SELECT id,listing,company_province,company_city,company_district,location_township,location_village,location_social,longitude,latitude,location_aliasName,tree_area,tree_location,tree_type,tree_distribution,tree_species,tree_nameZh,tree_nameEn,tree_nameAlias,tree_ageReal,tree_ageLegend,tree_ageEstimate,tree_height,ground_circumference,crown_widthAverage,crown_widthEW,crown_widthNS,crown_altitude,crown_slopeDirection,crown_slopeDegree,crown_slopePosition,site_soilName,site_compactness,special_conditions,tree_owner,keeper,status,description,isShow FROM archives_tree',
    addArchivesTree: 'INSERT INTO archives_tree',
    // deleteArchivesTree: 'DELETE FROM archives_tree WHERE id=?'
    deleteArchivesTree: 'UPDATE archives_tree SET isShow=99 WHERE id=?'
};
module.exports = archivesSqls;