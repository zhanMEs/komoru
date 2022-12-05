// 2022-06-15 PG
// 回傳 json 格式
// res：resquest
// status：給前端判斷的狀態
// msg：錯誤訊息
// data：回傳的資料
exports.sendJsonMsg = (res, status, msg, data) => {
  res.setHeader("Content-Type", "application/json");
  res.end(
    JSON.stringify({
      status: status,
      errMsg: msg,
      dataList: data,
    })
  );
};

// 2022-06-18 PG
// 將 enum 數值轉換為文字
// tableName：資料庫表
// column：欄位名稱
// value：要轉換的值
// return {}
exports.enumValueToString = (tableName, column, value) => {
  let errCheck = true;
  let errMsg = "";
  let transferString = "";

  switch (tableName) {
    case "Order":
      switch (column) {
        case "orderStatus":
          switch (value) {
            case "0":
              transferString = "未入住";
              break;
            case "1":
              transferString = "已入住";
              break;
            case "2":
              transferString = "已退房";
              break;
            default:
              errCheck = false;
              errMsg = "狀態值不存在";
              break;
          }
          break;
        case "payment":
          switch (value) {
            case "0":
              transferString = "現金";
              break;
            case "1":
              transferString = "信用卡";
              break;
            default:
              errCheck = false;
              errMsg = "狀態值不存在";
              break;
          }
          break;
        default:
          errCheck = false;
          errMsg = "欄位不存在";
          break;
      }
      break;
    case "Room":
      switch (column) {
        case "roomType":
          switch (value) {
            case "0":
              transferString = "背包客";
              break;
            case "1":
              transferString = "單人房";
              break;
            default:
              errCheck = false;
              errMsg = "狀態值不存在";
              break;
          }
          break;
        default:
          errCheck = false;
          errMsg = "欄位不存在";
          break;
      }
      break;
    case "ActivePack":
      switch (column) {
        case "activePackType":
          switch (value) {
            case "0":
              transferString = "藝術家";
              break;
            case "1":
              transferString = "霸道總裁";
              break;
            case "2":
              transferString = "內向輔助";
              break;
            case "3":
              transferString = "能言善道";
              break;
            case "4":
              transferString = "冒險家";
              break;
            case null:
              transferString = "無參與活動";
              break;
            default:
              errCheck = false;
              errMsg = "狀態值不存在";
              break;
          }
          break;
        default:
          errCheck = false;
          errMsg = "欄位不存在";
          break;
      }
      break;
    case "Member":
      switch (column) {
        case "gender":
          switch (value) {
            case "0":
              transferString = "女";
              break;
            case "1":
              transferString = "男";
              break;
            case "2":
              transferString = "無";
              break;
            default:
              errCheck = false;
              errMsg = "狀態值不存在";
              break;
          }
          break;
        default:
          errCheck = false;
          errMsg = "欄位不存在";
          break;
      }
      break;
    default:
      errCheck = false;
      errMsg = "資料表不存在";
      break;
  }
  return {
    errCheck: errCheck,
    errMsg: errMsg,
    transferString: transferString,
  };
};

// 2022-06-20 PG
// 取得 enum 所對應的 value
// tableName：資料庫表
// column：欄位名稱
// return {}
exports.getEnumValue = (tableName, column) => {
  let errCheck = true;
  let errMsg = "";
  let valueObj;

  switch (tableName) {
    case "ActivePack":
      switch (column) {
        case "activePackType":
          valueObj = {
            activePackTypeA: "0",
            activePackTypeB: "1",
            activePackTypeC: "2",
            activePackTypeD: "3",
            activePackTypeE: "4",
          };
          break;
        default:
          errCheck = false;
          errMsg = "欄位不存在";
          break;
      }
      break;
    case "CouponItem":
      switch (column) {
        case "couponItemIsUse":
          valueObj = {
            couponUnUse: "0",
            couponIsUse: "1",
          };
          break;
        default:
          errCheck = false;
          errMsg = "欄位不存在";
          break;
      }
      break;
    case "Room":
      switch (column) {
        case "roomType":
          valueObj = {
            roomTypeBackpacker: "0",
            roomTypeSingle: "1",
          };
          break;
        default:
          errCheck = false;
          errMsg = "欄位不存在";
          break;
      }
      break;
    case "OrderItem":
      switch (column) {
        case "isActive":
          valueObj = {
            isActive: "0",
            isNoActive: "1",
          };
          break;
        default:
          errCheck = false;
          errMsg = "欄位不存在";
          break;
      }
      break;
    case "Member":
      switch (column) {
        case "sex":
          valueObj = {
            sexFmale: "0",
            sexMale: "1",
            sexNull: "2",
          };
          break;
        default:
          errCheck = false;
          errMsg = "欄位不存在";
          break;
      }
    default:
      errCheck = false;
      errMsg = "資料表不存在";
      break;
  }
  return {
    errCheck: errCheck,
    errMsg: errMsg,
    valueObj: valueObj,
  };
};
