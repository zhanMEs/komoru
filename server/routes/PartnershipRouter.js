const express = require("express");
const router = express.Router();

const partnershipController = require("../controllers/PartnershipController");

// 2022-06-12-PG
// 載入回傳 json 格式所需模組
const bodyParser = require("body-parser");
router.use(bodyParser.json());

// ----------------------------------------------------------------------------------------------------------------------

// 2022-06-16 PG
// 取得合作夥伴 dataList、所屬城市名稱
// partnershipId partnershipName partnershipAddr partnershipTel partnershipContactPerson
// cityName
router.post("/getPartnershipDataListWithCityName", partnershipController.getPartnershipDataListWithCityName);

// 2022-07-05 PG
// 取得合作夥伴 dataList By 關鍵字、城市
// partnershipId partnershipName partnershipAddr partnershipTel partnershipContactPerson
// cityName
router.post("/getPartnershipDataListByKeywordAndCityId", partnershipController.getPartnershipDataListByKeywordAndCityId);


// 2022-06-15 PG
// 取得合作夥伴 Data By partnershipId
router.post("/getPartnershipDataByPartnershipId", partnershipController.getPartnershipDataByPartnershipId);

// 2022-06-16 PG
// 新增合作夥伴
router.post("/addPartnership", partnershipController.addPartnership);

// 2022-06-17 PG
// 修改合作夥伴 By partnershipId
router.post("/updatePartnershipByPartnershipId", partnershipController.updatePartnershipByPartnershipId);

// 2022-06-17 PG
// 刪除合作夥伴 By partnershipId
router.post("/delPartnershipByPartnershipId", partnershipController.delPartnershipByPartnershipId);

module.exports = router;
