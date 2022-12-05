const express = require("express");
const router = express.Router();

const orderItemController = require("../controllers/OrderItemController");

// 2022-06-12-PG
// 載入回傳 json 格式所需模組
const bodyParser = require("body-parser");
router.use(bodyParser.json());

// ----------------------------------------------------------------------------------------------------------------------




module.exports = router;
