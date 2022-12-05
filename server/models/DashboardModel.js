const db = require("./_ConfigDB");

// 2022-06-20 PG
// 取得 coupon 卷是否使用 By 指定條件
exports.getCouponUsageDataByCondition = async (dataList) => {
  return new Promise((resolve, reject) => {
    let sql =
      "SELECT IFNULL(COUNT(`CouponItem`.`coupon_item_id`), 0) AS ? " +
      "FROM `CouponItem` " +
      "WHERE `CouponItem`.`coupon_item_status` = ? " +
      "AND DATE_FORMAT(`CouponItem`.`create_datetime`,'%Y-%m') = ? " +
      "AND `CouponItem`.`coupon_id` = ?; ";
    let sqlAll =
      "SELECT IFNULL(COUNT(`CouponItem`.`coupon_item_id`), 0) AS ? " +
      "FROM `CouponItem` " +
      "WHERE DATE_FORMAT(`CouponItem`.`create_datetime`,'%Y-%m') = ? " +
      "AND `CouponItem`.`coupon_id` = ?; ";
    let value = [
      "couponUnUse",
      dataList.couponisUseStatus.couponUnUse,
      dataList.dateRange,
      dataList.couponId,
      "couponIsUse",
      dataList.couponisUseStatus.couponIsUse,
      dataList.dateRange,
      dataList.couponId,
      "couponAll",
      dataList.dateRange,
      dataList.couponId
    ];

    db.con.query(sql + sql + sqlAll, value, (err, rows, fields) => {
      if (err) {
        reject(err);
      }
      resolve(db.multipleQueryRowDataToSingleObj(rows));
    });
  });
};

// 2022-06-20 PG
// 取得活動類型 By 指定條件
exports.getActiveTypeDataByCondition = async (dataList) => {
  return new Promise((resolve, reject) => {
    let sql =
      "SELECT IFNULL(COUNT(`ExamItem`.`exam_item_id`), 0) AS ? " +
      "FROM `ExamItem` " +
      "JOIN `Order` ON `ExamItem`.`order_id` = `Order`.`order_id` " +
      "JOIN `Room` ON `Order`.`room_id` = `Room`.`room_id` " +
      "JOIN `Hotel` ON `Room`.`hotel_id` = `Hotel`.`hotel_id` " +
      "JOIN `City` ON `Hotel`.`city_id` = `City`.`city_id` " +
      "WHERE `ExamItem`.`active_pack_type`= ? " +
      "AND `ExamItem`.`order_id` IS NOT NULL " +
      "AND `City`.`city_id` = ? " +
      "AND DATE_FORMAT(`ExamItem`.`create_datetime`,'%Y-%m') = ?; ";
    let sqlAll =
      "SELECT IFNULL(COUNT(`ExamItem`.`exam_item_id`), 0) AS ? " +
      "FROM `ExamItem` " +
      "JOIN `Order` ON `ExamItem`.`order_id` = `Order`.`order_id` " +
      "JOIN `Room` ON `Order`.`room_id` = `Room`.`room_id` " +
      "JOIN `Hotel` ON `Room`.`hotel_id` = `Hotel`.`hotel_id` " +
      "JOIN `City` ON `Hotel`.`city_id` = `City`.`city_id` " +
      "AND `ExamItem`.`order_id` IS NOT NULL " +
      "AND `City`.`city_id` = ? " +
      "AND DATE_FORMAT(`ExamItem`.`create_datetime`,'%Y-%m') = ?; ";
    let value = [
      "activePackTypeA",
      dataList.activePackType.activePackTypeA,
      dataList.cityId,
      dataList.dateRange,
      "activePackTypeB",
      dataList.activePackType.activePackTypeB,
      dataList.cityId,
      dataList.dateRange,
      "activePackTypeC",
      dataList.activePackType.activePackTypeC,
      dataList.cityId,
      dataList.dateRange,
      "activePackTypeD",
      dataList.activePackType.activePackTypeD,
      dataList.cityId,
      dataList.dateRange,
      "activePackTypeE",
      dataList.activePackType.activePackTypeE,
      dataList.cityId,
      dataList.dateRange,
      "activePackTypeAll",
      dataList.cityId,
      dataList.dateRange
    ];
    db.con.query(
      sql + sql + sql + sql + sql + sqlAll,
      value,
      (err, rows, fields) => {
        if (err) {
          reject(err);
        }
        resolve(db.multipleQueryRowDataToSingleObj(rows));
      }
    );
  });
};

// 2022-06-21 PG
// 取得做完心理測驗後下單的狀況 By 指定條件
exports.getIsOrderAfterExamItemDataByCondition = async (dataList) => {
  return new Promise((resolve, reject) => {
    let sqlIsNotNull =
      "SELECT IFNULL(COUNT(`ExamItem`.`exam_item_id`), 0) AS ? " +
      "FROM `ExamItem` " +
      "WHERE `ExamItem`.`order_id` IS NOT NULL " +
      "AND DATE_FORMAT(`ExamItem`.`create_datetime`,'%Y-%m') = ?; ";
    let sqlIsNull =
      "SELECT IFNULL(COUNT(`ExamItem`.`exam_item_id`), 0) AS ? " +
      "FROM `ExamItem` " +
      "WHERE `ExamItem`.`order_id` IS NULL " +
      "AND DATE_FORMAT(`ExamItem`.`create_datetime`,'%Y-%m') = ?; ";
    let sqlAll =
      "SELECT IFNULL(COUNT(`ExamItem`.`exam_item_id`), 0) AS ? " +
      "FROM `ExamItem` " +
      "WHERE DATE_FORMAT(`ExamItem`.`create_datetime`,'%Y-%m') = ?; ";
    let value = [
      "isOrderAfterExamItem",
      dataList.dateRange,
      "noOrderAfterExamItem",
      dataList.dateRange,
      "examItemAll",
      dataList.dateRange
    ];
    db.con.query(
      sqlIsNotNull + sqlIsNull + sqlAll,
      value,
      (err, rows, fields) => {
        if (err) {
          reject(err);
        }
        resolve(db.multipleQueryRowDataToSingleObj(rows));
      }
    );
  });
};

// 2022-06-21 PG
// 取得營業額 By 指定條件
exports.getRevenueDataByCondition = async (dataList) => {
  return new Promise((resolve, reject) => {
    let sql = "";
    for (let j = 0; j <= 23; j++) {
      sql +=
        "SELECT COALESCE(SUM(`Order`.`order_total`), 0) AS ? " +
        "FROM `Order` " +
        "JOIN `Room` ON `Order`.`room_id` = `Room`.`room_id` " +
        "JOIN `Hotel` ON `Room`.`hotel_id` = `Hotel`.`hotel_id` " +
        "JOIN `City` ON `Hotel`.`city_id` = `City`.`city_id` " +
        "WHERE DATE_FORMAT(`Order`.`order_start_date`,'%Y-%m') = ? " +
        "AND `Room`.`room_type` = ? " +
        "AND `City`.`city_id` = ?; ";
    }

    let value = [];
    let year = dataList.dateRange.substr(0, 4);
    for (let i = 0; i <= 1; i++) {
      for (let j = 1; j <= 12; j++) {
        value.push(
          (i == 0 ? "backpacker" : "single") + j,
          year + "-" + (j < 10 ? "0" : "") + j,
          i == 0
            ? dataList.roomType.roomTypeBackpacker
            : dataList.roomType.roomTypeSingle,
          dataList.cityId
        );
      }
    }

    db.con.query(sql, value, (err, rows, fields) => {
      if (err) {
        reject(err);
      }
      resolve(db.multipleQueryRowDataToSingleObj(rows));
    });
  });
};

// 2022-06-21 PG
// 取得活動參加率 By 指定條件
exports.getIsActiveDataByCondition = async (dataList) => {
  return new Promise((resolve, reject) => {
    let sql =
      "SELECT IFNULL(COUNT(`Order`.`order_id`),0) AS ? " +
      "FROM `Order` " +
      "JOIN `OrderItem` ON `Order`.`order_id` = `OrderItem`.`order_item_id`" +
      "JOIN `Room` ON `Order`.`room_id` = `Room`.`room_id` " +
      "JOIN `Hotel` ON `Room`.`hotel_id` = `Hotel`.`hotel_id` " +
      "JOIN `City` ON `Hotel`.`city_id` = `City`.`city_id` " +
      "WHERE `OrderItem`.`is_active` = ? " +
      "AND DATE_FORMAT(`Order`.`order_start_date`,'%Y-%m') = ? " +
      "AND `City`.`city_id` = ?; ";

    let sqlAll =
      "SELECT IFNULL(COUNT(`Order`.`order_id`),0) AS ? " +
      "FROM `Order` " +
      "JOIN `OrderItem` ON `Order`.`order_id` = `OrderItem`.`order_item_id`" +
      "JOIN `Room` ON `Order`.`room_id` = `Room`.`room_id` " +
      "JOIN `Hotel` ON `Room`.`hotel_id` = `Hotel`.`hotel_id` " +
      "JOIN `City` ON `Hotel`.`city_id` = `City`.`city_id` " +
      "AND DATE_FORMAT(`Order`.`order_start_date`,'%Y-%m') = ? " +
      "AND `City`.`city_id` = ?; ";
    let value = [
      "isActive",
      dataList.isActive.isActive,
      dataList.dateRange,
      dataList.cityId,
      "isNoActive",
      dataList.isActive.isNoActive,
      dataList.dateRange,
      dataList.cityId,
      "isActiveAll",
      dataList.dateRange,
      dataList.cityId
    ];
    db.con.query(sql + sql + sqlAll, value, (err, rows, fields) => {
      if (err) {
        reject(err);
      }
      resolve(db.multipleQueryRowDataToSingleObj(rows));
    });
  });
};

// 2022-06-21 PG
// 取得回饋填寫率 By 指定條件
exports.getWriteFeebackDataByCondition = async (dataList) => {
  return new Promise((resolve, reject) => {
    let sql =
      "SELECT IFNULL(COUNT(`Order`.`order_id`), 0) AS ? " +
      "FROM `Order` " +
      "JOIN `Feeback` ON `Order`.`order_id` = `Feeback`.`order_id` " +
      "JOIN `Room` ON `Order`.`room_id` = `Room`.`room_id` " +
      "JOIN `Hotel` ON `Room`.`hotel_id` = `Hotel`.`hotel_id` " +
      "JOIN `City` ON `Hotel`.`city_id` = `City`.`city_id` " +
      "WHERE DATE_FORMAT(`Order`.`order_start_date`,'%Y-%m') = ? " +
      "AND `City`.`city_id` = ?; ";

    let sqlAll =
      "SELECT IFNULL(COUNT(`Order`.`order_id`), 0) AS ? " +
      "FROM `Order` " +
      "JOIN `OrderItem` ON `Order`.`order_id` = `OrderItem`.`order_item_id`" +
      "JOIN `Room` ON `Order`.`room_id` = `Room`.`room_id` " +
      "JOIN `Hotel` ON `Room`.`hotel_id` = `Hotel`.`hotel_id` " +
      "JOIN `City` ON `Hotel`.`city_id` = `City`.`city_id` " +
      "WHERE DATE_FORMAT(`Order`.`order_start_date`,'%Y-%m') = ? " +
      "AND `City`.`city_id` = ?; ";
    let value = [
      "writeFeeback",
      dataList.dateRange,
      dataList.cityId,
      "writeFeebackAll",
      dataList.dateRange,
      dataList.cityId
    ];
    db.con.query(sql + sqlAll, value, (err, rows, fields) => {
      if (err) {
        reject(err);
      }
      resolve(db.multipleQueryRowDataToSingleObj(rows));
    });
  });
};

// 2022-06-21 PG
// 取得入住率 By 指定條件
exports.getOccupancyByCondition = async (dataList) => {
  return new Promise((resolve, reject) => {
    let sql = "";

    for (let j = 0; j <= 13; j++) {
      sql +=
        "SELECT IFNULL(COUNT(`Order`.`order_id`), 0) AS ? " +
        "FROM `Order` " +
        "JOIN `Member` ON `Order`.`member_id` = `Member`.`member_id` " +
        "JOIN `Room` ON `Order`.`room_id` = `Room`.`room_id` " +
        "JOIN `Hotel` ON `Room`.`hotel_id` = `Hotel`.`hotel_id` " +
        "JOIN `City` ON `Hotel`.`city_id` = `City`.`city_id` " +
        "WHERE WEEKDAY(`Order`.`order_start_date`) = ? " + // 星期幾
        "AND `Member`.`member_gender` = ? " + // 性別
        "AND `Order`.`order_status` != '0' " + // 非未入住
        "AND  DATE_FORMAT(`Order`.`order_start_date`,'%Y-%m') = ? " +
        "AND `City`.`city_id` = ?; ";
    }
    for (let j = 0; j <= 6; j++) {
      sql +=
        "SELECT IFNULL(COUNT(`Order`.`order_id`), 0) AS ? " +
        "FROM `Order` " +
        "JOIN `Member` ON `Order`.`member_id` = `Member`.`member_id` " +
        "JOIN `Room` ON `Order`.`room_id` = `Room`.`room_id` " +
        "JOIN `Hotel` ON `Room`.`hotel_id` = `Hotel`.`hotel_id` " +
        "JOIN `City` ON `Hotel`.`city_id` = `City`.`city_id` " +
        "WHERE WEEKDAY(`Order`.`order_start_date`) = ? " + // 星期幾
        "AND `Order`.`order_status` != '0' " + // 非未入住
        "AND  DATE_FORMAT(`Order`.`order_start_date`,'%Y-%m') = ? " +
        "AND `City`.`city_id` = ?; ";
    }

    let value = [];
    for (let i = 0; i <= 1; i++) {
      for (let j = 0; j <= 6; j++) {
        value.push(
          (i == 0 ? "occupancyFmale" : "occupancyMale") + (j + 1),
          j,
          i == 0 ? dataList.sex.sexFmale : dataList.sex.sexMale,
          dataList.dateRange,
          dataList.cityId
        );
      }
    }
    for (let i = 0; i <= 6; i++) {
      value.push(
        "occupancyAll" + (i + 1),
        i,
        dataList.dateRange,
        dataList.cityId
      );
    }

    db.con.query(sql, value, (err, rows, fields) => {
      if (err) {
        reject(err);
      }
      resolve(db.multipleQueryRowDataToSingleObj(rows));
    });
  });
};
