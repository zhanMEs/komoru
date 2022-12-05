const db = require("./_ConfigDB");



// 0714 確認會員 是否有領過註冊送200的coupon（酷碰ID=1） - aki
exports.checkSignIn200coupon = (memberId) => {
  return new Promise((resolve, reject) => {
    let sql =
      "SELECT" +
      "`member_id`,`coupon_id`,`coupon_item_status` FROM `CouponItem`" +
      "WHERE `coupon_id`=1 AND `member_id`= ?";

    let value = memberId

    db.con.query(sql, value, (err, rows, fields) => {
      if (err) {
        reject(err)
      }
      resolve(db.rowDataToCamelData(rows))
    })
  })
}