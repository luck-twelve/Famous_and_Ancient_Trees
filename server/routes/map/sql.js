// SQL语句封裝
var mapSqls = {
    getMapInfo: `SELECT archive_id,listing,tree_nameZh,tree_species,longitude,latitude,location_aliasName,marker FROM archives_tree WHERE isShow=1`
};
module.exports = mapSqls;