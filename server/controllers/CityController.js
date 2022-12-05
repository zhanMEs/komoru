const configController = require("./_ConfigController");
const cityModel = require("../models/CityModel");

// 2022-06-20 PG
// 取得縣市 dataList
// return：json
exports.getCityDataList = async (req, res, next) => {
    await cityModel
      .getCityDataList()
      .then((result) => {
        configController.sendJsonMsg(res, true, "", result);
      })
      .catch((err) => {
        // 目前不確定這邊要怎改
        console.log(err);
        res.status(500).json({ message: "Server error" });
      });
  };