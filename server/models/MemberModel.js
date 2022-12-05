const db = require("./_ConfigDB");

// 0616 秀出全部的會員 - aki
exports.showAllMember = async () => {
  return new Promise((resolve, reject) => {
    let sql = "SELECT * FROM Member";
    db.con.query(sql, (err, rows, fields) => {
      if (err) {
        reject(err);
      }
      resolve(db.rowDataToCamelData(rows));
    });
  });
};

// 0616 是否有該會員email在資料庫 - aki
exports.checkMailIsExisted = async (mail) => {
  return new Promise((resolve, reject) => {
    let sql =
      " SELECT * FROM Member WHERE `member_mail` =  ? ; ";
      //0710 有點怪怪的先註解掉 by aki
      // " SELECT * FROM Member WHERE `member_mail` =  ? AND `register_type` = 0; ";
    db.con.query(sql, mail, (err, rows, fields) => {
      if (err) {
        reject(err);
      }
      resolve(db.rowDataToCamelData(rows));
    });
  });
};

// 2022-07-08 PG
// 確認第三方 id 是否存在
exports.checkThirdPartyRegisterIdIdExisted = async (thirdPartyRegisterId) => {
  return new Promise((resolve, reject) => {
    let sql =
      " SELECT * FROM `Member` WHERE `Member`.`third_party_register_id` =  ? ; ";
    db.con.query(sql, thirdPartyRegisterId, (err, rows, fields) => {
      if (err) {
        reject(err);
      }
      resolve(db.rowDataToCamelData(rows));
    });
  });
};
// ' SELECT * FROM Member WHERE `member_mail` = "wang@gmail.com" ';

// 0619 確認帳密，允許登入(controller與emailIsExisted不同) - aki
// passwd暫時先由前端判斷
exports.loginAuth = async (mail, passwd) => {
  return new Promise((resolve, reject) => {
    let sql = " SELECT * FROM Member WHERE `member_mail` =  ? ; ";
    db.con.query(sql, mail, (err, rows, fields) => {
      if (err) {
        reject(err);
      }
      resolve(db.rowDataToCamelData(rows));
    });
  });
};

// 0621 註冊會員  - aki
exports.register = async (
  mail,
  passwd,
  forgetPasswordAns,
  name,
  nickName,
  sex,
  phone,
  registerType,
  memberImgPath = '',
  thirdPartyRegisterId = ''
) => {
  return new Promise((resolve, reject) => {
    let sql =
      "INSERT INTO `Member`" +
      " (`member_mail`, `member_passwd`, `member_forget_passwd_ans`, `member_name`, `member_nick_name`, `member_gender`, `member_phone`, `member_img_path`,`register_type`, `third_party_register_id`, `create_datetime`)" +
      " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
    let value = [
      mail,
      passwd,
      forgetPasswordAns,
      name,
      nickName,
      sex,
      phone,
      memberImgPath,
      registerType,
      thirdPartyRegisterId,
      db.getDateTimeNow(),
    ];

    console.log(value);
    db.con.query(sql, value, (err, rows, result) => {
      if (err) {
        reject(err);
      }
      resolve(
        {
          status: rows.serverStatus,
          memberId: rows.insertId,
        },
        console.log("新增成功")
      );
    });
  });
};

//  0622 是否有登入 - aki
exports.isLogin = async (memberId) => {
  return new Promise((resolve, reject) => {
    let sql = " SELECT * FROM Member WHERE `member_id` =  ? ; ";
    db.con.query(sql, memberId, (err, rows, fields) => {
      if (err) {
        reject(err);
      }
      resolve(db.rowDataToCamelData(rows));
    });
  });
};

// 0627 修改個人資料 - aki
// 更新(修改)一筆資料
// UPDATE `資料表` SET `欄位2` = '資料2'  WHERE `欄位1` = '資料1'  ;
exports.alterProfile = async (mail, name, nickName, sex, phone) => {
  return new Promise((resolve, reject) => {
    let sql =
      "UPDATE `Member`" +
      " SET `member_name`=?, `member_nick_name`=?, `member_gender`=?, `member_phone`=?,`update_datetime`=?" +
      " WHERE `member_mail` = ? ";
    let value = [name, nickName, sex, phone, db.getDateTimeNow(), mail];

    console.log(value);
    db.con.query(sql, value, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(console.log("修改成功"));
    });
  });
};

// 0705 - AKI 會員專區 : 修改頭貼照片 by mail
exports.updateMemberIcon = async (iconFilePath, mail) => {
  return new Promise((resolve, reject) => {
    let sql =
      "UPDATE `Member`" +
      " SET `member_img_path`=?,`update_datetime`=?" +
      " WHERE `member_mail` = ? ";
    let value = [iconFilePath + ".PNG", db.getDateTimeNow(), mail];

    console.log(value);
    db.con.query(sql, value, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(console.log("修改成功"));
    });
  });
};
