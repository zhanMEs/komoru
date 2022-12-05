import "./BookingPageImgAll.css";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

function BookingPageImgAll() {
  // const [data, setData] = useState([]);
  // useEffect(() => {
  //   axios
  //     .post(
  //       "http://localhost:5000/hotel/getHotelDataListWithMainImgAndCityName"
  //     )
  //     .then((res) => {
  //       setData(res.data.dataList);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);
  // const bookingHomePageImg = Object.values(data).map((item, index) => {
  //   return (
  //     <div key={index}>
  //       <div className="featuredUp">
  //         <div className="featuredItem">
  //           <img
  //             src="http://localhost:5000/images/hotel/hotel-10.jpeg"
  //             alt=""
  //             className="featuredImg"
  //           />
  //           <h1 className="featuredTitles">台北</h1>
  //         </div>
  //         <div className="featuredItem">
  //           <img
  //             src="http://localhost:5000/images/hotel/hotel-9.jpeg"
  //             alt=""
  //             className="featuredImg"
  //           />
  //           <h1 className="featuredTitles">台中</h1>
  //         </div>
  //       </div>
  //       <div className="featuredDown">
  //         <div className="featuredItem">
  //           <img
  //             src="http://localhost:5000/images/hotel/hotel-24.jpeg"
  //             alt=""
  //             className="featuredImg"
  //           />
  //           <h1 className="featuredTitles">台南</h1>
  //         </div>
  //         <div className="featuredItem">
  //           <img
  //             src="http://localhost:5000/images/hotel/hotel-15.jpeg"
  //             alt=""
  //             className="featuredImg"
  //           />
  //           <h1 className="featuredTitles">台東</h1>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // });
  // return <div className="rightImgContainer">{bookingHomePageImg};</div>;
  return (
    <div className="rightImgContainer">
      <img
        className="rightImgContainer-img"
        src={require("./訂房首頁圖.png")}
        alt="訂房首頁圖"
      />
      <img
        className="rightImgContainer-img"
        src={require("./bookingimage2.jpeg")}
        alt="訂房首頁圖"
      />
      <img
        className="rightImgContainer-img"
        src={require("./bookingimage3.jpeg")}
        alt="訂房首頁圖"
      />
      {/* <img src="http://localhost:5000/images/hotel/hotel-15.jpeg" alt="" /> */}
    </div>
  );
}

export default BookingPageImgAll;
