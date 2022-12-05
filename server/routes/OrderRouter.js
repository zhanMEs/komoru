const express = require("express");
const router = express.Router();

const orderController = require("../controllers/OrderController");

// 2022-06-12-PG
// 載入回傳 json 格式所需模組
const bodyParser = require("body-parser");
router.use(bodyParser.json());

// ----------------------------------------------------------------------------------------------------------------------

// 2022-06-18 PG
// 取得訂單 DataList、房型資訊、入住天數
// orderId orderNumber orderStartDate stayNight orderStatus
// memberName
// roomDesc
router.post(
  "/getOrderDataListWithRoomDescAndStayNight",
  orderController.getOrderDataListWithRoomDescAndStayNight
);

// 2022-07-08 PG
// 取得訂單 DataList、房型資訊、入住天數 By 關鍵字、訂單狀態
// orderId orderNumber orderStartDate stayNight orderStatus
// memberName
// roomDesc
router.post(
  "/getOrderDataListByKeywordAndOrderStatus",
  orderController.getOrderDataListByKeywordAndOrderStatus
);

// 2022-06-18 PG
// 修改訂單狀態 By orderId
router.post(
  "/updateOrderStatusByOrderId",
  orderController.updateOrderStatusByOrderId
);

// 2022-06-22 MJ
// 取得並儲存訂單資料 By MemberId
router.post("/getAndSaveOrderData", orderController.getAndSaveOrderData);

// 2022-06-28 AKI MJ
// 取得訂單資料byMemberId (前台token 轉換)
router.post("/getOrderDataByMemberId", orderController.getOrderDataByMemberId);

// 2022-07-05 PG
// 取得訂單資料 by memberId（後台 memberId）
router.post(
  "/getOrderDataWithActivePackByOrderId",
  orderController.getOrderDataWithActivePackByOrderId
);

// 2022-06-29 MJ
// 取得會員的coupon datalist By MemberId
router.post("/getCouponData", orderController.getCouponData);

module.exports = router;
