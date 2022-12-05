const db = require("./_ConfigDB");

// 0629 aki 取得心得回饋by memberId
exports.getFeebeakByMemberId = async (memberId) => {
  return new Promise((resolve, reject) => {
    let sql =

    "SELECT`Feeback`.`feeback_id`,`Feeback`.`feeback_content`, `Feeback`.`order_id`,"+
    "`Order`.`order_id`, `Order`.`order_number`,"+
    "`Hotel`.`Hotel_id`, `Hotel`.`hotel_title`, `Hotel`.`hotel_tel`, `Hotel`.`hotel_addr`,"+
    "`Order`.`order_start_date`, `Member`.`member_id`, `Member`.`member_name`,"+
    "`Room`.`room_type`,"+
    "(`order_end_date` - `order_start_date`) AS`stay_night`, `Order`.`order_status`,"+
    "CONCAT(`City`.`city_name`, '　', `Hotel`.`hotel_title`) AS`room_desc`"+
    "FROM`Order`"+
    "JOIN `Member` ON`Order`.`member_id` = `Member`.`member_id`"+
    "JOIN `Room` ON`Order`.`room_id` = `Room`.`room_id`"+
    "JOIN `Hotel` ON`Room`.`hotel_id` = `Hotel`.`hotel_id`"+
    "JOIN `City` ON`Hotel`.`city_id` = `City`.`city_id`"+
    "LEFT JOIN `Feeback` ON`Order`.`order_id` = `Feeback`.`order_id`"+
    "WHERE`Member`.`member_id` = ? "+
    "ORDER BY `order_start_date` DESC;" ;

    db.con.query(sql, memberId, (err, rows, fields) => {
      if (err) {
        reject(err);
      }
      resolve(db.rowDataToCamelData(rows));
    });
  });
};


// 0701 aki 新增心得回饋
exports.alterFeeback = async (orderId, feebackContent) => {
  return new Promise((resolve, reject) => {
    let sql = "INSERT INTO `Feeback`" +
    " (`order_id`,`feeback_content`,`create_datetime`)"+
    " VALUES (?, ?, ?);" ;
    let value = [
      orderId, 
      feebackContent, 
      db.getDateTimeNow()
    ];

    console.log(value)
    db.con.query(sql, value, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(
        console.log('修改成功')
      );
    });
  });
};