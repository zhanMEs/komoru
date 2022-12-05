const express = require("express");
const router = express.Router();

const hotelImgController = require("../controllers/HotelImgController");

// 2022-06-12-PG
// 載入回傳 json 格式所需模組
const bodyParser = require("body-parser");
router.use(bodyParser.json());

// ----------------------------------------------------------------------------------------------------------------------

// 2022-06-15 PG
// 取得飯店照片列表 By HotelId
router.post("/getHotelImgDataListByHotelId", hotelImgController.getHotelImgDataListByHotelId);


module.exports = router;
