const express = require("express");
const router = express.Router();

const hotelController = require("../controllers/HotelController");

// 2022-06-12-PG
// 載入回傳 json 格式所需模組
const bodyParser = require("body-parser");
router.use(bodyParser.json());

// 2022-07-01 PG
// 上傳檔案初始化
const multer = require("multer");
// 自定義行為模式
const storage = multer.diskStorage({
  // 指定儲存路徑
  destination: function (req, file, cb) {
    cb(null, "./public/images/hotel/");
  },
  // 檔名更改
  filename: function (req, file, cb) {
    cb(null, "hotel" + file.originalname);
  },
});
const upload = multer({ storage: storage });

// ----------------------------------------------------------------------------------------------------------------------

// 2022-06-15 PG
// 取得飯店列表、主圖、所屬縣市名
// hotelId hotelTitle hotelAddr hotelTel hotelContent checkInTime checkOutTime
// hotelImgPath
// cityName
router.post(
  "/getHotelDataListWithMainImgAndCityName",
  hotelController.getHotelDataListWithMainImgAndCityName
);

// 2022-07-05 PG
// 取得飯店列表、主圖、所屬縣市名 By 關鍵字、城市
// hotelId hotelTitle hotelAddr hotelTel hotelContent checkInTime checkOutTime
// hotelImgPath
// cityName
router.post("/getHotelDataListByKeywordAndCityId", hotelController.getHotelDataListByKeywordAndCityId);

// 2022-06-15 PG
// 取得飯店資料和照片 By hotelId
router.post(
  "/getHotelDataWithImgByHotelId",
  hotelController.getHotelDataWithImgByHotelId
);

// 2022-07-01 PG
// 新增飯店和照片
router.post(
  "/addHotel",
  upload.fields([
    { name: "hotelDataList" },
    { name: "mainHotelImgFile" },
    { name: "firstHotelImgFile" },
    { name: "secondHotelImgFile" },
    { name: "thirdHotelImgFile" },
  ]),
  hotelController.addHotelWithImg
);

// 2022-07-04 PG
// 修改飯店 By hotelId
router.post(
  "/updateHotelByHotelId",
  upload.fields([
    { name: "hotelDataList" },
    { name: "mainHotelImgFile" },
    { name: "firstHotelImgFile" },
    { name: "secondHotelImgFile" },
    { name: "thirdHotelImgFile" },
  ]),
  hotelController.updateHotelWithImgByHotelId
);

// 2022-07-04 PG
// 刪除飯店 By hotelId
router.post("/delHotelByHotelId", hotelController.delHotelWithImgByHotelId);

// 2022-07-15 MJ 
// 取得飯店&房型內容
router.post('/getHotelAndRoomContent', hotelController.getHotelAndRoomContent)

module.exports = router;
