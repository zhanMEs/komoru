const express = require("express");
const router = express.Router();

const couponItemController = require("../controllers/CouponItemController");

// 2022-06-12-PG
// 載入回傳 json 格式所需模組
const bodyParser = require("body-parser");
router.use(bodyParser.json());

// ----------------------------------------------------------------------------------------------------------------------


// 0714 確認會員 是否有領過註冊送200的coupon（酷碰ID=3） - aki
router.post('/checkSignIn200coupon', couponItemController.checkSignIn200coupon)

module.exports = router;
