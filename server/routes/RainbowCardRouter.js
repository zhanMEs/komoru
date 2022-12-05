const express = require("express");
const router = express.Router();

const rainbowCardController = require("../controllers/RainbowCardController");

// 2022-06-12-PG
// 載入回傳 json 格式所需模組
const bodyParser = require("body-parser");
router.use(bodyParser.json());

// ----------------------------------------------------------------------------------------------------------------------
// 0704 勉勵金句抽卡 - MJ
router.post('/getRainbowCard', rainbowCardController.getRainbowCard)




module.exports = router;
