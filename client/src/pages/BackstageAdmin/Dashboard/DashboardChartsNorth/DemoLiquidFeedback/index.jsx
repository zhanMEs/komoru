import React ,{ useState, useEffect }from "react";
import { Liquid } from '@ant-design/plots';

const DemoLiquidFeedback = ({northData}) => {
  // /* 20220629 YN
  // 回饋率資料狀態初始化 */
  // const [wirteFeebackData, setWirteFeebackData] = useState({})
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
  //       // console.log(data.dataList.wirteFeeback);
  //       setWirteFeebackData(data.dataList.wirteFeeback);
  //     })
  //     .catch((e) => {
  //       console.error(e);
  //     });
  // }, [])
  const config = {
    percent: northData.wirteFeeback.writeFeeback/100,
    outline: {
      border: 4,
      distance: 8,
    },
    wave: {
      length: 128,
    },
    color: '#ed8c4e',
  };
  return <Liquid {...config} />;
};

export default React.memo(DemoLiquidFeedback);

