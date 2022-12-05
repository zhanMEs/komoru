import React, { useState, useEffect } from "react";
import { Pie } from '@ant-design/plots';

const DemoPieActivityType = ({northData}) => {
  // /* 20220629 YN
  //  活動類型資料狀態初始化 */
  // const [activityTypeData, setActivityTypeData] = useState({})
  // /*20220629 YN
  // 給值取後端資料 */
  // useEffect(() => {
  //   const newContacts = {
  //     cityId: "1",
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
  //       // console.log(data.dataList.activeType);
  //       setActivityTypeData(data.dataList.activeType);
  //     })
  //     .catch((e) => {
  //       console.error(e);
  //     });
  // }, [])
  console.log(northData)
  const data = [
    {
      type: '藝術家',
      value: northData.activeType.activePackTypeA,
    },
    {
      type: '霸道總裁',
      value: northData.activeType.activePackTypeB,
    },
    {
      type: '內向輔助',
      value: northData.activeType.activePackTypeC,
    },
    {
      type: '能言善道',
      value: northData.activeType.activePackTypeD,
    },
    {
      type: '冒險家',
      value: northData.activeType.activePackTypeE,
    }

  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    color: '#ed8c4e',
    colorField: 'type',
    color: ['#ED8C4E', '#EFA16A', '#F3B486', '#F5C5A7', '#F6CEBF'],
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
  return <Pie {...config} />;
};

export default React.memo(DemoPieActivityType);