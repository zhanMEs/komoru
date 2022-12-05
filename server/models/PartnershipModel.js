const db = require("./_ConfigDB");

// 2022-06-16 PG
// 取得合作夥伴 dataList、所屬城市名稱
// partnershipId partnershipName partnershipAddr partnershipTel partnershipContactPerson
// cityName
// return：({})
exports.getPartnershipDataListWithCityName = async () => {
  return new Promise((resolve, reject) => {
    let sql =
      "SELECT " +
      "`Partnership`.`partnership_id`,`Partnership`.`partnership_name`,`Partnership`.`partnership_addr`,`Partnership`.`partnership_tel`,`Partnership`.`partnership_contact_person`," +
      "`City`.`city_name` " +
      "FROM `Partnership` " +
      "JOIN `City` ON `Partnership`.`city_id` = `City`.`city_id` " +
      "WHERE `Partnership`.`is_invalid` = '1';";
    db.con.query(sql, (err, rows, fields) => {
      if (err) {
        reject(err);
      }
      resolve(db.rowDataToCamelData(rows));
    });
  });
};

// 2022-07-05 PG
// 取得合作夥伴 dataList By 關鍵字、城市
// partnershipId partnershipName partnershipAddr partnershipTel partnershipContactPerson
// cityName
// return：({})
exports.getPartnershipDataListByKeywordAndCityId = async (dataList) => {
  return new Promise((resolve, reject) => {
    let sql =
      "SELECT " +
      "`Partnership`.`partnership_id`,`Partnership`.`partnership_name`,`Partnership`.`partnership_addr`,`Partnership`.`partnership_tel`,`Partnership`.`partnership_contact_person`," +
      "`City`.`city_name` " +
      "FROM `Partnership` " +
      "JOIN `City` ON `Partnership`.`city_id` = `City`.`city_id` " +
      "WHERE (`Partnership`.`partnership_name` LIKE '%" +
      dataList.keyword +
      "%' " +
      "OR `Partnership`.`partnership_addr` LIKE '%" +
      dataList.keyword +
      "%' " +
      "OR `Partnership`.`partnership_tel` LIKE '%" +
      dataList.keyword +
      "%' " +
      "OR `Partnership`.`partnership_contact_person` LIKE '%" +
      dataList.keyword +
      "%') ";

    if (dataList.cityId == "") {
      sql += "AND `Partnership`.`is_invalid` = '1';";
    } else {
      sql +=
        "AND `Partnership`.`is_invalid` = '1' " + "AND `City`.`city_id` = ?;";
    }
    let value = [dataList.cityId == "" ? "" : dataList.cityId];
    db.con.query(sql, value, (err, rows, fields) => {
      if (err) {
        reject(err);
      }
      resolve(rows.length == 0 ? rows : db.rowDataToCamelData(rows));
    });
  });
};

// 2022-06-15 PG
// 取得合作夥伴 Data By partnershipId
// return：({})
exports.getPartnershipDataByPartnershipId = async (partnershipId) => {
  return new Promise((resolve, reject) => {
    let sql =
      "SELECT *" +
      "FROM `Partnership` " +
      "WHERE `Partnership`.`partnership_id` = ? " +
      "AND `Partnership`.`is_invalid` = '1';";
    let value = partnershipId;
    db.con.query(sql, value, (err, rows, fields) => {
      if (err) {
        reject(err);
      }
      resolve(db.rowDataToCamelData(rows));
    });
  });
};

// 2022-06-16 PG
// 新增合作夥伴
// return：{}
exports.addPartnership = async (dataList) => {
  return new Promise((resolve, reject) => {
    let sql =
      "INSERT INTO `Partnership` " +
      "(`city_id`, `partnership_name`, `partnership_addr`, `partnership_tel`, `partnership_contact_person`, `partnership_desc`, creator_id, `create_datetime`) " +
      "VALUES (?, ?, ?, ?, ?, ?, ?, ?);";
    let value = [
      dataList.cityId,
      dataList.partnershipName,
      dataList.partnershipAddr,
      dataList.partnershipTel,
      dataList.partnershipContactPerson,
      dataList.partnershipDesc,
      dataList.employeeId,
      db.getDateTimeNow(),
    ];
    db.con.query(sql, value, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve({
        status: result.serverStatus,
        partnershipId: result.insertId,
      });
    });
  });
};

// 2022-06-17 PG
// 修改合作夥伴 By partnershipId
// return：{}
exports.updatePartnershipByPartnershipId = async (dataList) => {
  return new Promise((resolve, reject) => {
    let sql =
      "UPDATE `Partnership` SET " +
      "`city_id` = ?, `partnership_name` = ?, `partnership_addr` = ?, `partnership_tel` = ?, `partnership_contact_person` = ?, `partnership_desc` = ?, `updater_id` = ?, `update_datetime` = ? " +
      "WHERE `Partnership`.`partnership_id` = ?;";
    let value = [
      dataList.cityId,
      dataList.partnershipName,
      dataList.partnershipAddr,
      dataList.partnershipTel,
      dataList.partnershipContactPerson,
      dataList.partnershipDesc,
      dataList.employeeId,
      db.getDateTimeNow(),
      dataList.partnershipId,
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

// 2022-06-17 PG
// 刪除合作夥伴 By partnershipId
// return：{}
exports.delPartnershipByPartnershipId = async (dataList) => {
  return new Promise((resolve, reject) => {
    let sql =
      "UPDATE `Partnership` SET " +
      "`is_invalid` = ?, `updater_id` = ?, `update_datetime` = ? " +
      "WHERE `Partnership`.`partnership_id` = ?;";
    let value = [
      "0",
      dataList.employeeId,
      db.getDateTimeNow(),
      dataList.partnershipId,
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
