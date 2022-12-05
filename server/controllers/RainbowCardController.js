const rainbowCardModel = require("../models/RainbowCardModel");
const configController = require("./_ConfigController");
const jwt = require('jsonwebtoken'); //token
const { application } = require("express");
const { promisify } = require('util'); // nodejs原生
const db = require("../models/_ConfigDB");
const { encode } = require("punycode");
const fs = require("fs");
const { Console } = require("console");


// 0704 勉勵金句抽卡 - MJ
exports.getRainbowCard = async (req, res) => {
    const { token } = req.body;
    if (token) {
      //   解碼
      const decoded = await promisify(jwt.verify)(token, "jwtSecret")
      const { memberId } = decoded
    // const memberId = 19
      
      if (memberId) {
        try {
        let getRainbowCard = await rainbowCardModel.getRainbowCard()
        let rainbowCardId = getRainbowCard[0].rainbowCardId
        let saveRainbowCard = await rainbowCardModel.saveRainbowCard(memberId, rainbowCardId)
        configController.sendJsonMsg(res, true, "", { getRainbowCard, saveRainbowCard })
      } catch (error) {
        configController.sendJsonMsg(res, false, "sqlError", error["sqlMessage"])
        console.log(error)
      }
    } else {
      configController.sendJsonMsg(res, false, "memberId Error", "")
    }
    } else {
      res.json({ message: "該用戶尚未登入" })
    }
  }
