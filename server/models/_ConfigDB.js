const mysql = require("mysql");

// const db = mysql.createConnection({
//   host: "db4free.net",
//   port: "3306",
//   user: "kmradmin",
//   password: "1qaz@WSX",
//   database: "komoru",
//   dateStrings: true, // 2022-06-18 PG 強制日期格式以字串傳回
//   multipleStatements: true
// });

const db = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "",
  database: "komoru",
  dateStrings: true, // 2022-06-18 PG 強制日期格式以字串傳回
  multipleStatements: true,
});

db.connect(function (err) {
  // console.log(err);
  if (err) {
    console.log("connecting error");
    return;
  }
  console.log("connecting success");
});

exports.con = db;

// 2022-06-14 PG
// 將 column name 底線轉換為駝峰
// Ex：city_id -> cityId
// text：要轉換的字串
// return：string
exports.setColumnNameLineToCamel = (text) => {
  return text.replace(/(_\w)/g, (t) => {
    return t[1].toUpperCase();
  });
};

// 2022-06-14 PG
// 將 column name 駝峰轉換為底線
// Ex：cityId -> city_id
// text：要轉換的字串
// return：string
exports.setColumnNameCamelToLine = (text) => {
  return text
    .replace(/[\w]([A-Z])/g, (m) => {
      return m[0] + "_" + m[1];
    })
    .toLowerCase();
};

// 2022-06-14 PG
// 將 rowData obj 轉換為駝峰
// rows：原始資料庫 obj
// return：陣列包物件 [{}]
exports.rowDataToCamelData = (rows) => {
  let newDatalist = [];
  Object.values(rows).forEach((data) => {
    let newData = {};
    Object.entries(data).forEach(([key, value]) => {
      Object.assign(newData, { [this.setColumnNameLineToCamel(key)]: value });
    });
    newDatalist.push(newData);
  });
  return newDatalist;
};

// 2022-06-14 PG
// 將 key 為駝峰資料轉為底線
// dataList：欲轉換的 dataList obj
// return：陣列包物件 [{}]
exports.camelDataToRowData = (dataList) => {
  let newDatalist = [];
  Object.values(dataList).forEach((data) => {
    let newData = {};
    Object.entries(data).forEach(([key, value]) => {
      Object.assign(newData, { [this.setColumnNameCamelToLine(key)]: value });
    });
    newDatalist.push(newData);
  });
  return newDatalist;
};

// 2022-06-16 PG
// 取得當下時間（ +8 hr 轉換）
exports.getDateTimeNow = () => {
  let now = new Date();
  now = now.setHours(now.getHours() + 8);
  return new Date(now).toISOString().replace(/T/, " ").replace(/\..+/, "");
};

exports.multipleQueryRowDataToSingleObj = (dataList) => {
  let newDatalist = [];
  dataList = JSON.parse(JSON.stringify(dataList));
  dataList.forEach((data) => {
    Object.entries(data[0]).forEach(([key, value]) => {
      newDatalist[key] = value;
    });
  });
  return newDatalist;
};

// 2022-06-28 MJ
// 隨機產生密碼
exports.creatRandomPassword = (size) => {
  var seed = new Array(
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "m",
    "n",
    "p",
    "Q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9"
  );
  // 陣列長度
  seedlength = seed.length;
  var createPassword = [];
  for (i = 0; i < size; i++) {
    var j = Math.floor(Math.random() * seedlength);
    createPassword.push(seed[j]);
  }
  return createPassword.join("");
};
