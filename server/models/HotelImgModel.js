const db = require("./_ConfigDB");

// 2022-06-15 PG
// 取得飯店照片列表 By hotelId
// hotelId：飯店 Id
// return：[{}]
exports.getHotelImgDataListByHotelId = async (hotelId) => {
  return new Promise((resolve, reject) => {
    let sql =
      "SELECT *" +
      "FROM `HotelImg` " +
      "WHERE `HotelImg`.`hotel_id` = ? " +
      "AND `HotelImg`.`is_invalid` = '1';";
    let value = hotelId;
    db.con.query(sql, value, (err, rows, fields) => {
      if (err) {
        reject(err);
      }
      resolve(db.rowDataToCamelData(rows));
    });
  });
};

// 2022-07-04 PG
// 刪除飯店照片 By hotelId
// dataList：刪除資料
// return：{}
exports.delHotelImgByHotelId = async (dataList) => {
  return new Promise((resolve, reject) => {
    let sql =
      "UPDATE `HotelImg` SET " +
      "`is_invalid` = ?, `updater_id` = ?, `update_datetime` = ? " +
      "WHERE `HotelImg`.`hotel_id` = ?;";
    let value = [
      "0",
      dataList.employeeId,
      db.getDateTimeNow(),
      dataList.hotelId,
    ];
    db.con.query(sql, value, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve({
        status: result.serverStatus,
      });
    });
  });
};
