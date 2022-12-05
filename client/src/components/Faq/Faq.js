import React, { Component } from 'react';
import Faq from 'react-faq-component';

const data = {
//   title: "KOMORU 常見問題 ",

  rows: [
    {
      title: "Ａ：KOMORU的取消政策如何規定？",
      content: "抵達前 3 天：取決於您預訂的計劃及飯店，請查看該飯店的網站或聯繫我們了解詳情。"
      
    },
    {
      title: "Ａ：KOMORU最多可以預訂的天數有上限嗎？",
      content: "有的，為維護體驗品質，每次預定天數上限為3日。"
    },
    {
      title: "Ａ：透過KOMORU預定是否包含膳食？",
      content: "入住期間每天早上都有提供免費早點，可於早上 8:30 到 11:00 至我們的餐廳享用。"
    },
    {
      title: "Ａ：最晚時間可以幾點退房呢？",
      content: "房務檢查時間是在中午 12:00，請在這個時間以前完成退房，並記得攜帶您隨身的個人物品及行李。"
    },
    {
        title: "Ａ：請問客製活動內容指的是什麼呢？",
        content: "客製活動內容針對適性測驗做變化，到指定的地點完成任務，一切費用皆包含無需再額外收費。"
      }],
    
}

export default class App extends Component {
  render() {
    return (
      <div>
        <Faq data={data}/>
      </div>
    )
  }
}