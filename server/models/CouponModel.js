const db = require("./_ConfigDB");

// 0704 取得可使用的coupon - MJ
exports.getUsableCouponByMemberId = (memberId) => {
  return new Promise((resolve, reject) => {
    let sql =
      "SELECT" +
      "`Coupon`.`coupon_title`,`CouponItem`.`coupon_id`,`Coupon`.`discount`, `CouponItem`.`coupon_item_id` " +
      "FROM `CouponItem`" +
      "JOIN `Coupon` ON `CouponItem`.`coupon_id` = `Coupon`.`coupon_id`" +
      "WHERE `CouponItem`.`coupon_item_status` = '0'" +
      "AND `CouponItem`.`member_id` = ?"
    let value = memberId

    db.con.query(sql, value, (err, rows, fields) => {
      if (err) {
        reject(err)
      }
      resolve(db.rowDataToCamelData(rows))
    })
  })
}

// 0704 取得已使用的coupon - MJ
exports.getUnusableCouponByMemberId = (memberId) => {
  return new Promise((resolve, reject) => {
    let sql =
      "SELECT" +
      "`Coupon`.`coupon_title`,`CouponItem`.`coupon_id`,`Coupon`.`discount`, `CouponItem`.`coupon_item_id`" +
      "FROM `CouponItem`" +
      "JOIN `Coupon` ON `CouponItem`.`coupon_id` = `Coupon`.`coupon_id`" +
      "WHERE `CouponItem`.`coupon_item_status` = '1'" +
      "AND `CouponItem`.`member_id` = ?"
    let value = memberId

    db.con.query(sql, value, (err, rows, fields) => {
      if (err) {
        reject(err)
      }
      resolve(db.rowDataToCamelData(rows))
    })
  })
}

// 0705 生成coupon - MJ 
exports.createCoupon = async (memberId, couponId) => {
  return new Promise((resolve, reject) => {
    let sql = "INSERT INTO `CouponItem` " +
      "(`member_id`, `coupon_id`, `coupon_item_status`, `create_datetime`, `update_datetime`) " +
      "VALUE (?, ?, '0', ?, ?) "
    let time = db.getDateTimeNow()
    let value = [memberId, couponId, time, time]

    db.con.query(sql, value, (err, results, fields) => {
      if (err) {
        reject(err)
      }
      resolve('The solution is: ', results)
    })
  })
}

// 0705 使用coupon - MJ 
exports.useCoupon = async (value, memberId, couponId) => {
  return new Promise((resolve, reject) => {
    let sql = 
      "UPDATE `CouponItem`" +
      " SET `CouponItem`.`coupon_item_status` = ?" +
      " WHERE `CouponItem`.`member_id` = ? AND `CouponItem`.`coupon_item_id` = ? ";
    let values = [value, memberId, couponId]
    db.con.query(sql, values, (err, rows, fields) => {
      if (err) {
        reject(err)
      }
      resolve(rows)
    })
  })
}