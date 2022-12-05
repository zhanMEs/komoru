import React, { useState, useEffect } from "react";
import { Pie } from '@ant-design/plots';

const DemoPieParticipate = ({southData}) => {
  // /* 20220629 YN
  // 參與活動狀態初始化 */
  // const [activeData, setActiveData] = useState({})
  // /*20220629 YN
  // 給值取後端資料 */
  // useEffect(() => {
  //   const newContacts = {
  //     cityId: "3",
  //     dateRange: "2022-06",
  //   };
  //   fetch("http://localhost:5000/dashboard/getDashboardDataListByCondition", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json; charset=utf-8",
  //     },
  //     body: JSON.stringify(newContacts),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // console.log(data.dataList.isActive);
  //       setActiveData(data.dataList.isActive);
  //     })
  //     .catch((e) => {
  //       console.error(e);
  //     });
  // }, [])
  const data = [
    {
      type: '參與活動',
      value: southData.isActive.isActive,
    },
    {
      type: '不參與活動',
      value: southData.isActive.isNoActive,
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
        fontSize: 14,
        textAlign: 'center',
      },
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };
  return <Pie {...config} />;
};

export default React.memo(DemoPieParticipate);