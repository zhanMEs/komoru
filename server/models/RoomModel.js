const db = require("./_ConfigDB");

// 2022-06-15 PG
// 取得房型列表、主圖、所屬飯店名、所屬區域名
// roomId hotelId roomType liveNum
// roomImgPath
// hotelTitle
// cityName
// return：({})
exports.getRoomDataListWithMainImgAndHotelNameAndCityName = async () => {
  return new Promise((resolve, reject) => {
    let sql =
      "SELECT" +
      "`Room`.`room_id`,`Room`.`hotel_id`,`Room`.`room_type`,`Room`.`live_num`," +
      "`RoomImg`.`room_img_path`," +
      "`Hotel`.`hotel_title`," +
      "`City`.`city_id`,`City`.`city_name` " +
      "FROM `Room` " +
      "JOIN `RoomImg` ON `Room`.`room_id` = `RoomImg`.`room_id` " +
      "JOIN `Hotel` ON `Room`.`hotel_id` = `Hotel`.`hotel_id` " +
      "JOIN `City` ON `Hotel`.`city_id` = `City`.`city_id` " +
      "WHERE `RoomImg`.`room_img_is_main` = '0' " +
      "AND `Room`.`is_invalid` = '1';";
    db.con.query(sql, (err, rows, fields) => {
      if (err) {
        reject(err);
      }
      resolve(db.rowDataToCamelData(rows));
    });
  });
};

// 2022-07-05 PG
// 取得房型列表、主圖、所屬飯店名、所屬區域名 By 關鍵字、城市
// roomId hotelId roomType liveNum
// roomImgPath
// hotelTitle
// cityName
// return：({})
exports.getRoomDataListByKeywordAndCityId = async (dataList) => {
  return new Promise((resolve, reject) => {
    let sql =
      "SELECT " +
      "`Room`.`room_id`,`Room`.`hotel_id`,`Room`.`room_type`,`Room`.`live_num`," +
      "`RoomImg`.`room_img_path`," +
      "`Hotel`.`hotel_title`," +
      "`City`.`city_id`,`City`.`city_name` " +
      "FROM `Room` " +
      "JOIN `RoomImg` ON `Room`.`room_id` = `RoomImg`.`room_id` " +
      "JOIN `Hotel` ON `Room`.`hotel_id` = `Hotel`.`hotel_id` " +
      "JOIN `City` ON `Hotel`.`city_id` = `City`.`city_id` " +
      "WHERE (`Hotel`.`hotel_title` LIKE '%" +
      dataList.keyword +
      "%' " +
      "OR `Room`.`live_num` LIKE '%" +
      dataList.keyword +
      "%') " +
      "AND `RoomImg`.`room_img_is_main` = '0' ";

    if (dataList.cityId == "") {
      sql += "AND `Room`.`is_invalid` = '1';";
    } else {
      sql += "AND `Room`.`is_invalid` = '1' " + "AND `City`.`city_id` = ?;";
    }
    let value = [dataList.cityId == "" ? "" : dataList.cityId];
    db.con.query(sql, value, (err, rows, fields) => {
      if (err) {
        reject(err);
      }
      resolve(db.rowDataToCamelData(rows));
    });
  });
};

// 2022-06-15 PG
// 取得房型資料和照片 By roomId
// return：({})
exports.getRoomDataWithImgByRoomId = async (roomId) => {
  return new Promise((resolve, reject) => {
    let sql =
      "SELECT `Room`.*, " +
      "`RoomImg`.`room_img_path`" +
      "FROM `Room` " +
      "JOIN `RoomImg` ON `Room`.`room_id` = `RoomImg`.`room_id` " +
      "WHERE `Room`.`room_id` = ? " +
      "AND `Room`.`is_invalid` = '1';";
    let value = roomId;
    db.con.query(sql, value, (err, rows, fields) => {
      if (err) {
        reject(err);
      }
      resolve(db.rowDataToCamelData(rows));
    });
  });
};

// 2022-06-29 PG
// 新增房型和照片
// return：{}
exports.addRoomWithImg = async (dataList) => {
  return new Promise((resolve, reject) => {
    let sql =
      "INSERT INTO `Room` " +
      "(`hotel_id`, `room_type`, `live_num`, `room_content`, `creator_id`, `create_datetime`) " +
      "VALUES (?, ?, ?, ?, ?, ?);";
    let value = [
      dataList.hotelId,
      dataList.roomType,
      dataList.liveNum,
      dataList.roomContent,
      dataList.employeeId,
      db.getDateTimeNow(),
    ];
    db.con.query(sql, value, (err, result) => {
      if (err) {
        reject(err);
      } else {
        // 如果房型新增成功才繼續新增照片
        if (result.serverStatus == 2) {
          // 新增照片
          let addImgSql =
            "INSERT INTO `RoomImg` " +
            "(`room_id`, `room_img_path`, `room_img_is_main`, `creator_id`, `create_datetime`) " +
            "VALUES (?, ?, ?, ?, ?);";
          let addImgValue = [
            result.insertId,
            "tmp",
            "0",
            dataList.employeeId,
            db.getDateTimeNow(),
          ];
          db.con.query(addImgSql, addImgValue, (addImgErr, addImgResult) => {
            if (addImgErr) {
              reject(addImgErr);
            } else {
              // 如果新增照片成功才修改照片路徑
              if (addImgResult.serverStatus == 2) {
                // 修改照片路徑
                let updateImgSql =
                  "UPDATE `RoomImg` SET " +
                  "`room_img_path` = ?, `updater_id` = ?, `update_datetime` = ? " +
                  "WHERE `RoomImg`.`room_img_id` = ?;";
                let updateImgValue = [
                  dataList.roomImgPath +
                  addImgResult.insertId +
                  "." +
                  dataList.mimetype,
                  dataList.employeeId,
                  db.getDateTimeNow(),
                  addImgResult.insertId,
                ];
                db.con.query(
                  updateImgSql,
                  updateImgValue,
                  (updateImgErr, updateImgResult) => {
                    if (updateImgErr) {
                      reject(updateImgErr);
                    } else {
                      resolve({
                        status: updateImgResult.serverStatus,
                        roomImgId: addImgResult.insertId,
                      });
                    }
                  }
                );
              }
            }
          });
        }
      }
    });
  });
};

// 2022-07-03 PG
// 修改房型和照片 By roomId
// return：{}
exports.updateRoomWithImgByRoomId = async (dataList) => {
  return new Promise((resolve, reject) => {
    let sql =
      "UPDATE `Room` SET " +
      "`hotel_id` = ?, `room_type` = ?, `live_num` = ?, `room_content` = ?, `updater_id` = ?, `update_datetime` = ? " +
      "WHERE `Room`.`room_id` = ?; ";
    let value = [
      dataList.hotelId,
      dataList.roomType,
      dataList.liveNum,
      dataList.roomContent,
      dataList.employeeId,
      db.getDateTimeNow(),
      dataList.roomId,
    ];
    db.con.query(sql, value, (err, result) => {
      if (err) {
        reject(err);
      } else {
        // 如果房型新增成功且沒有照片才繼續新增照片
        if (result.serverStatus == 2 && dataList.roomImgPath == "") {
          // 新增照片
          let addImgSql =
            "INSERT INTO `RoomImg` " +
            "(`room_id`, `room_img_path`, `room_img_is_main`, `creator_id`, `create_datetime`) " +
            "VALUES (?, ?, ?, ?, ?);";
          let addImgValue = [
            result.insertId,
            "tmp",
            "0",
            dataList.employeeId,
            db.getDateTimeNow(),
          ];
          db.con.query(addImgSql, addImgValue, (addImgErr, addImgResult) => {
            if (addImgErr) {
              reject(addImgErr);
            } else {
              // 如果新增照片成功才修改照片路徑
              if (addImgResult.serverStatus == 2) {
                // 修改照片路徑
                let updateImgSql =
                  "UPDATE `RoomImg` SET " +
                  "`room_img_path` = ?, `updater_id` = ?, `update_datetime` = ? " +
                  "WHERE `RoomImg`.`room_img_id` = ?;";
                let updateImgValue = [
                  dataList.roomImgPath +
                  addImgResult.insertId +
                  "." +
                  dataList.mimetype,
                  dataList.employeeId,
                  db.getDateTimeNow(),
                  addImgResult.insertId,
                ];
                db.con.query(
                  updateImgSql,
                  updateImgValue,
                  (updateImgErr, updateImgResult) => {
                    if (updateImgErr) {
                      reject(updateImgErr);
                    } else {
                      resolve({
                        status: updateImgResult.serverStatus,
                        roomImgId: addImgResult.insertId,
                      });
                    }
                  }
                );
              }
            }
          });
        } else {
          resolve({
            status: result.serverStatus,
          });
        }
      }
    });
  });
};

// 2022-07-04 PG
// 刪除房型 By roomId
// dataList：刪除資料
// return：{}
exports.delRoomByRoomId = async (dataList) => {
  return new Promise((resolve, reject) => {
    let sql =
      "UPDATE `Room` SET " +
      "`is_invalid` = ?, `updater_id` = ?, `update_datetime` = ? " +
      "WHERE `Room`.`room_id` = ?;";
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