const db = require("./_ConfigDB");

// 2022-06-15 PG
// 取得房型照片列表 By roomId
// roomId：房型 Id
// return：[{}]
exports.getRoomImgDataListByRoomId = async (roomId) => {
  return new Promise((resolve, reject) => {
    let sql =
      "SELECT *" +
      "FROM `RoomImg` " +
      "WHERE `RoomImg`.`room_id` = ?" +
      "AND `RoomImg`.`is_invalid` = '1';";
    let value = roomId;
    db.con.query(sql, value, (err, rows, fields) => {
      if (err) {
        reject(err);
      }
      resolve(db.rowDataToCamelData(rows));
    });
  });
};

// 2022-07-04 PG
// 刪除房型照片 By roomId
// dataList：刪除資料
// return：{}
exports.delRoomImgByRoomId = async (dataList) => {
  return new Promise((resolve, reject) => {
    let sql =
      "UPDATE `RoomImg` SET " +
      "`is_invalid` = ?, `updater_id` = ?, `update_datetime` = ? " +
      "WHERE `RoomImg`.`room_id` = ?;";
    let value = [
      "0",
      dataList.employeeId,
      db.getDateTimeNow(),
      dataList.roomId,
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
