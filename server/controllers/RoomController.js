const configController = require("./_ConfigController");
const roomModel = require("../models/RoomModel");
const roomImgModel = require("../models/RoomImgModel");
const fs = require("fs");

// 2022-06-15 PG
// 取得房型列表、主圖、所屬飯店名、所屬區域名
// roomId roomId roomTitle liveNum
// roomImgPath
// roomTitle
// cityName
// return：json
exports.getRoomDataListWithMainImgAndHotelNameAndCityName = async (
  req,
  res,
  next
) => {
  await roomModel
    .getRoomDataListWithMainImgAndHotelNameAndCityName()
    .then((result) => {
      Object.entries(result).forEach(([key, value]) => {
        // 將 enum 數值轉換為文字
        let valueToString = configController.enumValueToString(
          "Room",
          "roomType",
          value.roomType
        );
        // 如果檢查結果是正常，即將值取代為對應的文字，否則輸出錯誤訊息
        result[key].roomType = valueToString.errCheck
          ? valueToString.transferString
          : valueToString.errMsg;
      });
      configController.sendJsonMsg(res, true, "", result);
    })
    .catch((err) => {
      // 目前不確定這邊要怎改
      console.log(err);
      res.status(500).json({ message: "Server error" });
    });
};

// 2022-07-05 PG
// 取得房型列表、主圖、所屬飯店名、所屬區域名 By 關鍵字、城市
// roomId hotelId roomType liveNum
// roomImgPath
// hotelTitle
// return：json
exports.getRoomDataListByKeywordAndCityId = async (req, res, next) => {
  let data = req.body;
  let checkDataResult = checkData(data, ["keyword", "cityId"]);

  // 判斷是否有空值、沒有傳需要的資料
  if (checkDataResult.errCheck) {
    await roomModel
      .getRoomDataListByKeywordAndCityId(data)
      .then((result) => {
        Object.entries(result).forEach(([key, value]) => {
          // 將 enum 數值轉換為文字
          let valueToString = configController.enumValueToString(
            "Room",
            "roomType",
            value.roomType
          );
          // 如果檢查結果是正常，即將值取代為對應的文字，否則輸出錯誤訊息
          result[key].roomType = valueToString.errCheck
            ? valueToString.transferString
            : valueToString.errMsg;
        });
        configController.sendJsonMsg(res, true, "", result);
      })
      .catch((err) => {
        // 目前不確定這邊要怎改
        console.log(err);
        res.status(500).json({ message: "Server error" });
      });
  } else {
    configController.sendJsonMsg(res, false, checkDataResult.errMsg, []);
  }
};

// 2022-06-15 PG
// 取得房型資料和照片 By roomId
// return：json
exports.getRoomDataWithImgByRoomId = async (req, res, next) => {
  let data = req.body;
  if (typeof data.roomId !== "undefined") {
    await roomModel
      .getRoomDataWithImgByRoomId(data.roomId)
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

// 2022-06-29 PG
// 新增房型和照片
// return：json
exports.addRoomWithImg = async (req, res, next) => {
  let checkFieldsResult = checkData({ roomDataList: req.body.roomDataList }, [
    "roomDataList",
  ]);
  // 判斷有沒有傳送房型資料
  if (checkFieldsResult.errCheck) {
    let data = JSON.parse(req.body.roomDataList);
    let checkDataResult = checkData(data, [
      "hotelId",
      "roomType",
      "liveNum",
      "roomContent",
      "employeeId",
    ]);

    // 整理照片資訊
    let img = req.files.roomImgFile[0];
    let mimetype = img.mimetype.substr(img.mimetype.indexOf("/") + 1);
    data.roomImgPath = "/images/room/room-";
    data.mimetype = mimetype;

    // 判斷是否有空值、沒有傳需要的資料
    if (checkDataResult.errCheck) {
      await roomModel
        .addRoomWithImg(data)
        .then((result) => {
          // 判斷資料庫執行狀態是否為成功
          if (result.status == 2) {
            // 將檔案更名為 id 格式
            fs.rename(
              img.destination + img.filename,
              img.destination + "room-" + result.roomImgId + "." + mimetype,
              function (err) {
                if (err) configController.sendJsonMsg(res, false, err, []);
              }
            );
            configController.sendJsonMsg(res, true, "", {
              roomId: result.roomId,
            });
          } else {
            configController.sendJsonMsg(res, false, "SQL未預期錯誤", []);
          }
        })
        .catch((err) => {
          // 目前不確定這邊要怎改
          console.log(err);
          res.status(500).json({ message: "Server error" });
        });
    } else {
      configController.sendJsonMsg(res, false, checkDataResult.errMsg, []);
    }
  } else {
    configController.sendJsonMsg(res, false, checkFieldsResult.errMsg, []);
  }
};

// 2022-07-03 PG
// 修改房型和照片 By roomId
// return：json
exports.updateRoomWithImgByRoomId = async (req, res, next) => {
  let checkFieldsResult = checkData({ roomDataList: req.body.roomDataList }, [
    "roomDataList",
  ]);
  // 判斷有沒有傳送房型資料
  if (checkFieldsResult.errCheck) {
    let data = JSON.parse(req.body.roomDataList);
    let checkDataResult = checkData(data, [
      "roomId",
      "roomId",
      "roomType",
      "liveNum",
      "roomContent",
      "roomImgPath",
      "employeeId",
    ]);

    let img;
    let mimetype;
    // 判斷是否有傳照片
    if (Object.keys(req.files).length != 0) {
      // 整理照片資訊
      img = req.files.roomImgFile[0];
      mimetype = img.mimetype.substr(img.mimetype.indexOf("/") + 1);
      if (data.roomImgPath == "") {
        data.roomImgPath = "/images/room/room-";
      }
      data.mimetype = mimetype;
    }
    // 判斷是否有空值、沒有傳需要的資料
    if (checkDataResult.errCheck) {
      await roomModel
        .updateRoomWithImgByRoomId(data)
        .then((result) => {
          // 判斷資料庫執行狀態是否為成功
          if (result.status == 2) {
            if (Object.keys(req.files).length != 0) {
              // 如果已有照片的話先刪除
              if (data.roomImgPath !== "") {
                fs.unlink("./public" + data.roomImgPath, function (err) {
                  if (err) configController.sendJsonMsg(res, false, err, []);
                });
              }
              // 將檔案更名為 id 格式
              fs.rename(
                img.destination + img.filename,
                data.roomImgPath !== ""
                  ? "./public" + data.roomImgPath
                  : img.destination +
                  "room-" +
                  result.roomImgId +
                  "." +
                  mimetype,
                function (err) {
                  if (err) configController.sendJsonMsg(res, false, err, []);
                }
              );
            }
            configController.sendJsonMsg(res, true, "", {
              roomId: result.roomId,
            });
          } else {
            configController.sendJsonMsg(res, false, "SQL未預期錯誤", []);
          }
        })
        .catch((err) => {
          // 目前不確定這邊要怎改
          console.log(err);
          res.status(500).json({ message: "Server error" });
        });
    } else {
      configController.sendJsonMsg(res, false, checkDataResult.errMsg, []);
    }
  } else {
    configController.sendJsonMsg(res, false, checkFieldsResult.errMsg, []);
  }
};

// 2022-07-04 PG
// 刪除房型和照片 By roomId
// return：json
exports.delRoomWithImgByRoomId = async (req, res, next) => {
  let data = req.body;
  let checkDataResult = checkData(data, ["roomId", "employeeId"]);

  // 判斷是否有空值、沒有傳需要的資料
  if (checkDataResult.errCheck) {
    let delRoomResult = await delRoomByRoomId(data, res);
    if (delRoomResult.status == 2) {
      let delHoteImglResult = await delRoomImgByRoomId(data, res);
      if (delHoteImglResult.status == 2) {
        configController.sendJsonMsg(res, true, "", []);
      } else {
        configController.sendJsonMsg(res, false, "SQL未預期錯誤", []);
      }
    } else {
      configController.sendJsonMsg(res, false, "SQL未預期錯誤", []);
    }
  } else {
    configController.sendJsonMsg(res, false, checkDataResult.errMsg, []);
  }
};

// 2022-07-04 PG
// 刪除房型 By roomId
// dataList：刪除資料
// res：return err 用
// return：{}
const delRoomByRoomId = async (dataList, res) => {
  let roomData;
  await roomModel
    .delRoomByRoomId(dataList)
    .then((result) => {
      roomData = result;
    })
    .catch((err) => {
      // 目前不確定這邊要怎改
      console.log(err);
      res.status(500).json({ message: "Server error" });
    });
  return roomData;
};

// 2022-07-04 PG
// 刪除房型照片 By roomId
// dataList：刪除資料
// res：return err 用
// return：{}
const delRoomImgByRoomId = async (dataList, res) => {
  let roomImgDataList;
  await roomImgModel
    .delRoomImgByRoomId(dataList)
    .then((result) => {
      roomImgDataList = result;
    })
    .catch((err) => {
      // 目前不確定這邊要怎改
      console.log(err);
      res.status(500).json({ message: "Server error" });
    });
  return roomImgDataList;
};

// 2022-06-18 PG
// 檢查資料
// dataList：要檢查的資料（前端傳來的）
// dataColumns：要檢查的項目
// return json
const checkData = (dataList, dataColumns) => {
  let errMsg = "";
  let errCheck = true;
  dataColumns.forEach((value) => {
    switch (value) {
      case "roomContent":
      case "roomImgPath":
      case "keyword":
        if (typeof dataList[value] === "undefined") {
          errMsg += value + " 不可為空。";
          errCheck = false;
        }
        break;
      default:
        if (value == "cityId" && typeof dataList.keyword !== "undefined") {
          if (typeof dataList[value] === "undefined") {
            errMsg += value + " 不可為空。";
            errCheck = false;
          }
          break;
        } else if (
          typeof dataList[value] === "undefined" ||
          !dataList[value] ||
          typeof dataList[value] === ""
        ) {
          errMsg += value + " 不可為空。";
          errCheck = false;
        }
        break;
    }
  });
  return {
    errMsg: errMsg,
    errCheck: errCheck,
  };
};