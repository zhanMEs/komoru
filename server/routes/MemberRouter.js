const express = require("express");
const router = express.Router();
const passport = require("passport")
const memberController = require("../controllers/MemberController");

// 2022-06-12-PG
// 載入回傳 json 格式所需模組
const bodyParser = require("body-parser");
router.use(bodyParser.json());


// 2022-07-05 AKI (參考PG) 
// 上傳檔案初始化
const multer = require("multer");
// 自定義行為模式
const storage = multer.diskStorage({
  // 指定儲存路徑
  destination: function (req, file, cb) {
    cb(null, "./public/images/member/");
  },
  // 檔名更改
  filename: function (req, file, cb) {
    cb(null, "user" + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

// ----------------------------------------------------------------------------------------------------------------------

// 0616 秀出全部的會員 - aki
router.post("/showAllMember", memberController.showAllMember);

// 0616 是否有該會員email在資料庫 - aki
router.post("/checkMailIsExisted", memberController.checkMailIsExisted);

// 0619 確認帳密，允許登入 - aki
router.post("/loginAuth", memberController.loginAuth);

// 0619 確認帳密，允許登入 設jwt - aki // 仍在調整中
router.get('/verifyJWT', memberController.verifyJWT, (req, res) => {
  res.send({ auth: true, message: '嘿，恭喜妳已驗證成功' })
})

// 0621 註冊會員 - aki
router.post('/register', memberController.register);

// 0622 是否有登入 - aki
router.post('/isLogin', memberController.isLogin);

// 0623 會員登出 - aki (改由前端刪除token方式，此路由暫不使用)
// router.post('/logout',memberController.logout)

// 0627 修改個人資料 - aki 
router.post('/alterProfile', memberController.alterProfile);

// 0705 - AKI 會員專區 : 修改頭貼照片 by mail
router.post("/updateMemberIcon",
  upload.fields([{ name: "icon" }, { name: "mail" }]),
  memberController.updateMemberIcon);

// 0619 確認帳密，允許登入 - aki
router.post("/lineLogin", memberController.lineLogin);

// 0714 google登入 - MJ
router.post("/googleLogin", memberController.googleLogin);

module.exports = router;


