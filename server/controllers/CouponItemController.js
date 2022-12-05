const couponItemModel = require("../models/CouponItemModel");
const configController = require("./_ConfigController");
const { promisify } = require('util'); // nodejs原生
const jwt = require('jsonwebtoken'); //token

// 0714 確認會員 是否有領過註冊送200的coupon（酷碰ID=1） - aki
exports.checkSignIn200coupon = async (req, res) => {
    const { token } = req.body;
    if (token) {
        //   解碼
        const decoded = await promisify(jwt.verify)(token, "jwtSecret")
        const { memberId } = decoded
        // let memberId = 1

        if (memberId) {
            try {
                let result = await couponItemModel.checkSignIn200coupon(memberId)
                configController.sendJsonMsg(res, true, "", result)
            } catch (error) {
                configController.sendJsonMsg(res, false, "sqlError", error["sqlMessage"])
                console.log(error)
            }
        } else {
            configController.sendJsonMsg(res, false, "memberId有誤", "")
        }
    } else {
        res.json({ message: "該用戶尚未登入" })
    }
}
