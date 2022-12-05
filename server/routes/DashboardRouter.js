const express = require("express");
const router = express.Router();

const dashboardController = require("../controllers/DashboardController");

// 2022-06-12-PG
// 載入回傳 json 格式所需模組
const bodyParser = require("body-parser");
router.use(bodyParser.json());

// ----------------------------------------------------------------------------------------------------------------------

// 2022-06-20 PG
// 取得報表資料 By 指定條件，目前已有條件：縣市、日期區間（年-月 2022-06）
router.post("/getDashboardDataListByCondition", dashboardController.getDashboardDataListByCondition);



module.exports = router;
