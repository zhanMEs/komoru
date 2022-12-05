import React, { useState, useEffect } from "react";
import { Liquid } from '@ant-design/plots';

const DemoLiquidCoupon = ({eastData}) => {
  // /* 20220629 YN
  //  優惠卷使用率資料狀態初始化 */
  //  const [couponData, setCouponData] = useState({})
  //  /*20220629 YN
  //  給值取後端資料 */
  //  useEffect(() => {
  //    const newContacts = {
  //      cityId: "4",
  //      dateRange: "2022-06",
  //    };
  //    fetch("http://localhost:5000/dashboard/getDashboardDataListByCondition", {
  //      method: "POST",
  //      headers: {
  //        "Content-Type": "application/json; charset=utf-8",
  //      },
  //      body: JSON.stringify(newContacts),
  //    })
  //      .then((response) => response.json())
  //      .then((data) => {
  //        // console.log(data.dataList);
  //        setCouponData(data.dataList.couponUsage);
  //      })
  //      .catch((e) => {
  //        console.error(e);
  //      });
  //  }, [])
   const config = {
     percent: eastData.couponUsage.couponIsUse/100,
     outline: {
       border: 4,
       distance: 8,
     },
     color:'#ed8c4e',
     wave: {
       length: 128,
     },
   };
   return <Liquid {...config} />;
};

export default React.memo(DemoLiquidCoupon);

