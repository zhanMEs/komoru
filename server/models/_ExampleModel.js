const db = require("./_ConfigDB");

// Example
exports.getRainbowCardDataList = async () => {
  return new Promise((resolve, reject) => {
    let sql = "SELECT * FROM City";
    db.con.query(sql, (err, rows, fields) => {
      if (err) {
        reject(err);
      }
      resolve(db.rowDataToCamelData(rows));
    });
  });
};
