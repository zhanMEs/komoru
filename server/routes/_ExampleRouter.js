const express = require("express");
const router = express.Router();

const exampleController = require("../controllers/_ExampleController");

// 2022-06-12-PG
// 載入回傳 json 格式所需模組
const bodyParser = require("body-parser");
router.use(bodyParser.json());

// ----------------------------------------------------------------------------------------------------------------------

// Example
router.post("/getRainbowCardDataList", exampleController.getRainbowCardDataList);

module.exports = router;
