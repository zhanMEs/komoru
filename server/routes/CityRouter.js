const express = require("express");
const router = express.Router();

const cityController = require("../controllers/CityController");

// 2022-06-12-PG
// 載入回傳 json 格式所需模組
const bodyParser = require("body-parser");
router.use(bodyParser.json());

// ----------------------------------------------------------------------------------------------------------------------

// 2022-06-20 PG
// 取得縣市 dataList
router.post("/getCityDataList", cityController.getCityDataList);



module.exports = router;
