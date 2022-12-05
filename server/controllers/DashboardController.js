const configController = require("./_ConfigController");
const dashboardModel = require("../models/DashboardModel");

// 2022-06-20 PG
// 取得報表資料 By 指定條件，目前已有條件：縣市、日期區間（年-月 2022-06）
exports.getDashboardDataListByCondition = async (req, res, next) => {
  let data = req.body;
  let checkDataResult = checkData(data, ["cityId", "dateRange"]);

  // 判斷是否有空值、沒有傳需要的資料
  if (checkDataResult.errCheck) {
    // 取得單項報表百分比資料
    let result = {
      couponUsage: await getCouponUsageDataByCondition(data, res),
      activeType: await getActiveTypeDataByCondition(data, res),
      IsOrderAfterExamItem: await getIsOrderAfterExamItemDataByCondition(
        data,
        res
      ),
      revenue: await getRevenueDataByCondition(data, res),
      isActive: await getIsActiveDataByCondition(data, res),
      wirteFeeback: await getWriteFeebackDataByCondition(data, res),
      occupancy: await getOccupancyByCondition(data, res)
    };
    configController.sendJsonMsg(res, true, "", result);
  } else {
    configController.sendJsonMsg(res, false, checkDataResult.errMsg, []);
  }
};

// 2022-06-20 PG
// 取得活動類型 By 指定條件
// data：條件資料
// res：return err 用
// return：{}
const getActiveTypeDataByCondition = async (data, res) => {
  let percentageDataList;
  
  // 加入活動包 Enum Value
  data.activePackType = configController.getEnumValue(
    "ActivePack",
    "activePackType"
  ).valueObj;
  
  await dashboardModel
    .getActiveTypeDataByCondition(data)
    .then((result) => {
      // 百分比計算
      percentageDataList = calculatePercentage(result, "activePackTypeAll");
    })
    .catch((err) => {
      // 目前不確定這邊要怎改
      console.log(err);
      res.status(500).json({ message: "Server error" });
    });
  return percentageDataList;
};

// 2022-06-20 PG
// 取得 coupon 卷是否使用 By 指定條件
// data：條件資料
// res：return err 用
const getCouponUsageDataByCondition = async (data, res) => {
  let percentageDataList;
  
  // 加入 coupon 卷使用狀態 Enum Value
  data.couponisUseStatus = configController.getEnumValue(
    "CouponItem",
    "couponItemIsUse"
  ).valueObj;
  data.couponId = "1";
  
  await dashboardModel
    .getCouponUsageDataByCondition(data)
    .then((result) => {
      // 百分比計算
      percentageDataList = calculatePercentage(result, "couponAll");
    })
    .catch((err) => {
      // 目前不確定這邊要怎改
      console.log(err);
      res.status(500).json({ message: "Server error" });
    });
  return percentageDataList;
};

// 2022-06-21 PG
// 取得有做心理測驗但沒有下訂單的狀況 By 指定條件
// data：條件資料
// res：return err 用
// return：{}
const getIsOrderAfterExamItemDataByCondition = async (data, res) => {
  let percentageDataList;

  await dashboardModel
    .getIsOrderAfterExamItemDataByCondition(data)
    .then((result) => {
      // 百分比計算
      percentageDataList = calculatePercentage(result, "examItemAll");
    })
    .catch((err) => {
      // 目前不確定這邊要怎改
      console.log(err);
      res.status(500).json({ message: "Server error" });
    });
  return percentageDataList;
};

// 2022-06-21 PG
// 取得營業額 By 指定條件
// data：條件資料
// res：return err 用
const getRevenueDataByCondition = async (data, res) => {
  let revenueDataList = {};
  
  // 加入 coupon 卷使用狀態 Enum Value
  data.roomType = configController.getEnumValue("Room", "roomType").valueObj;
  
  await dashboardModel
    .getRevenueDataByCondition(data)
    .then((result) => {
      revenueDataList = Object.assign({}, result);
    })
    .catch((err) => {
      // 目前不確定這邊要怎改
      console.log(err);
      res.status(500).json({ message: "Server error" });
    });
  return revenueDataList;
};

// 2022-06-21 PG
// 取得活動參加率 By 指定條件
// data：條件資料
// res：return err 用
// return：{}
const getIsActiveDataByCondition = async (data, res) => {
  let percentageDataList;

  // 加入是否參加活動 Enum Value
  data.isActive = configController.getEnumValue(
    "OrderItem",
    "isActive"
  ).valueObj;
  await dashboardModel
    .getIsActiveDataByCondition(data)
    .then((result) => {
      // 百分比計算
      percentageDataList = calculatePercentage(result, "isActiveAll");
    })
    .catch((err) => {
      // 目前不確定這邊要怎改
      console.log(err);
      res.status(500).json({ message: "Server error" });
    });
  return percentageDataList;
};

// 2022-06-21 PG
// 取得回饋填寫率 By 指定條件
// data：條件資料
// res：return err 用
// return：{}
const getWriteFeebackDataByCondition = async (data, res) => {
  let percentageDataList;

  await dashboardModel
    .getWriteFeebackDataByCondition(data)
    .then((result) => {
      // 百分比計算
      percentageDataList = calculatePercentage(result, "writeFeebackAll");
    })
    .catch((err) => {
      // 目前不確定這邊要怎改
      console.log(err);
      res.status(500).json({ message: "Server error" });
    });
  return percentageDataList;
};

// 2022-06-21 PG
// 取得入住率 By 指定條件
// data：條件資料
// res：return err 用
const getOccupancyByCondition = async (data, res) => {
  let percentageDataList;

  // 加入性別 Enum Value
  data.sex = configController.getEnumValue("Member", "sex").valueObj;

  await dashboardModel
    .getOccupancyByCondition(data)
    .then((result) => {
      percentageDataList = calculatePercentage(result, "", 7, 2);
    })
    .catch((err) => {
      // 目前不確定這邊要怎改
      console.log(err);
      res.status(500).json({ message: "Server error" });
    });
  return percentageDataList;
};

// 2022-06-19 PG
// 檢查資料
// dataList：要檢查的資料（前端傳來的）
// dataColumns：要檢查的項目
// return json
const checkData = (dataList, dataColumns) => {
  let errMsg = "";
  let errCheck = true;
  dataColumns.forEach((value) => {
    if (
      typeof dataList[value] === "undefined" ||
      !dataList[value] ||
      typeof dataList[value] === ""
    ) {
      errMsg += value + " 不可為空。";
      errCheck = false;
    }
  });
  return {
    errMsg: errMsg,
    errCheck: errCheck,
  };
};

// 2022-06-20 PG
// 計算百分比
// dataList：需計算的資料
// denominatorKey：分母 key 名
// numOfEveryGroup：資料幾筆一組
// numOfGroupData：資料有幾組（不包括分母）
// return：{}
const calculatePercentage = (dataList, denominatorKey, numOfEveryGroup = 0, numOfGroupData = 0) => {
  let newDataList = {};

  // 全部共用同一個分母
  // dataList 資料結構 EX：
  // couponUnUse: 3, couponIsUse: 4, couponAll: 7
  if (numOfEveryGroup == 0) {
    // 依據 key name 指定分母數值
    let denominatorNum = dataList[denominatorKey];
    Object.entries(dataList).forEach(([key, value]) => {
      // 過濾掉迴圈中的分母項目
      if (key !== denominatorKey) { 
        // 如果總數為 0 直接設為 0
        newDataList[key] =
          denominatorNum == 0 ? 0 : Math.round((value / denominatorNum) * 100);
      }
    });
  } else {
    // 無法全部共用同一個分母
    // dataList 資料結構 EX：
    // occupancyFmale1: 1, occupancyFmale2: 0, occupancyFmale3:0 , ( 0, 1, 2) -> 第一組分子資料
    // occupancyMale1: 1, occupancyMale2: 0, occupancyMale3: 0, ( 3, 4, 5 ) -> 第二組分子資料
    // occupancyAll1: 2, occupancyAll2: 0, occupancyAll3: 0 ( 6, 7, 8 ) -> 分母資料

    // 依據一組多少筆為循環去跑迴圈
    // EX：一組有 3 筆
    for (i = 0; i < numOfEveryGroup; i++) {
      // 取得分母值：計算從第幾個資料結束後，開始為其對應分母 ( 一組中第幾個資料 + 一組幾個 * 有幾組 )
      // EX：0-5 為分子值，6 開始為其對應分母的值
      // EX：0+3*2 -> 一組中第 0 個資料對應的分母
      // EX：1+3*2 -> 一組中第 1 個資料對應的分母
      let denominatorNum =
        Object.values(dataList)[i + numOfEveryGroup * numOfGroupData];
      // 依據組數計算各自的值
      for (j = 0; j < numOfGroupData; j++) {
        // 第幾組的第幾個
        // EX：第一組的第 0 個 ( 0+0*3 )，第二組的第 0 個 ( 0+1*3 )
        // EX：第一組的第 1 個 ( 1+0*3 )，第二組的第 1 個 ( 1+1*3 )
        newDataList[Object.keys(dataList)[i + j * numOfEveryGroup]] =
          denominatorNum == 0 // 如果總數為 0 直接設為 0
            ? 0
            : Math.round(
                (Object.values(dataList)[i + j * numOfEveryGroup] /
                  denominatorNum) *
                  100
              );
      }
    }
  }
  return newDataList;
};
