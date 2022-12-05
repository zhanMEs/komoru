import React ,{ useState, useEffect } from "react";
import { Column } from "@ant-design/plots";

const DemoColumnOccupancyRate = ({southData}) => {
  // /* 20220629 YN
  // 入住率資料狀態初始化 */
  // const [occupancyData, setOccupancyData] = useState({})
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
  //       console.log(data.dataList.occupancy);
  //       setOccupancyData(data.dataList.occupancy);
  //     })
  //     .catch((e) => {
  //       console.error(e);
  //     });
  // }, [])
  const data = [
    {
      name: "男",
      星期: "星期一",
      入住率: southData.occupancy.occupancyMale1,
    },
    {
      name: "男",
      星期: "星期二",
      入住率: southData.occupancy.occupancyMale2,
    },
    {
      name: "男",
      星期: "星期三",
      入住率: southData.occupancy.occupancyMale3,
    },
    {
      name: "男",
      星期: "星期四",
      入住率:southData.occupancy.occupancyMale4,
    },
    {
      name: "男",
      星期: "星期五",
      入住率:southData.occupancy.occupancyMale5,
    },
    {
      name: "男",
      星期: "星期六",
      入住率: southData.occupancy.occupancyMale6,
    },
    {
      name: "男",
      星期: "星期日",
      入住率: southData.occupancy.occupancyMale7,
    },

    {
      name: "女",
      星期: "星期一",
      入住率: southData.occupancy.occupancyFmale1,
    },
    {
      name: "女",
      星期: "星期二",
      入住率: southData.occupancy.occupancyFmale2,
    },
    {
      name: "女",
      星期: "星期三",
      入住率: southData.occupancy.occupancyFmale3,
    },
    {
      name: "女",
      星期: "星期四",
      入住率: southData.occupancy.occupancyFmale4,
    },
    {
      name: "女",
      星期: "星期五",
      入住率: southData.occupancy.occupancyFmale5,
    },
    {
      name: "女",
      星期: "星期六",
      入住率: southData.occupancy.occupancyFmale6,
    },
    {
      name: "女",
      星期: "星期日",
      入住率: southData.occupancy.occupancyFmale7,
    },

  ];

  const config = {
    data,
    isGroup: true,
    xField: "星期",
    yField: "入住率",
    seriesField: "name",

    /** 设置颜色 */
    color: ['#51a49a', '#ed8c4e'],
    /** 设置间距 */
    // marginRatio: 0.1,
    label: {
      // 可手动配置 label 数据标签位置
      position: "middle",
      // 'top', 'middle', 'bottom'
      // 可配置附加的布局方法
      layout: [
        // 柱形图数据标签位置自动调整
        {
          type: "interval-adjust-position",
        }, // 数据标签防遮挡
        {
          type: "interval-hide-overlap",
        }, // 数据标签文颜色自动调整
        {
          type: "adjust-color",
        },
      ],
    },
  };
  return <Column {...config} />;
};

export default React.memo(DemoColumnOccupancyRate);
