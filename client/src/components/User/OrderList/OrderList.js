import React, { useEffect, useState } from "react"
import './OrderList.css'
import { Accordion } from 'react-bootstrap'
import OrderListDaily from "./OrderListDaily/OrderListDaily";




export default function OrderList(props) {

  // 0710 aki - 計算旅程天數
  let end = Date.parse(props.orderEndDate);
  let start = Date.parse(props.orderStartDate);
  let stayNight = (end - start) / 86400000;


  // 0710 aki - 獲取單張訂單的活動包資料
  const [activeData, setActiveData] = useState([]);
  useEffect(() => {
    // setActiveData(props.OrderItem.reverse()); // 調整活動包日期順序：過去->未來
    setActiveData(props.OrderItem); // 調整活動包日期順序：過去->未來
  }, [props])

  const orderItems = activeData.map(item => {
    return (
      <OrderListDaily
        key={item.activePackId}
        {...item}
      />
    )
  })

  // // roomPic 如遇到系統故障時，啟用這隻設定
  // const getRoomPic = (roomId) => {
  //     if (props.roomId === 1) return 1;
  //     if (props.roomId === 2) return 5;
  //     if (props.roomId === 3) return 14;
  //     if (props.roomId === 4) return 11;
  //     if (props.roomId === 5) return 9;
  //     if (props.roomId === 6) return 13;
  //     if (props.roomId === 7) return 12;
  //     if (props.roomId === 8) return 10;
  //   }


  return (
    <>
      {/* 下：有訂房紀錄版 */}
      <Accordion defaultActiveKey="1">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <ul className="acco-header p-2 w-100 d-flex justify-content-between">
              <li className="pt-2 pb-1">{props.orderStartDate}</li>
              <li className="ps-2 pt-2 pb-1 w-75">{props.cityName}　{props.hotelTitle} / {props.roomType}</li>
              <li className="pt-2 pb-1">{props.memberName}</li>
            </ul>
          </Accordion.Header>
          <Accordion.Body className="p-5 text-start lh-lg orderDetails fw-normal">
            <h3>訂單資料確認</h3>
            <p className="text-secondary mb-5">一條龍記錄您的訂單及活動行程，並即時更新在會員中心讓您隨時查看。</p>
            <div className="orderDetails--card row mb-2">
              <div className="card--pic col-5">
                <img className="img-fluid rounded"
                  // src={`http://localhost:5000/images/room/room-${ getRoomPic(props.roomId) }.jpeg`} 
                  src={`http://localhost:5000/${props.roomImgPath}`}
                  alt="room-pic" />

              </div>
              <div className="card--list col-7">
                <ul>
                  <li className="card--list--item fs-4 row">
                    <span className="col-3 ">入住日期</span>
                    <span className="fw-light col-8">{props.orderStartDate}</span>
                  </li>
                  <li className="card--list--item fs-4 row">
                    <span className="col-3 ">日住天數</span>
                    <span className="fw-light col-8">
                      {stayNight} 晚
                    </span>
                  </li>
                  <li className="card--list--item fs-4 row">
                    <span className="col-3 ">飯店/房型</span>
                    <span className="fw-light col-8">{props.hotelTitle} / {props.roomType}</span>
                  </li>
                  {/* <li className="card--list--item fs-4 row">
                    <span className="col-3 ">優惠編號</span>
                    <span className="fw-light col-8">{props.couponItemId? props.couponItemId:"無" }</span>
                  </li> */}
                  <li className="card--list--item fs-4 row">
                    <span className="col-3 ">飯店地址</span>
                    <span className="fw-light col-8">{props.hotelAddr}</span>
                  </li>
                  <li className="card--list--item fs-4 row">
                    <span className="col-3 ">聯絡電話</span>
                    <span className="fw-light col-8">{props.hotelTel}</span>
                  </li>
                  <li className="card--list--item fs-4 row">
                    <span className="col-3 ">住宿金額</span>
                    <span className="fw-light col-8">＄{props.orderTotal}元</span>
                  </li>
                </ul>
              </div>
              {props.OrderItem[0].isActive === '0' &&
                <h4 className="text-center pt-5 text-secondary">加購活動日 行程</h4>
              }

              {/* 單張訂單的活動包內容 */}
              {orderItems}
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

    </>
  )

}