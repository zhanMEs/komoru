const db = require("./_ConfigDB");

// 2022-06-20 PG
// 取得縣市 dataList
// return：({})
exports.getCityDataList = async () => {
    return new Promise((resolve, reject) => {
      let sql =
        "SELECT *" +
        "FROM `City`;";
      db.con.query(sql, (err, rows, fields) => {
        if (err) {
          reject(err);
        }
        resolve(db.rowDataToCamelData(rows));
      });
    });
  };