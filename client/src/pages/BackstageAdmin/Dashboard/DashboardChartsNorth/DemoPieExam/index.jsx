import React, { useState, useEffect } from "react";
import { Pie } from '@ant-design/plots';

const DemoPieExam = ({northData}) => {
  // /* 20220629 YN
  //  活動類型資料狀態初始化 */
  //  const [examData, setExamData] = useState({})
  //  /*20220629 YN
  //  給值取後端資料 */
  //  useEffect(() => {
  //    const newContacts = {
  //      cityId: "1",
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
  //        // console.log(data.dataList.IsOrderAfterExamItem);
  //        setExamData(data.dataList.IsOrderAfterExamItem);
  //      })
  //      .catch((e) => {
  //        console.error(e);
  //      });
  //  }, [])
   const data = [
     {
       type: '測驗後參與',
       value: northData.IsOrderAfterExamItem.isOrderAfterExamItem,
     },
     {
       type: '測驗後無參與',
       value: northData.IsOrderAfterExamItem.noOrderAfterExamItem,
     },
   ];
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    color: ['#51a49a', '#ed8c4e'],
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 20,
        textAlign: 'center',
      },
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };
  return <Pie {...config}/>;
};

export default React.memo(DemoPieExam);