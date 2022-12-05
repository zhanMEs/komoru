const configController = require("./_ConfigController");
const hotelModel = require("../models/HotelModel");
const hotelImgModel = require("../models/HotelImgModel");
const fs = require("fs");

// 2022-06-15 PG
// 取得飯店列表、主圖、所屬縣市名
// hotelId hotelTitle hotelAddr hotelTel hotelContent checkInTime checkOutTime
// hotelImgPath
// cityName
// return：json
exports.getHotelDataListWithMainImgAndCityName = async (req, res, next) => {
  await hotelModel
    .getHotelDataListWithMainImgAndCityName()
    .then((result) => {
      configController.sendJsonMsg(res, true, "", result);
    })
    .catch((err) => {
      // 目前不確定這邊要怎改
      console.log(err);
      res.status(500).json({ message: "Server error" });
    });
};

// 2022-07-05 PG
// 取得飯店 dataList By 關鍵字、城市
// hotelId hotelTitle hotelAddr hotelTel hotelContent checkInTime checkOutTime
// hotelImgPath
// cityName
// return：json
exports.getHotelDataListByKeywordAndCityId = async (req, res, next) => {
  let data = req.body;
  let checkDataResult = checkData(data, ["keyword", "cityId"]);

  // 判斷是否有空值、沒有傳需要的資料
  if (checkDataResult.errCheck) {
    await hotelModel
      .getHotelDataListByKeywordAndCityId(data)
      .then((result) => {
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
// 取得飯店資料和照片 By hotelId
// return：json
exports.getHotelDataWithImgByHotelId = async (req, res, next) => {
  let data = req.body;
  if (typeof data.hotelId !== "undefined") {
    let result = {
      hotelData: await getHotelDataByHotelId(data.hotelId, res),
      hotelImgDataList: await getHotelImgDataListByHotelId(data.hotelId, res),
    };

    configController.sendJsonMsg(res, true, "", result);
  } else {
    configController.sendJsonMsg(res, false, "無傳遞變數", []);
  }
};

// 2022-06-30 PG
// 取得飯店資料 By hotelId
// hotelId：飯店 Id
// res：return err 用
// return：{}
const getHotelDataByHotelId = async (hotelId, res) => {
  let hotelData;
  await hotelModel
    .getHotelDataByHotelId(hotelId)
    .then((result) => {
      hotelData = result;
    })
    .catch((err) => {
      // 目前不確定這邊要怎改
      console.log(err);
      res.status(500).json({ message: "Server error" });
    });
  return hotelData;
};

// 2022-06-30 PG
// 取得飯店照片 dataList By hotelId
// hotelId：飯店 Id
// res：return err 用
// return：{}
const getHotelImgDataListByHotelId = async (hotelId, res) => {
  let hotelImgDataList;
  await hotelImgModel
    .getHotelImgDataListByHotelId(hotelId)
    .then((result) => {
      hotelImgDataList = result;
    })
    .catch((err) => {
      // 目前不確定這邊要怎改
      console.log(err);
      res.status(500).json({ message: "Server error" });
    });
  return hotelImgDataList;
};

// 2022-07-01 PG
// 新增飯店和照片
// return：json
exports.addHotelWithImg = async (req, res, next) => {
  let checkFieldsResult = checkData({ hotelDataList: req.body.hotelDataList }, [
    "hotelDataList",
  ]);

  // 判斷有沒有傳送飯店資料
  if (checkFieldsResult.errCheck) {
    let data = JSON.parse(req.body.hotelDataList);
    let checkDataResult = checkData(data, [
      "hotelTitle",
      "hotelAddr",
      "hotelTel",
      "hotelDesc",
      "hotelContent",
      "cityId",
      "employeeId",
    ]);
    // 判斷是否有空值、沒有傳需要的資料
    if (checkDataResult.errCheck) {
      data.hotelImgDataList = {};

      let fileLength = Object.keys(req.files).length;
      // 判斷是否有傳照片
      if (fileLength != 0) {
        data.hotelImgPath = "/images/hotel/hotel-";
        // 整理照片資訊：副檔名、檔案路徑含原始檔名、檔案路徑
        Object.entries(req.files).forEach(([key, value]) => {
          Object.assign(data.hotelImgDataList, {
            [key]: {
              mimetype: value[0].mimetype.substr(
                value[0].mimetype.indexOf("/") + 1
              ),
              originName: value[0].destination + value[0].filename,
              destination: value[0].destination,
            },
          });
        });
      }
      await hotelModel
        .addHotelWithImg(data)
        .then((result) => {
          // 判斷資料庫執行狀態是否為成功
          if (result.status == 2) {
            // 如果有傳照片，將檔案更名為 id 格式
            if (fileLength != 0) {
              Object.values(result.hotelImgDataList).forEach((imgDataValue) => {
                fs.rename(
                  imgDataValue.originName,
                  imgDataValue.destination +
                  "hotel-" +
                  imgDataValue.hotelImgId +
                  "." +
                  imgDataValue.mimetype,
                  function (err) {
                    if (err) configController.sendJsonMsg(res, false, err, []);
                  }
                );
              });
            }
            configController.sendJsonMsg(res, true, "", {
              hotelId: result.hotelId,
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
// 修改飯店和照片 By hotelId
// return：json
exports.updateHotelWithImgByHotelId = async (req, res, next) => {
  let checkFieldsResult = checkData({ hotelDataList: req.body.hotelDataList }, [
    "hotelDataList",
  ]);

  // 判斷有沒有傳送飯店資料
  if (checkFieldsResult.errCheck) {
    let data = JSON.parse(req.body.hotelDataList);
    let checkDataResult = checkData(data, [
      "hotelId",
      "hotelTitle",
      "hotelAddr",
      "hotelTel",
      "hotelDesc",
      "hotelContent",
      "cityId",
      "employeeId",
    ]);
    // 判斷是否有空值、沒有傳需要的資料
    if (checkDataResult.errCheck) {
      data.hotelImgDataList = {};
      let fileLength = Object.keys(req.files).length;

      // 判斷是否有傳照片
      if (fileLength != 0) {
        data.hotelImgPathForSql = "/images/hotel/hotel-";
        // 給 model 判斷是否需要進新增照片的判斷用
        data.haveNewImg = true;

        // 整理照片資訊：副檔名、檔案路徑含原始檔名、檔案路徑
        Object.entries(req.files).forEach(([key, value]) => {
          Object.assign(data.hotelImgDataList, {
            [key]: {
              mimetype: value[0].mimetype.substr(
                value[0].mimetype.indexOf("/") + 1
              ),
              originName: value[0].destination + value[0].filename,
              destination: value[0].destination,
              hotelImgPath:
                data.hotelImgPath[key] == ""
                  ? ""
                  : "./public" + data.hotelImgPath[key],
            },
          });
        });
      } else {
        data.haveNewImg = false;
      }
      await hotelModel
        .updateHotelWithImgByHotelId(data)
        .then((result) => {
          // 判斷資料庫執行狀態是否為成功
          if (result.status == 2) {
            // 如果有傳照片，將檔案更名為 id 格式
            if (fileLength != 0) {
              Object.values(result.hotelImgDataList).forEach((imgDataValue) => {
                // 如果已有照片的話先刪除
                if (imgDataValue.hotelImgPath !== "") {
                  fs.unlink(imgDataValue.hotelImgPath, function (err) {
                    if (err) configController.sendJsonMsg(res, false, err, []);
                  });
                }
                fs.rename(
                  imgDataValue.originName,
                  imgDataValue.hotelImgPath !== ""
                    ? imgDataValue.hotelImgPath
                    : imgDataValue.destination +
                    "hotel-" +
                    imgDataValue.hotelImgId +
                    "." +
                    imgDataValue.mimetype,
                  function (err) {
                    if (err) configController.sendJsonMsg(res, false, err, []);
                  }
                );
              });
            }
            configController.sendJsonMsg(res, true, "", {
              hotelId: result.hotelId,
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
// 刪除飯店和照片 By hotelId
// return：json
exports.delHotelWithImgByHotelId = async (req, res, next) => {
  let data = req.body;
  let checkDataResult = checkData(data, ["hotelId", "employeeId"]);

  // 判斷是否有空值、沒有傳需要的資料
  if (checkDataResult.errCheck) {
    let delHotelResult = await delHotelByHotelId(data, res);
    if (delHotelResult.status == 2) {
      let delHoteImglResult = await delHotelImgByHotelId(data, res);
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
// 刪除飯店 By hotelId
// dataList：刪除資料
// res：return err 用
// return：{}
const delHotelByHotelId = async (dataList, res) => {
  let hotelData;
  await hotelModel
    .delHotelByHotelId(dataList)
    .then((result) => {
      hotelData = result;
    })
    .catch((err) => {
      // 目前不確定這邊要怎改
      console.log(err);
      res.status(500).json({ message: "Server error" });
    });
  return hotelData;
};

// 2022-07-04 PG
// 刪除飯店照片 By hotelId
// dataList：刪除資料
// res：return err 用
// return：{}
const delHotelImgByHotelId = async (dataList, res) => {
  let hotelImgDataList;
  await hotelImgModel
    .delHotelImgByHotelId(dataList)
    .then((result) => {
      hotelImgDataList = result;
    })
    .catch((err) => {
      // 目前不確定這邊要怎改
      console.log(err);
      res.status(500).json({ message: "Server error" });
    });
  return hotelImgDataList;
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
      case "hotelDesc":
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

// 2022-07-15 MJ
// 取得房型內容
exports.getHotelAndRoomContent = async (req, res) => {
  try {
    let hotelContent = await hotelModel.getHotelAndRoomContent()
    configController.sendJsonMsg(res, true, "", hotelContent)
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
}