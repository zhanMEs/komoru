const express = require("express");
const router = express.Router();

const examItemController = require("../controllers/ExamItemController");

// 2022-06-12-PG
// 載入回傳 json 格式所需模組
const bodyParser = require("body-parser");
router.use(bodyParser.json());

// ----------------------------------------------------------------------------------------------------------------------
// 2022-06-24 MJ
// 取得並儲存心理測驗資料 By memberId
router.post('/getAndSaveExamData', examItemController.getAndSaveExamData)



module.exports = router;
