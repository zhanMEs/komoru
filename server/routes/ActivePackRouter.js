const express = require("express");
const router = express.Router();

const activePackController = require("../controllers/ActivePackController");

// 2022-06-12-PG
// 載入回傳 json 格式所需模組
const bodyParser = require("body-parser");
router.use(bodyParser.json());

// ----------------------------------------------------------------------------------------------------------------------
// 2022-06-28 MJ 
// 取得活動包內容 by activePackType, cityId
router.post('/getActivePackData', activePackController.getActivePackData)



module.exports = router;
