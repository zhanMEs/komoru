const memberModel = require("../models/MemberModel");
const configController = require("./_ConfigController");
const jwt = require("jsonwebtoken"); //token
const { application } = require("express");
const { promisify } = require("util"); // nodejs原生
const db = require("../models/_ConfigDB");
const { encode } = require("punycode");
const fs = require("fs");
const { Console } = require("console");

// 0616 秀出全部的會員 - aki
exports.showAllMember = async (req, res, next) => {
  await memberModel
    .showAllMember()
    .then((result) => {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(result));
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Server error" });
    });
};

// 0616 是否有該會員email在資料庫 - aki
exports.checkMailIsExisted = async (req, res) => {
  const { mail } = req.body;
  await memberModel
    .checkMailIsExisted(mail)
    .then((result) => {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(result));
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Server error" });
    });
};

// 0619 確認帳密，允許登入（上）＋先生成token在後端 - aki
exports.loginAuth = async (req, res) => {
  console.log(req.body);
  const { mail, passwd } = req.body;
  console.log(mail, passwd);

  await memberModel
    .loginAuth(mail, passwd)
    .then((result) => {
      console.log(result);
      const memberId = result[0].memberId;
      console.log(memberId); //印出驗證通的會員id

      // 依據id生成token
      const token = jwt.sign({ memberId: memberId }, "jwtSecret", {
        expiresIn: "90d",
      }); //預設90天
      console.log(`印出專屬token：${token}`);

      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ auth: true, token: token, result: result }));
    })

    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Server error" });
    });
};

// 0619 確認帳密，允許登入（下） - aki
exports.verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    res.send("嘿，我需要一個token，下次請給我");
  } else {
    jwt.verify(token, "jwtSecret", (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: "您驗證失敗" });
      } else {
        req.memberId = decoded.memberId;
      }
      next();
    });
  }
};

// 0621 註冊會員 - aki
exports.register = async (req, res) => {
  console.log(req.body);
  const {
    mail,
    passwd,
    forgetPasswordAns,
    name,
    nickName,
    sex,
    phone,
    registerType,
  } = req.body;
  await memberModel
    .register(
      mail,
      passwd,
      forgetPasswordAns,
      name,
      nickName,
      sex,
      phone,
      registerType
    )
    .then((result) => {
      console.log(result);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(result));
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Server error" });
    });
};

// 0622 是否有登入 - aki
exports.isLogin = async (req, res, next) => {
  // console.log(req.body);
  const { token } = req.body;
  if (token) {
    // 解碼
    const decoded = await promisify(jwt.verify)(token, "jwtSecret");
    console.log(decoded);
    const { memberId } = decoded;

    await memberModel // 解碼完後對照資料庫，有的話回傳該會員資料
      .isLogin(memberId)
      .then((result) => {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(result));
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Server error" });
      });
  } else {
    res.json({ message: "該用戶尚未登入" });
  }
};

// 0627 修改個人資料 - aki
exports.alterProfile = async (req, res) => {
  console.log(req.body);
  const { mail, name, nickName, sex, phone } = req.body;
  await memberModel
    .alterProfile(mail, name, nickName, sex, phone)
    .then((result) => {
      console.log(result);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(result));
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Server error" });
    });
};

// 0705 - AKI 會員專區 : 修改頭貼照片 by mail
exports.updateMemberIcon = async (req, res) => {
  const { mail } = req.body;

  // 取上傳圖檔
  let img = req.files.icon[0];
  // 設訂檔案名稱，使用mail去除特殊符號
  let fileName = mail.replace(/[^A-Za-z0-9]/g, "");
  // 設定檔案路徑
  let iconFilePath = "/images/member/" + fileName;

  await memberModel
    .updateMemberIcon(iconFilePath, mail)
    .then((result) => {
      console.log(result);

      //副檔名讀取代調整
      fs.rename(
        img.destination + img.filename,
        "./public" + iconFilePath + ".PNG",
        function (err) {
          if (err) configController.sendJsonMsg(res, false, err, []);
        }
      );

      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(result));
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Server error" });
    });
};

// 2022-07-08 PG
// Line 登入
exports.lineLogin = async (req, res, next) => {
  let data = req.body;

  if (typeof data.token !== "undefined") {
    // 根據企業方金鑰解碼
    let userData = jwt.verify(data.token, "393a8b93b091685dd5e2ca7ed8bd4538");
    // 確認第三方 id 是否存在
    let checkResult = await checkThirdPartyRegisterIdIdExisted(userData.sub);

    if (!checkResult.status) {
      await memberModel
        .register(
          typeof userData.email == "undefined" ? "" : userData.email,
          "",
          "",
          userData.name,
          userData.name,
          "2",
          "",
          "2",
          userData.picture,
          userData.sub
        )
        .then((result) => {
          if (result.status == 2) {
            const token = jwt.sign({ memberId: result.memberId }, "jwtSecret", {
              expiresIn: "90d",
            });
            configController.sendJsonMsg(res, true, "", { token: token });
          } else {
            configController.sendJsonMsg(res, false, "SQL未預期錯誤", []);
          }
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({ message: "Server error" });
        });
    } else {
      const token = jwt.sign(
        { memberId: checkResult.data[0].memberId },
        "jwtSecret",
        {
          expiresIn: "90d",
        }
      );
      configController.sendJsonMsg(res, true, "", { token: token });
    }
  } else {
    configController.sendJsonMsg(res, false, "未傳遞變數", []);
  }
};

// 2022-07-08 PG
// 確認第三方 id 是否存在
const checkThirdPartyRegisterIdIdExisted = async (thirdPartyRegisterId) => {
  let check = false;
  let memberData = {};
  await memberModel
    .checkThirdPartyRegisterIdIdExisted(thirdPartyRegisterId)
    .then((result) => {
      if (result.length > 0) {
        check = true;
        memberData = result;
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Server error" });
    });
  return {
    status: check,
    data: memberData,
  };
};

// 2022-07-14 MJ
// google 登入
exports.googleLogin = async (req, res, next) => {
  let userData = req.body;
  if (userData) {
    // 確認第三方 id 是否存在
    let checkResult = await checkThirdPartyRegisterIdIdExisted(userData.uid);
    if (!checkResult.status) {
      await memberModel
        .register(
          typeof userData.email == "undefined" ? "" : userData.email,
          "",
          "",
          userData.name,
          userData.name,
          "2",
          "",
          "1",
          userData.picture,
          userData.uid
        )
        .then((result) => {
          if (result.status == 2) {
            const token = jwt.sign({ memberId: result.memberId }, "jwtSecret", {
              expiresIn: "90d",
            });
            configController.sendJsonMsg(res, true, "", { token: token });
          } else {
            configController.sendJsonMsg(res, false, "SQL未預期錯誤", []);
          }
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({ message: "Server error" });
        });
    } else {
      const token = jwt.sign(
        { memberId: checkResult.data[0].memberId },
        "jwtSecret",
        {
          expiresIn: "90d",
        }
      );
      configController.sendJsonMsg(res, true, "", { token: token });
    }
  } else {
    configController.sendJsonMsg(res, false, "未傳遞變數", []);
  }
};