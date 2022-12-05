const configController = require("./_ConfigController");
const roomImgModel = require("../models/RoomImgModel");

// 2022-06-15 PG
// 取得房型照片 By roomId
// return：json
exports.getRoomImgDataListByRoomId = async (req, res, next) => {
  let data = req.body;
  if (typeof data.roomId !== "undefined") {
    await roomImgModel
      .getRoomImgDataListByRoomId(data.roomId)
      .then((result) => {
        configController.sendJsonMsg(res, true, "", result);
      })
      .catch((err) => {
        // 目前不確定這邊要怎改
        console.log(err);
        res.status(500).json({ message: "Server error" });
      });
  } else {
    configController.sendJsonMsg(res, false, "無傳遞變數", []);
  }
};
