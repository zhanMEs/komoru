import React from 'react';
import { Pie } from '@ant-design/plots';

const DemoPieExam = ({middleData}) => {
  const data = [
    {
      type: '測驗後參與',
      value: middleData.IsOrderAfterExamItem.isOrderAfterExamItem,
    },
    {
      type: '測驗後無參與',
      value: middleData.IsOrderAfterExamItem.noOrderAfterExamItem,
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

export default React.memo(DemoPieExam);