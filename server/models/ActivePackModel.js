const db = require("./_ConfigDB");

// 2022-06-29 MJ
// 取得活動包資料
exports.getActivePackDataByTypeAndCity = async (packType, cityId) => {
    return new Promise((resolve, reject) => {
        let sql = "SELECT" +
            "`ActivePackItem`.`active_pack_item_title`, `ActivePackItem`.`active_pack_item_content`, `ActivePack`.`active_pack_id` " +
            "FROM `ActivePackItem`" +
            "LEFT JOIN `ActivePack` ON `ActivePackItem`.`active_pack_id` = `ActivePack`.`active_pack_id`" +
            "WHERE `ActivePack`.`active_pack_type` = ?" +
            "AND `ActivePack`.`city_id` = ?"
        let value = [packType, cityId]
        db.con.query(sql, value, (err, rows, fields) => {
            if (err) {
                reject(err);
            }
            resolve(db.rowDataToCamelData(rows));
        })
    })
}