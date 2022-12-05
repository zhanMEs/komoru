const db = require("./_ConfigDB");

// 2022-07-05 PG
// 取得訂單明細資料 by orderId
exports.getOrderItemDataListWithActivePackByOrderId = async (orderId) => {
    return new Promise((resolve, reject) => {
      let sql =
        "SELECT " +
        "`OrderItem`.`order_item_id`, `OrderItem`.`is_active`, `OrderItem`.`order_item_price`, `OrderItem`.`order_item_date`, " +
        "`ActivePack`.`active_pack_id`, `ActivePack`.`active_pack_type` " +
        "FROM `OrderItem` " +
        "LEFT JOIN `ActivePack` ON `OrderItem`.`active_pack_id` = `ActivePack`.`active_pack_id` " +
        "WHERE `OrderItem`.`order_id` = ?; ";
  
      db.con.query(sql, orderId, (err, rows, fields) => {
        if (err) {
          reject(err);
        }
        resolve(db.rowDataToCamelData(rows));
      });
    });
  };