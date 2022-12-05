const express = require("express");
const router = express.Router();

const employeeController = require("../controllers/EmployeeController");

// 2022-06-12-PG
// 載入回傳 json 格式所需模組
const bodyParser = require("body-parser");
router.use(bodyParser.json());

// 2022-06-30 PG
// 後台登入所需

const session = require("express-session");

router.use(
  session({
    // 加密
    secret: "kmr",
    resave: false,
    saveUninitialized: true,
    // 預設十分鐘過期
    cookie: { maxAge: 600000  }
  })
);

// ----------------------------------------------------------------------------------------------------------------------

// 2022-06-30 PG
// 後台登入
router.post("/login", employeeController.login);

// 2022-07-02 PG
// 檢查後台使用者是否登入
router.post("/checkIsLogin", employeeController.checkIsLogin);

// 2022-07-04 PG
// 後台登出
router.post("/logout", employeeController.logout);

// 2022-07-02 PG
// 取得員工資料 dataList
router.post("/getEmployeeDataList", employeeController.getEmployeeDataList);

// 2022-07-08 PG
// 取得員工 dataList By 關鍵字
router.post("/getEmployeeDataListByKeyword", employeeController.getEmployeeDataListByKeyword);

// 2022-07-02 PG
// 取得員工資料 Data By employeeId
router.post("/getEmployeeDataByEmployeeId", employeeController.getEmployeeDataByEmployeeId);

// 2022-07-02 PG
// 新增員工資料
router.post("/addEmployee", employeeController.addEmployee);

// 2022-07-02 PG
// 修改員工資料 By employeeId
router.post("/updateEmployeeByEmployeeId", employeeController.updateEmployeeByEmployeeId);

// 2022-07-02 PG
// 刪除員工資料 By employeeId
router.post("/delEmployeeByEmployeeId", employeeController.delEmployeeByEmployeeId);

// 2022-07-06 MJ
// 聯絡我們API 
router.post('/contactUs', employeeController.contactUs)

module.exports = router;
