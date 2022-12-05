const configController = require("./_ConfigController");
const employeeModel = require("../models/EmployeeModel");
const crypto = require("crypto");

// 2022-06-30 PG
// 後台登入
// return：json
exports.login = async (req, res, next) => {
  let data = req.body;
  let checkDataResult = checkData(data, ["employeeAccount", "employeePasswd"]);
  // 判斷是否有空值、沒有傳需要的資料
  if (checkDataResult.errCheck) {
    await employeeModel
      .getEmployeeDataByEmployeeAccount(data.employeeAccount)
      .then((result) => {
        // 判斷是否有符合帳號的資料
        if (result.length == 0) {
          configController.sendJsonMsg(res, false, "帳號或密碼錯誤", []);
        } else {
          md5InputPasswd = crypto
            .createHash("md5")
            .update(data.employeePasswd)
            .digest("hex");
          if (result[0].employeePasswd === md5InputPasswd) {
            req.session.employeeName = result[0].employeeName;
            req.session.employeeId = result[0].employeeId;
            req.session.backstageIsLogin = true;
            configController.sendJsonMsg(res, true, "", []);
          } else {
            configController.sendJsonMsg(res, false, "帳號或密碼錯誤", []);
          }
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
};

// 2022-07-02 PG
// 檢查後台使用者是否登入
exports.checkIsLogin = async (req, res, next) => {
  if (
    typeof req.session.backstageIsLogin === "undefined" ||
    !req.session.backstageIsLogin
  ) {
    configController.sendJsonMsg(res, false, "尚未登入", []);
  } else {
    configController.sendJsonMsg(res, true, "", {
      employeeName: req.session.employeeName,
      employeeId: req.session.employeeId,
    });
  }
};

// 2022-07-04 PG
// 後台登出
exports.logout = async (req, res, next) => {
  req.session.destroy();
  configController.sendJsonMsg(res, true, "", []);
};

// 2022-07-02 PG
// 取得員工資料 dataList
// return：json
exports.getEmployeeDataList = async (req, res, next) => {
  await employeeModel
    .getEmployeeDataList()
    .then((result) => {
      configController.sendJsonMsg(res, true, "", result);
    })
    .catch((err) => {
      // 目前不確定這邊要怎改
      console.log(err);
      res.status(500).json({ message: "Server error" });
    });
};

// 2022-07-08 PG
// 取得合作夥伴 dataList By 關鍵字、城市
// 取得員工 dataList By 關鍵字
// return：json
exports.getEmployeeDataListByKeyword = async (req, res, next) => {
  let data = req.body;
  let checkDataResult = checkData(data, ["keyword"]);

  // 判斷是否有空值、沒有傳需要的資料
  if (checkDataResult.errCheck) {
    await employeeModel
      .getEmployeeDataListByKeyword(data)
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

// 2022-07-02 PG
// 取得員工資料 Data By employeeId
// return：json
exports.getEmployeeDataByEmployeeId = async (req, res, next) => {
  let data = req.body;
  let checkDataResult = checkData(data, ["employeeId"]);
  // 判斷是否有空值、沒有傳需要的資料
  if (checkDataResult.errCheck) {
    await employeeModel
      .getEmployeeDataByEmployeeId(data.employeeId)
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

// 2022-07-02 PG
// 新增員工資料
// return：json
exports.addEmployee = async (req, res, next) => {
  let data = req.body;
  let checkDataResult = checkData(data, [
    "employeeAccount",
    "employeePasswd",
    "employeeName",
    "employeePhone",
    "operatorEmployeeId",
  ]);
  // 判斷是否有空值、沒有傳需要的資料
  if (checkDataResult.errCheck) {
    data.employeePasswd = crypto
      .createHash("md5")
      .update(data.employeePasswd)
      .digest("hex");
    await employeeModel
      .addEmployee(data)
      .then((result) => {
        // 判斷資料庫執行狀態是否為成功
        if (result.status == 2) {
          configController.sendJsonMsg(res, true, "", {
            employeeId: result.employeeId,
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
};

// 2022-07-02 PG
// 修改員工資料 By employeeId
// return：json
exports.updateEmployeeByEmployeeId = async (req, res, next) => {
  let data = req.body;
  let checkDataResult = checkData(data, [
    "employeeId",
    "employeeAccount",
    "employeePasswd",
    "employeeName",
    "employeePhone",
    "operatorEmployeeId",
  ]);
  // 判斷是否有空值、沒有傳需要的資料
  if (checkDataResult.errCheck) {
    data.employeePasswd = crypto
      .createHash("md5")
      .update(data.employeePasswd)
      .digest("hex");
    await employeeModel
      .updateEmployeeByEmployeeId(data)
      .then((result) => {
        // 判斷資料庫執行狀態是否為成功
        if (result.status == 2) {
          configController.sendJsonMsg(res, true, "", []);
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
};

// 2022-07-02 PG
// 刪除員工資料 By employeeId
// return：json
exports.delEmployeeByEmployeeId = async (req, res, next) => {
  let data = req.body;
  let checkDataResult = checkData(data, ["employeeId", "operatorEmployeeId"]);
  // 判斷是否有空值、沒有傳需要的資料
  if (checkDataResult.errCheck) {
    await employeeModel
      .delEmployeeByEmployeeId(data)
      .then((result) => {
        // 判斷資料庫執行狀態是否為成功
        if (result.status == 2) {
          configController.sendJsonMsg(res, true, "", []);
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
};

// 2022-07-06 MJ
// 聯絡我們
exports.contactUs = async (req, res) => {
  let data = req.body;
  try {
    await employeeModel.contactUs(data);
    configController.sendJsonMsg(res, true, "", "Message sent successfully!");
  } catch (error) {
    configController.sendJsonMsg(res, false, "error", error);
  }
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
      case "keyword":
        if (typeof dataList[value] === "undefined") {
          errMsg += value + " 不可為空。";
          errCheck = false;
        }
        break;
      default:
        if (
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
