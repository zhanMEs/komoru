import React, { useContext, useEffect, useState, useRef } from "react";
import "./BookingOrderPage.css";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { BookContext } from "../../Helper/Context";
import ActivityBag from "./ActivityBag";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import { AiOutlineRight } from "react-icons/ai";
import { IoMdAlert } from "react-icons/io";
import BookingLoading from "../../components/BookingLoading/BookingLoading";

function OrderWithNoActivity() {
  const [memberloading, setMemberLoading] = useState(false);
  const [activityPackloading, setActivityPackloading] = useState(false);
  //   // const [checkoutLoading, setCheckoutLoading] = useState(false);
  //   //獲取活動包activityPack
  //   const location = useLocation();
  //   const [activityPack, setActivityPack] = useState(location.state.activityPack);

  //   //活動包內容初始化
  //   const [activePackD1, setActivePackD1] = useState({});
  //   const [activePackD2, setActivePackD2] = useState({});
  //   const [activePackD3, setActivePackD3] = useState({});

  //下一步點擊時狀態紀錄
  const [nextStep, setNextStep] = useState("");

  //付款方式初始化
  const [payMethod, setPayMethod] = useState("");

  //滾動到指定元素
  const testRef = useRef(null);
  const scrollToElement = () => testRef.current.scrollIntoView();

  const {
    date,
    dayState,
    cityState,
    cityIdValue,
    roomState,
    couponState,
    couponData,
    activityState,
    activity1Data,
    activity2Data,
    activity3Data,
    countActivity,
    sumActivity,
    setSumActivity,
  } = useContext(BookContext);

  //   const [getAllActivePackData, setGetAllActivePackData] = useState();
  //   //activityState(要或不要參加<值:0或1>)
  //   //countActivity(活動天數<值:0或1或2或3>)
  //   //cityIdValue(城市的ID)
  //   //activityPack(活動包總類，在心理測驗完後獲取)
  //   //獲取活動包

  //   useEffect(() => {
  //     console.log(
  //       activityState,
  //       JSON.stringify(countActivity),
  //       cityIdValue,
  //       activityPack
  //     );
  //     axios({
  //       method: "post",
  //       url: "http://localhost:5000/activePack/getActivePackData",
  //       data: {
  //         isActive: activityState,
  //         joinTotal: countActivity,
  //         cityId: cityIdValue,
  //         activePackType: activityPack,
  //       },
  //     })
  //       .then((res) => {
  //         console.log(res.data.dataList);
  //         setGetAllActivePackData(res.data.dataList);

  //         // console.log(res.data.dataList);
  //         if (activity1Data === "1") {
  //           setActivePackD1(res.data.dataList.D1[0]);
  //         }
  //         if (activity2Data === "3") {
  //           setActivePackD2(res.data.dataList.D2[0]);
  //         }
  //         if (activity3Data === "5") {
  //           setActivePackD3(res.data.dataList.D3[0]);
  //         }
  //         if (activity1Data === "2" && activity2Data === "3") {
  //           setActivePackD2(res.data.dataList.D1[0]);
  //         }
  //         if (
  //           activity1Data === "2" &&
  //           activity2Data === "4" &&
  //           activity3Data === "5"
  //         ) {
  //           setActivePackD3(res.data.dataList.D1[0]);
  //         }
  //       })
  //       .then(() => {
  //         setActivityPackloading(true);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //     // }
  //   }, []);
  //   console.log(activePackD1);
  //   const PackId = [];

  //   if (activity1Data === "1") {
  //     PackId.push(activePackD1.activePackId);
  //   }
  //   if (activity1Data === "2") {
  //     PackId.push(null);
  //   }
  //   if (activity2Data === "3") {
  //     PackId.push(activePackD2.activePackId);
  //   }
  //   if (activity2Data === "4") {
  //     PackId.push(null);
  //   }
  //   if (activity3Data === "5") {
  //     PackId.push(activePackD3.activePackId);
  //   }
  //   if (activity3Data === "6") {
  //     PackId.push(null);
  //   }

  //   console.log(PackId);

  //   //顯示第一天活動包
  //   const showAvtivity1Bag = () => {
  //     if (activity1Data === "1") {
  //       return (
  //         <>
  //           <ActivityBag
  //             date={fst}
  //             first={<span>Ckeck In</span>}
  //             second={<p>前往預定飯店並參觀飯店空間</p>}
  //             activePackItemTitle={activePackD1.activePackItemTitle}
  //             activePackItemContent={activePackD1.activePackItemContent}
  //             activePackItemContent2={activePackD1.activePackItemContent2}
  //             activePackItemContent3={activePackD1.activePackItemContent3}
  //           />
  //         </>
  //       );
  //     }
  //   };

  //   //顯示第二天活動包
  //   const showAvtivity2Bag = () => {
  //     if (activity2Data === "3") {
  //       return (
  //         <>
  //           <ActivityBag
  //             date={sec}
  //             first={<span>美好的早晨</span>}
  //             second={<p>找個屬於你的小角落享用美味早餐</p>}
  //             activePackItemTitle={activePackD2.activePackItemTitle}
  //             activePackItemContent={activePackD2.activePackItemContent}
  //             activePackItemContent2={activePackD2.activePackItemContent2}
  //             activePackItemContent3={activePackD2.activePackItemContent3}
  //           />
  //         </>
  //       );
  //     }
  //   };

  //   //顯示第三天活動包
  //   const showAvtivity3Bag = () => {
  //     if (activity3Data === "5") {
  //       return (
  //         <>
  //           <ActivityBag
  //             date={trd}
  //             first={<span>美好的早晨</span>}
  //             second={<p>找個屬於你的小角落享用美味早餐</p>}
  //             activePackItemTitle={activePackD3.activePackItemTitle}
  //             activePackItemContent={activePackD3.activePackItemContent}
  //             activePackItemContent2={activePackD3.activePackItemContent2}
  //             activePackItemContent3={activePackD3.activePackItemContent3}
  //           />
  //         </>
  //       );
  //     }
  //   };

  const [memberId, setMemberId] = useState("");
  const [memberNickName, setMemberNickName] = useState("");
  const [memberName, setMemberName] = useState("");
  const [memberMail, setMemberMail] = useState("");
  const [memberPhone, setMemberPhone] = useState("");
  const [memberGender, setMemberGender] = useState("");

  // const [getActivePack, setGetActivityPack] = useState("");

  useEffect(() => {
    axios({
      method: "post",
      url: "http://localhost:5000/member/isLogin",
      data: {
        token: localStorage.token,
      },
    })
      .then((res) => {
        //有登入的話，回傳「會員資訊」在res.data[0] ｜ 沒登入則回傳message
        let userData = res.data[0];
        console.log(userData);
        setMemberId(userData.memberId);
        setMemberNickName(userData.memberNickName);
        setMemberName(userData.memberName);
        setMemberMail(userData.memberMail);
        setMemberPhone(userData.memberPhone);
        setMemberGender(userData.memberGender);
      })
      .then(() => {
        setMemberLoading(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const gender = () => {
    if (memberGender === "0") {
      return <>女</>;
    } else if (memberGender === "1") {
      return <>男</>;
    }
  };

  //   //日期計算
  //   let nd = new Date(date);
  //   let y = nd.getFullYear();
  //   let m = nd.getMonth() + 1;
  //   let d = nd.getDate();
  //   let fst = `${y.toString()}/${m.toString().padStart(2, "0")}/${d
  //     .toString()
  //     .padStart(2, "0")}`;
  //   let sec = `${y.toString()}/${m.toString().padStart(2, "0")}/${(d + 1)
  //     .toString()
  //     .padStart(2, "0")}`;
  //   let trd = `${y.toString()}/${m.toString().padStart(2, "0")}/${(d + 2)
  //     .toString()
  //     .padStart(2, "0")}`;

  //2022-06-23 ZH
  //根據不同roomState顯示不同房間名稱
  const handleroomStateData = () => {
    if (roomState === "2") {
      return <p>夾腳拖的家/私人套房</p>;
    } else if (roomState === "1") {
      return <p>夾腳拖的家/背包客房</p>;
    } else if (roomState === "4") {
      return <p>Star Hostel/私人套房</p>;
    } else if (roomState === "3") {
      return <p>Star Hostel/背包客房</p>;
    } else if (roomState === "6") {
      return <p>快活慢行/私人套房</p>;
    } else if (roomState === "5") {
      return <p>快活慢行/背包客房</p>;
    } else if (roomState === "8") {
      return <p>山林山鄰/私人套房</p>;
    } else if (roomState === "7") {
      return <p>山林山鄰/背包客房</p>;
    }
  };

  //根據不同roomState顯示不同房間照片
  const handleImgData = () => {
    if (roomState === "1") {
      return <img src="http://localhost:5000/images/room/room-1.jpeg" alt="" />;
    } else if (roomState === "2") {
      return (
        <img src="http://localhost:5000/images/room/room-2.jpeg" alt="" />
      );
    } else if (roomState === "3") {
      return <img src="http://localhost:5000/images/room/room-3.jpeg" alt="" />;
    } else if (roomState === "4") {
      return <img src="http://localhost:5000/images/room/room-4.jpeg" alt="" />;
    } else if (roomState === "5") {
      return (
        <img src="http://localhost:5000/images/room/room-5.jpeg" alt="" />
      );
    } else if (roomState === "6") {
      return (
        <img src="http://localhost:5000/images/room/room-6.jpeg" alt="" />
      );
    } else if (roomState === "7") {
      return (
        <img src="http://localhost:5000/images/room/room-7.jpeg" alt="" />
      );
    } else if (roomState === "8") {
      return (
        <img src="http://localhost:5000/images/room/room-8.jpeg" alt="" />
      );
    }
  };

  //顯示優惠碼名稱
  const handleCouponStateData = () => {
    if (couponState != "") {
      return <p>{couponData[0].couponTitle}</p>;
    } else {
      return <p>無</p>;
    }
  };

  //顯示優惠折扣欄
  const [showCoupon, setShowCoupon] = useState(false);
  useEffect(() => {
    if (couponState != "") {
      setShowCoupon(true);
    }
  }, [couponState]);

  // 顯示是否參與活動;
  const handleActivityStateData = () => {
    if (activityState === "0") {
      return <p>參加</p>;
    } else if (activityState === "1") {
      return <p>不參加</p>;
    }
  };

  //   //判斷活動包是否出現在畫面上
  //   const [activityBag1Visible, setactivityBag1Visible] = useState(false);
  //   const [activityBag2Visible, setactivityBag2Visible] = useState(false);
  //   const [activityBag3Visible, setactivityBag3Visible] = useState(false);
  //   useEffect(() => {
  //     activity1Data === "1"
  //       ? setactivityBag1Visible(true)
  //       : setactivityBag1Visible(false);
  //     activity2Data === "3"
  //       ? setactivityBag2Visible(true)
  //       : setactivityBag2Visible(false);
  //     activity3Data === "5"
  //       ? setactivityBag3Visible(true)
  //       : setactivityBag3Visible(false);
  //   }, [activity1Data, activity2Data, activity3Data]);

  //計算房間金額
  const [roomSum, setRoomSum] = useState(Number(0));
  useEffect(() => {
    if (
      roomState === "5" ||
      roomState === "1" ||
      roomState === "3" ||
      roomState === "4"
    ) {
      setRoomSum(dayState * 1000);
    } else if (
      roomState === "2" ||
      roomState === "6" ||
      roomState === "7" ||
      roomState === "8"
    ) {
      setRoomSum(dayState * 700);
    }
  }, [roomState]);

  //計算總金額
  useEffect(() => {
    if (couponState !== "") {
      setSumActivity(
        countActivity * 700 + roomSum - Number(couponData[0].discount)
      );
    } else {
      setSumActivity(countActivity * 700 + roomSum);
    }
  });
  // {
  //   console.log(couponData[0].discount);
  // }

  const navigate = useNavigate();
  //傳訂單明細給後端
  const CheckoutOrderHandler = (e) => {
    setNextStep(e.type);
    // e.preventDefault();

    if (payMethod === "") {
      alert("未輸入付款方式!");
      scrollToElement();
    } else {
      const orderDetails = {
        memberId: memberId,
        orderStartDate: date,
        expDays: dayState,
        orderStatus: "0",
        roomId: roomState,
        couponItemId: couponState,
        orderTotal: sumActivity,
        activePackId: null,
        isActive: activityState,
        joinTotal: countActivity,
        orderItemPrice: 1000,
      };
      console.log(orderDetails);
      fetch("http://localhost:5000/order/getAndSaveOrderData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(orderDetails),
      })
        .then((response) => console.log(response.json()))
        // .then(() => {
        //   setCheckoutLoading(true);
        // })
        .catch(console.error);

      // {
      //   checkoutLoading ? (
      navigate("/checkoutSucceeded");
      //   ) : (
      //     <div
      //       style={{
      //         marginLeft: 600,
      //         marginBottpm: 0,
      //         width: "100%",
      //         height: "100%",
      //       }}
      //     >
      //       123
      //       <BookingLoading />
      //     </div>
      //   );
      // }
    }
  };

  return (
    <>
      <Navbar />
      <div className="bookingBreadcrumbs">
        <Link to="/">首頁</Link>
        <span>
          <AiOutlineRight />
        </span>
        <Link to="/bookingHomePage">即刻預定</Link>
        <span>
          <AiOutlineRight />
        </span>
        <p>訂單確認</p>
      </div>
      <div className="orderContainer">
        <div className="memberCheckout">
          {memberloading ? (
            <>
              <div className="memberCheckoutHeader" ref={testRef}>
                <h1>訂購者資料確認</h1>
                <p>
                  確認資料無誤後選擇付款方式，簡單快速的下訂流程讓你立即體驗旅程！
                </p>
              </div>
              <table className="memberCheckoutTable">
                <tbody>
                  <tr>
                    <td>
                      <b>帳號:</b>
                      <span>{memberMail}</span>
                    </td>
                    <td>
                      <b>手機:</b>
                      <span className="specialSpan">{memberPhone}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b>姓名:</b>
                      <span>{memberName}</span>
                    </td>
                    <td>
                      <b>性別:</b>
                      <span className="specialSpan">{gender()}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b>暱稱:</b>
                      <span>{memberNickName}</span>
                    </td>
                    <td>
                      <div className="payMethodContent">
                        <b>付款方式</b>

                        <span>
                          <select
                            id="expDays"
                            defaultValue={""}
                            onChange={(e) => {
                              setPayMethod(e.target.value);
                            }}
                          >
                            <option value="" disabled hidden>
                              請選擇要付款的方式
                            </option>
                            <option value="1">現金</option>
                          </select>
                          {nextStep === "click" && (
                            <>
                              {payMethod === "" && (
                                <IoMdAlert className="orderIoMdAlert" />
                              )}
                            </>
                          )}
                        </span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </>
          ) : (
            <div style={{ marginLeft: 600 }}>
              <BookingLoading />
            </div>
          )}
        </div>
        <div className="orderList">
          {/* {activityPackloading ? (
            <> */}
          <div className="orderListHeader">
            <h1>訂購者資料確認</h1>
            <p>
              一條龍記錄您的訂單及活動行程，並即時更新在會員中心讓您隨時查看。
            </p>
          </div>
          <div className="orderListBody">
            <div className="orderListImg">{handleImgData()}</div>
            <div className="orderListAll">
              <div className="list">
                <p>入住日期</p>
                <span>{date}</span>
              </div>
              <div className="list">
                <p>入住天數</p>
                <span>{dayState}</span>
              </div>
              <div className="list">
                <p>飯店/房型</p>
                <span>{handleroomStateData()}</span>
              </div>
              <div className="list">
                <p>優惠票券</p>
                <span>{handleCouponStateData()}</span>
              </div>
              <div className="list">
                <p>活動參與</p>
                <span>{handleActivityStateData()}</span>
              </div>
              <div className="list">
                <p>活動天數</p>
                <span>{countActivity}</span>
              </div>
            </div>
          </div>
          {/* </>
          ) : (
            <div style={{ marginLeft: 600 }}>
              <BookingLoading />
            </div>
          )} */}
        </div>

        {/* <div className="marginContainer">
          {activityPackloading ? (
            <>
              {getAllActivePackData && (
                <>
                  {activityBag1Visible && (
                    <div className="activityList">{showAvtivity1Bag()}</div>
                  )}
                </>
              )}
              {getAllActivePackData && (
                <>
                  {activityBag2Visible && (
                    <div className="activityList">{showAvtivity2Bag()}</div>
                  )}
                </>
              )}
              {getAllActivePackData && (
                <>
                  {activityBag3Visible && (
                    <div className="activityList">{showAvtivity3Bag()}</div>
                  )}
                </>
              )}
            </>
          ) : (
            <div style={{ marginLeft: 600 }}>
              <BookingLoading />
            </div>
          )}
        </div> */}
        <div className="line"></div>
        {/* <div className="marginContainer plusBuy">
          <h5>KOMORU Star Hostel 背包客房型 加購活動確認</h5>
          <p>
            活動參與天數{countActivity}天:
            <span>NT${countActivity * 700}元</span>
          </p>
        </div> */}
        <div className="marginContainer Total">
          <p>
            房間總共:<span> NT${roomSum}元</span>
          </p>
          {showCoupon && (
            <p>
              優惠折扣:<span>-NT${Number(couponData[0].discount)}元</span>
            </p>
          )}
          <p style={{ color: "black" }}>
            應付金額: <span>NT$ {sumActivity}元</span>
          </p>
          <button onClick={CheckoutOrderHandler}>結帳確認</button>
        </div>
      </div>
    </>
  );
}

export default OrderWithNoActivity;
