import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/plots';

const DemoLineRoomTurnover = ({southData}) => {
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   asyncFetch();
  // }, []);

  // const asyncFetch = () => {
  //   fetch('https://gw.alipayobjects.com/os/bmw-prod/55424a73-7cb8-4f79-b60d-3ab627ac5698.json')
  //     .then((response) => response.json())
  //     .then((json) => setData(json))
  //     .catch((error) => {
  //       console.log('fetch data failed', error);
  //     });
  // };
  const data = [
    {
    "month": "2022-01",
    "value": southData.revenue.single1,
    "category": "私人套房"
    },
    {
    "month": "2022-01",
    "value": southData.revenue.backpacker1,
    "category": "背包客房"
    },
    {
    "month": "2022-02",
    "value": southData.revenue.single2,
    "category": "私人套房"
    },
    {
    "month": "2022-02",
    "value": southData.revenue.backpacker2,
    "category": "背包客房"
    },
    {
    "month": "2022-03",
    "value": southData.revenue.single3,
    "category": "私人套房"
    },
    {
    "month": "2022-03",
    "value": southData.revenue.backpacker3,
    "category": "背包客房"
    },
    {
    "month": "2022-04",
    "value": southData.revenue.single4,
    "category": "私人套房"
    },
    {
    "month": "2022-04",
    "value": southData.revenue.backpacker4,
    "category": "背包客房"
    },
    {
    "month": "2022-05",
    "value": southData.revenue.single5,
    "category": "私人套房"
    },
    {
    "month": "2022-05",
    "value": southData.revenue.backpacker5,
    "category": "背包客房"
    },
    {
    "month": "2022-06",
    "value": southData.revenue.single6,
    "category": "私人套房"
    },
    {
    "month": "2022-06",
    "value": southData.revenue.backpacker6,
    "category": "背包客房"
    },
    {
    "month": "2022-07",
    "value": southData.revenue.single7,
    "category": "私人套房"
    },
    {
    "month": "2022-07",
    "value": southData.revenue.backpacker7,
    "category": "背包客房"
    },
    {
    "month": "2022-08",
    "value": southData.revenue.single8,
    "category": "私人套房"
    },
    {
    "month": "2022-08",
    "value": southData.revenue.backpacker8,
    "category": "背包客房"
    },
    {
    "month": "2022-09",
    "value": southData.revenue.single9,
    "category": "私人套房"
    },
    {
    "month": "2022-09",
    "value": southData.revenue.backpacker9,
    "category": "背包客房"
    },
    {
    "month": "2022-10",
    "value": southData.revenue.single10,
    "category": "私人套房"
    },
    {
    "month": "2022-10",
    "value": southData.revenue.backpacker10,
    "category": "背包客房"
    },
    {
    "month": "2022-11",
    "value": southData.revenue.single11,
    "category": "私人套房"
    },
    {
    "month": "2022-11",
    "value": southData.revenue.backpacker11,
    "category": "背包客房"
    },
    {
    "month": "2022-12",
    "value": southData.revenue.single12,
    "category": "私人套房"
    },
    {
    "month": "2022-12",
    "value": southData.revenue.backpacker12,
    "category": "背包客房"
    }
    ]

  const config = {
    data,
    xField: 'month',
    yField: 'value',
    seriesField: 'category',
    color: ['#51a49a', '#ed8c4e'],
    xAxis: {
      type: 'time',
    },
    yAxis: {
      label: {
        // 数值格式化为千分位
        formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
    },
  };

  return <Line {...config} />;
};

export default React.memo(DemoLineRoomTurnover);
