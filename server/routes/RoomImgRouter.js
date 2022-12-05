const express = require("express");
const router = express.Router();

const roomImgController = require("../controllers/RoomImgController");

// 2022-06-12-PG
// 載入回傳 json 格式所需模組
const bodyParser = require("body-parser");
router.use(bodyParser.json());

// ----------------------------------------------------------------------------------------------------------------------

// 2022-06-15 PG
// 取得房型照片列表 By roomId
router.post("/getRoomImgDataListByRoomId", roomImgController.getRoomImgDataListByRoomId);

module.exports = router;
