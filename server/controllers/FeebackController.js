const feebackModel = require("../models/FeebackModel");
const jwt = require('jsonwebtoken'); //token
const { promisify } = require('util'); // nodejs原生



// 0629 aki 取得心得回饋by memberId
exports.getFeebeakByMemberId = async (req, res) => {
  const { token } = req.body;
  if (token) {
    // 解碼
    const decoded = await promisify(jwt.verify)(token, "jwtSecret")
    console.log(decoded);
    const { memberId } = decoded;

  await feebackModel // 解碼完後對照資料庫，有的話回傳該訂單資料
    .getFeebeakByMemberId(memberId)
    .then((result) => {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(result));
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Server error" });
    })
  } else {
    res.json({ message: "該用戶尚未登入" })
  }
};

// 0701 aki 修改心得回饋
exports.alterFeeback = async (req, res) => {
  console.log(req.body);
  const { orderId, feebackContent } = req.body;
  await feebackModel
    .alterFeeback(orderId, feebackContent)
    .then((result) => {
      console.log(result)
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(result));
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Server error" });
    });
};
