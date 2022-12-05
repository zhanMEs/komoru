const express = require("express");
const router = express.Router();

const feebackController = require("../controllers/FeebackController");

// 2022-06-12-PG
// 載入回傳 json 格式所需模組
const bodyParser = require("body-parser");
router.use(bodyParser.json());

// ----------------------------------------------------------------------------------------------------------------------

// 0629 aki 取得心得回饋by memberId
router.post("/getFeebeakByMemberId", feebackController.getFeebeakByMemberId);

// 0701 aki 修改心得回饋
router.post("/alterFeeback", feebackController.alterFeeback);

module.exports = router;
