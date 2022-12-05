const express = require("express");
const router = express.Router();

const couponController = require("../controllers/CouponController");

// 2022-06-12-PG
// 載入回傳 json 格式所需模組
const bodyParser = require("body-parser");
router.use(bodyParser.json());

// ----------------------------------------------------------------------------------------------------------------------
// 0704 取得會員coupon明細 - MJ
router.post('/getCouponByMemberId', couponController.getCouponByMemberId)

// 0705 coupon生成 - MJ
router.post('/createCoupon', couponController.createCoupon)




module.exports = router;
