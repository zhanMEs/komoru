const db = require("./_ConfigDB");

// 2022-06-18 PG
// 取得訂單 DataList、入住天數、房型資訊
// orderId orderNumber orderStartDate stayNight orderStatus
// memberName
// roomDesc
// return：({})
exports.getOrderDataListWithRoomDescAndStayNight = async () => {
  return new Promise((resolve, reject) => {
    let sql =
      "SELECT " +
      "`Order`.`order_id`, `Order`.`order_number`, `Order`.`order_start_date`, `Order`.`order_end_date`, DATEDIFF(`order_end_date`,`order_start_date`) AS `stay_night`, `Order`.`order_status`, " +
      "`Member`.`member_name`, " +
      "`City`.`city_name`, " +
      "`Room`.`room_type` " +
      "FROM `Order` " +
      "JOIN `Member` ON `Order`.`member_id` = `Member`.`member_id` " +
      "JOIN `Room` ON `Order`.`room_id` = `Room`.`room_id` " +
      "JOIN `Hotel` ON `Room`.`hotel_id` = `Hotel`.`hotel_id` " +
      "JOIN `City` ON `Hotel`.`city_id` = `City`.`city_id` " +
      "ORDER BY `Order`.`order_start_date` DESC, `Order`.`order_status` ASC, `City`.`city_id` ASC, `Room`.`room_type` ASC;";
    db.con.query(sql, (err, rows, fields) => {
      console.log(err);
      if (err) {
        reject(err);
      }
      resolve(db.rowDataToCamelData(rows));
    });
  });
};

// 2022-07-08 PG
// 取得訂單 DataList、房型資訊、入住天數 By 關鍵字、訂單狀態
// orderId orderNumber orderStartDate stayNight orderStatus
// memberName
// roomDesc
// return：({})
exports.getOrderDataListByKeywordAndOrderStatus = async (dataList) => {
  return new Promise((resolve, reject) => {
    let sql =
      "SELECT " +
      "`Order`.`order_id`, `Order`.`order_number`, `Order`.`order_start_date`, `Order`.`order_end_date`, DATEDIFF(`order_end_date`,`order_start_date`) AS `stay_night`, `Order`.`order_status`, " +
      "`Member`.`member_name`, " +
      "`City`.`city_name`, " +
      "`Room`.`room_type` " +
      "FROM `Order` " +
      "JOIN `Member` ON `Order`.`member_id` = `Member`.`member_id` " +
      "JOIN `Room` ON `Order`.`room_id` = `Room`.`room_id` " +
      "JOIN `Hotel` ON `Room`.`hotel_id` = `Hotel`.`hotel_id` " +
      "JOIN `City` ON `Hotel`.`city_id` = `City`.`city_id` " +
      "WHERE (`Order`.`order_number` LIKE '%" +
      dataList.keyword +
      "%' " +
      "OR `Order`.`order_start_date` LIKE '%" +
      dataList.keyword +
      "%' " +
      "OR `Order`.`order_start_date` LIKE '%" +
      dataList.keyword +
      "%' " +
      "OR `Order`.`order_end_date` LIKE '%" +
      dataList.keyword +
      "%' " +
      "OR `Member`.`member_name` LIKE '%" +
      dataList.keyword +
      "%' " +
      "OR `City`.`city_name` LIKE '%" +
      dataList.keyword +
      "%') ";

    if (dataList.orderStatus != "") {
      sql += "AND `Order`.`order_status` = ? ";
      sql +=
        "ORDER BY `Order`.`order_start_date` DESC, `Order`.`order_status` ASC, `City`.`city_id` ASC, `Room`.`room_type` ASC;";
    } else {
      sql +=
        "ORDER BY `Order`.`order_start_date` DESC, `Order`.`order_status` ASC, `City`.`city_id` ASC, `Room`.`room_type` ASC;";
    }

    let value = [dataList.orderStatus == "" ? "" : dataList.orderStatus];
    db.con.query(sql, value, (err, rows, fields) => {
      if (err) {
        reject(err);
      }
      resolve(db.rowDataToCamelData(rows));
    });
  });
};

// 2022-06-18 PG
// 修改訂單狀態 By orderId
// return：{}
exports.updateOrderStatusByOrderId = async (dataList) => {
  return new Promise((resolve, reject) => {
    let sql =
      "UPDATE `Order` SET " +
      "`order_status` = ?, `updater_id` = ?, `update_datetime` = ? " +
      "WHERE `Order`.`order_id` = ?;";
    let value = [
      dataList.orderStatus,
      dataList.employeeId,
      db.getDateTimeNow(),
      dataList.orderId,
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

// 2022-06-22 MJ
// 取得訂房資料
// 傳入JSON格式資料如下
/**
{
    "memberId": "19",
    "orderStartDate": "2022-07-03",
    "expDays": 3,
    "orderStatus": "0",
    "roomId": "5",
    "orderTotal": 8787,
    "activePackId": [9,8,7],
    "orderItemPrice": 8763,
    "isActive":"0",
    "joinTotal":"3"
}
*/
// return：JSON
exports.getOrderData = (data) => {
  // 駝峰轉_
  function decamelize(string, options) {
    options = options || {};
    var separator = options.separator || "_";
    var split = options.split || /(?=[A-Z])/;
    return string.split(split).join(separator).toLowerCase();
  }

  // 日期加天數Function
  Date.prototype.addDays = function (days) {
    this.setDate(this.getDate() + days);
    return this;
  };

  // 收到請求時加入創建訂單的時間
  data["createDatetime"] = db.getDateTimeNow();

  // 取得入住日期並加上體驗天數
  var date = new Date(data["orderStartDate"]);
  date = date.addDays(parseInt(data["expDays"])).toLocaleDateString();

  // 將體驗天數轉為退房日期並放入JSON資料中
  data["orderEndDate"] = date;
  delete data["expDays"];

  // console.log(data)
  // 把JSON中的駝峰改為_
  for (key in data) {
    var newKey = decamelize(key);
    if (newKey) {
      data[newKey] = data[key];
      delete data[key];
    }
  }
  return data;
};

// 2022-06-22 MJ
// 將訂房資料存入SQL
exports.saveOrderData = async (data) => {
  data = this.getOrderData(data);
  // 生成隨機亂碼做order_number
  data["order_number"] = db.creatRandomPassword(8);
  //  檢查order_number是否重複
  let check = await exports.isOnumExist(data["order_number"]);
  while (check) {
    data["order_number"] = db.creatRandomPassword(8);
    let doubleCheck = await exports.isOnumExist(data["order_number"]);
    if (doubleCheck) {
      break;
    }
  }

  // 存入SQL
  return new Promise(function (reslove, reject) {
    let sql =
      "INSERT INTO `Order` " +
      "(`member_id`, `order_start_date`, `order_status`, `room_id`, `order_total`, `create_datetime`, `order_end_date`, `order_number`, `coupon_item_id`) " +
      " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) ";
    value = [
      data["member_id"],
      data["order_start_date"],
      data["order_status"],
      data["room_id"],
      data["order_total"],
      data["create_datetime"],
      data["order_end_date"],
      data["order_number"],
      data["coupon_item_id"],
    ];
    db.con.query(sql, value, function (error, results, fields) {
      if (error) {
        reject(error);
      } else {
        reslove(data, console.log("The solution is: ", results));
      }
    });
  });
};

// 2022-06-28 MJ
// 檢查orderNumber是否重複
exports.isOnumExist = (orderNum) => {
  return new Promise((resolve, reject) => {
    let sql =
      "SELECT " +
      "`order_number`" +
      "FROM `Order`" +
      "WHERE `order_number` = ?";
    let value = orderNum;

    db.con.query(sql, value, (err, result) => {
      if (err) {
        reject(false);
      }
      resolve(true);
    });
  });
};

// 2022-06-29 MJ
// 取得會員couponItem dataList
// return：({})
exports.getCouponItemDataList = async (memberId) => {
  return new Promise((resolve, reject) => {
    let sql =
      "SELECT" +
      "`Coupon`.`coupon_title`,`CouponItem`.`coupon_id`,`Coupon`.`discount`" +
      "FROM `CouponItem`" +
      "JOIN `Coupon` ON `CouponItem`.`coupon_id` = `Coupon`.`coupon_id`" +
      "WHERE `CouponItem`.`coupon_item_status` = '0'" +
      "AND `CouponItem`.`member_id` = ?";
    let value = memberId;

    db.con.query(sql, value, (err, rows, fields) => {
      if (err) {
        reject(err);
      }
      resolve(db.rowDataToCamelData(rows));
    });
  });
};

// 2022-07-07 MJ
// 取得orderId BY memberId
exports.getOrdeIdByMemberId = async (memberId) => {
  return new Promise((resolve, reject) => {
    let sql =
      "SELECT `Order`.`order_id` FROM `Order` WHERE `member_id` = ? " +
      "ORDER BY `Order`.`order_start_date` DESC ";
    db.con.query(sql, memberId, (err, rows, fields) => {
      if (err) {
        reject(err);
      }
      resolve(db.rowDataToCamelData(rows));
    });
  });
};

// 2022-07-08 MJ
// 處理OrderArray
exports.splitOrderIdArray = async (orderIdArray) => {
  return new Promise(async (resolve, reject) => {
    try {
      var orderData = [];
      for (let i = 0; i < orderIdArray.length; i++) {
        await exports
          .getOrderDatalistByOrderId(orderIdArray[i]["orderId"])
          .then((result) => {
            orderData.push(result[0]);
          });
        await exports
          .getOrderItemDataListByOrderId(orderIdArray[i]["orderId"])
          .then((result) => {
            orderData[i]["OrderItem"] = result;
          });
      }
      resolve(orderData);
    } catch (error) {
      reject(error);
    }
  });
};

// 2022-07-08 MJ
// 取得訂單資料ByOrderId
exports.getOrderDatalistByOrderId = async (orderId) => {
  return new Promise((resolve, reject) => {
    let sql =
      "SELECT" +
      "`Order`.`order_id`, `Order`.`order_number`, `Order`.`room_id`, `Order`.`coupon_item_id`, `Order`.`order_status`, `Order`.`order_start_date`, `Order`.`order_end_date`, `Order`.`order_total`, `Order`.`create_datetime`, `Order`.`member_id`, `Member`.`member_mail`, `Member`.`member_name`, `Member`.`member_nick_name`, `Member`.`member_gender`, `Member`.`member_phone`, `Member`.`member_img_path`, `City`.`city_name`, `Hotel`.`hotel_title`, `Hotel`.`hotel_addr`, `Hotel`.`hotel_tel`, `Hotel`.`hotel_desc`, `Room`.`room_type`, `Room`.`room_content`, `RoomImg`.`room_img_path` " +
      "FROM `Order`" +
      "LEFT JOIN `Member` ON`Order`.`member_id` = `Member`.`member_id` " +
      "LEFT JOIN `Room` ON `Order`.`room_id` = `Room`.`room_id`" +
      "LEFT JOIN `Hotel` ON `Room`.`hotel_id` = `Hotel`.`hotel_id` " +
      "LEFT JOIN `City` ON `Hotel`.`city_id` = `City`.`city_id` " +
      "LEFT JOIN `CouponItem` ON `Order`.`coupon_item_id` = `CouponItem`.`coupon_item_id` " +
      "LEFT JOIN `RoomImg` ON `Room`.`room_id` = `RoomImg`.`room_id` " +
      "WHERE `Order`.`order_id` = ? " +
      "ORDER BY `Order`.`order_id` DESC ";

    db.con.query(sql, orderId, (err, rows, fields) => {
      if (err) {
        reject(err);
      }
      resolve(db.rowDataToCamelData(rows));
    });
  });
};

// 2022-06-30 MJ AKI
// 取得orderItemDataList byMemberId
exports.getOrderItemDataListByOrderId = async (orderId) => {
  return new Promise((resolve, reject) => {
    // 1.先找出packId
    let sql =
      "SELECT" +
      "`OrderItem`.`order_item_date`, `OrderItem`.`is_active`, `OrderItem`.`order_item_price`, `ActivePack`.`active_pack_id` " +
      "FROM `Order` " +
      "LEFT JOIN OrderItem ON `Order`.`order_id` = `OrderItem`.`order_id` " +
      "LEFT JOIN `ActivePack` ON `OrderItem`.`active_pack_id` = `ActivePack`.`active_pack_id` " +
      "WHERE `Order`.`order_id` = ? " +
      "ORDER BY `order_item_id` ASC ";
    db.con.query(sql, orderId, (err, rows, fields) => {
      if (err) {
        reject(err);
      }
      // 2.用PackId去找活動包
      var orderItemData = db.rowDataToCamelData(rows);
      var length = orderItemData.length;
      for (let i = 0; i < length; i++) {
        let activePackId = orderItemData[i].activePackId;
        if (activePackId) {
          let packContentSql =
            "SELECT" +
            "`ActivePackItem`.`active_pack_item_title`, `ActivePackItem`.`active_pack_item_content`, `ActivePackItem`.`partnership_id`, `Partnership`.`partnership_name`, `Partnership`.`partnership_addr`" +
            "FROM `ActivePackItem` " +
            "LEFT JOIN `Partnership` ON `ActivePackItem`.`partnership_id` = `Partnership`.`partnership_id` " +
            "WHERE `ActivePackItem`.`active_pack_id` = ? " +
            "ORDER BY `active_pack_item_id` ASC ";
          db.con.query(packContentSql, activePackId, (err, rows, fields) => {
            if (err) {
              reject(err);
            }
            orderItemData[i]["activePactContent"] = db.rowDataToCamelData(rows);
            if (i === 2) {
              resolve(orderItemData);
            }
          });
        } else {
          orderItemData[i]["activePactContent"] = "無參與活動";
          if (i === 2) {
            resolve(orderItemData);
          }
        }
      }
    });
  });
};

// 2022-07-05 PG
// 取得訂單資料 by orderId
exports.getOrderDataByOrderId = async (orderId) => {
  return new Promise((resolve, reject) => {
    let sql =
      "SELECT " +
      "`Order`.`order_id`, `Order`.`order_number`, `Order`.`order_status`, `Order`.`order_start_date`, `Order`.`order_end_date`, `Order`.`order_total`, `Order`.`payment`, " +
      "`Member`.`member_mail`, `Member`.`member_name`, `Member`.`member_nick_name`, `Member`.`member_gender`, `Member`.`member_phone`, " +
      "CONCAT(`City`.`city_name`, '-', `Hotel`.`hotel_title`, '/') AS `room_detail`, " +
      "IFNULL(`Coupon`.`coupon_title`,'無使用') AS `coupon_title`, " +
      "`Room`.`room_type` " +
      "FROM `Order` " +
      "JOIN `Member` ON `Order`.`member_id` = `Member`.`member_id` " +
      "JOIN `Room` ON `Order`.`room_id` = `Room`.`room_id` " +
      "JOIN `Hotel` ON `Room`.`hotel_id` = `Hotel`.`hotel_id` " +
      "JOIN `City` ON `Hotel`.`city_id` = `City`.`city_id` " +
      "LEFT JOIN `CouponItem` ON `Order`.`coupon_item_id` = `CouponItem`.`coupon_item_id` " +
      "LEFT JOIN `Coupon` ON `CouponItem`.`coupon_id` = `Coupon`.`coupon_id` " +
      "WHERE `Order`.`order_id` = ?; ";

    db.con.query(sql, orderId, (err, rows, fields) => {
      if (err) {
        reject(err);
      }
      resolve(db.rowDataToCamelData(rows));
    });
  });
};

// 2022-07-01 MJ
// 儲存OrderItemData
exports.saveOrderIdToOrderItemAndExamItem = (data) => {
  return new Promise((resolve, reject) => {
    // 用orderNumber查出orderId
    let orderNum = data["order_number"];
    let sql = "SELECT `order_id` FROM `Order` WHERE `order_number` = ? ";
    db.con.query(sql, orderNum, (err, rows, fields) => {
      if (err) {
        reject(err);
      } else {
        let orderId = db.rowDataToCamelData(rows)[0]["orderId"];
        let isActive = data["is_active"];
        var pack = data["active_pack_id"];
        var length = pack.length;
        // 寫入OrderId到ExamItem
        let examItemsql =
          "UPDATE `ExamItem` " +
          "SET `order_id` = ? " +
          "WHERE `member_id` = ? " +
          "ORDER BY `exam_item_id` DESC " +
          "LIMIT 1";
        let examValue = [orderId, data["member_id"]];
        db.con.query(examItemsql, examValue, (error, rows, fields) => {
          if (error) {
            reject(error);
          } else {
            if (isActive === "0") {
              // 依照總體驗天數寫入OrderId到對應的OrderItem
              for (i = 0; i < length; i++) {
                // 找到訂單號碼後存入OrderItem
                let orderItemsql =
                  "INSERT INTO `OrderItem`" +
                  "(`order_id`, `active_pack_id`, `order_item_date`, `is_active`, `create_datetime`, `order_item_price`)" +
                  " VALUES (?, ?, ?, ?, ?, ?) ";

                // 日期加天數Function
                Date.prototype.addDays = function (days) {
                  this.setDate(this.getDate() + days);
                  return this;
                };

                // 取得入住日期並加上體驗天數
                let order_start_date = new Date(data["order_start_date"]);
                value = [
                  orderId,
                  data["active_pack_id"][i],
                  order_start_date.addDays(i).toLocaleDateString(),
                  // if null ? '0' : '1'
                  data["active_pack_id"][i] ? data["is_active"] : "1",
                  data["create_datetime"],
                  data["order_item_price"],
                ];
                db.con.query(orderItemsql, value, (err, rows, fields) => {
                  if (err) {
                    reject(err);
                  } else {
                    resolve(db.rowDataToCamelData(rows));
                  }
                });
              }
            } else {
              let orderItemsql =
                "INSERT INTO `OrderItem`" +
                "(`order_id`, `active_pack_id`, `order_item_date`, `is_active`, `create_datetime`, `order_item_price`)" +
                " VALUES (?, ?, ?, ?, ?, ?) ";
              value = [
                orderId,
                data["active_pack_id"][i],
                data["order_start_date"],
                data["is_active"],
                data["create_datetime"],
                data["order_item_price"],
              ];
              db.con.query(orderItemsql, value, (err, rows, fields) => {
                if (err) {
                  reject(err);
                } else {
                  resolve(db.rowDataToCamelData(rows));
                }
              });
            }
          }
        });
      }
    });
  });
};
