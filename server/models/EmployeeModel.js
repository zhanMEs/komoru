const db = require("./_ConfigDB");
const nodemailer = require('nodemailer');

// 2022-06-30 PG
// 取得員工 Data By employeeAccount
// return：({})
exports.getEmployeeDataByEmployeeAccount = async (employeeAccount) => {
  return new Promise((resolve, reject) => {
    let sql =
      "SELECT *" +
      "FROM `Employee` " +
      "WHERE `Employee`.`employee_account` = ?;";
    let value = employeeAccount;
    db.con.query(sql, value, (err, rows, fields) => {
      if (err) {
        reject(err);
      }
      resolve(db.rowDataToCamelData(rows));
    });
  });
};

// 2022-07-02 PG
// 取得員工資料 dataList
// return：({})
exports.getEmployeeDataList = async () => {
  return new Promise((resolve, reject) => {
    let sql =
      "SELECT * " + "FROM `Employee` " + "WHERE `Employee`.`is_invalid` = '1';";
    db.con.query(sql, (err, rows, fields) => {
      if (err) {
        reject(err);
      }
      resolve(db.rowDataToCamelData(rows));
    });
  });
};

// 2022-07-08 PG
// 取得員工 dataList By 關鍵字
// return：({})
exports.getEmployeeDataListByKeyword = async (dataList) => {
  return new Promise((resolve, reject) => {
    let sql =
      "SELECT " +
      "`Employee`.* " +
      "FROM `Employee` " +
      "WHERE (`Employee`.`employee_account` LIKE '%" +
      dataList.keyword +
      "%' " +
      "OR `Employee`.`employee_name` LIKE '%" +
      dataList.keyword +
      "%' " +
      "OR `Employee`.`employee_phone` LIKE '%" +
      dataList.keyword +
      "%'); ";
      
    db.con.query(sql, (err, rows, fields) => {
      if (err) {
        reject(err);
      }
      resolve(rows.length == 0 ? rows : db.rowDataToCamelData(rows));
    });
  });
};


// 2022-07-02 PG
// 取得員工資料 Data By employeeId
// return：({})
exports.getEmployeeDataByEmployeeId = async (employeeId) => {
  return new Promise((resolve, reject) => {
    let sql =
      "SELECT * " +
      "FROM `Employee` " +
      "WHERE `Employee`.`employee_id` = ? " +
      "AND `Employee`.`is_invalid` = '1';";
    let value = employeeId;
    db.con.query(sql, value, (err, rows, fields) => {
      if (err) {
        reject(err);
      }
      resolve(db.rowDataToCamelData(rows));
    });
  });
};

// 2022-07-02 PG
// 新增員工資料
// return：{}
exports.addEmployee = async (dataList) => {
  return new Promise((resolve, reject) => {
    let sql =
      "INSERT INTO `Employee` " +
      "(`employee_account`, `employee_passwd`, `employee_name`, `employee_phone`, creator_id, `create_datetime`) " +
      "VALUES (?, ?, ?, ?, ?, ?);";
    let value = [
      dataList.employeeAccount,
      dataList.employeePasswd,
      dataList.employeeName,
      dataList.employeePhone,
      dataList.operatorEmployeeId,
      db.getDateTimeNow(),
    ];
    db.con.query(sql, value, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve({
        status: result.serverStatus,
        employeeId: result.insertId,
      });
    });
  });
};

// 2022-07-02 PG
// 修改員工資料 By employeeId
// return：{}
exports.updateEmployeeByEmployeeId = async (dataList) => {
  return new Promise((resolve, reject) => {
    let sql =
      "UPDATE `Employee` SET " +
      "`employee_account` = ?, `employee_passwd` = ?, `employee_name` = ?, `employee_phone` = ?, `updater_id` = ?, `update_datetime` = ? " +
      "WHERE `Employee`.`employee_id` = ?;";
    let value = [
      dataList.employeeAccount,
      dataList.employeePasswd,
      dataList.employeeName,
      dataList.employeePhone,
      dataList.operatorEmployeeId,
      db.getDateTimeNow(),
      dataList.employeeId,
    ];
    db.con.query(sql, value, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve({
        status: result.serverStatus,
      });
    });
  });
};

// 2022-07-02 PG
// 刪除員工資料 By employeeId
// return：{}
exports.delEmployeeByEmployeeId = async (dataList) => {
  return new Promise((resolve, reject) => {
    let sql =
      "UPDATE `Employee` SET " +
      "`is_invalid` = ?, `updater_id` = ?, `update_datetime` = ? " +
      "WHERE `Employee`.`employee_id` = ?;";
    let value = [
      "0",
      dataList.operatorEmployeeId,
      db.getDateTimeNow(),
      dataList.employeeId,
    ];
    db.con.query(sql, value, (err, result) => {
      if (err) {
        reject(err);
      }

      resolve({
        status: result.serverStatus,
      });
    });
  });
};

// 0706 聯絡我們API - MJ
exports.contactUs = async (data) => {
  return new Promise((resolve, reject) => {
    let subject = data.subject
    let html = data.html
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: '17komoru@gmail.com',
        pass: 'ecyppavarpuyspcw',
      },
    });
    let message = {
      from: '"Komoru" <17komoru@gmail.com>', // sender address
      to: '17komoru@gmail.com',
      subject: subject,
      html: html,
    }

    transporter.sendMail(message, (error, info) => {
      if (error) {
        reject(error);
      }
      resolve(info);
    });
  });
}


