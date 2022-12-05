import React from "react";
import { Link } from "react-router-dom";
import "./CheckoutSucceeded.css";
import Navbar from "../../components/Navbar/Navbar";
import { AiOutlineRight } from "react-icons/ai";

const CheckoutSucceeded = () => {
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
        <p>心理測驗</p>
        <span>
          <AiOutlineRight />
        </span>
        <p>訂單確認</p>
        <span>
          <AiOutlineRight />
        </span>
        <p>結帳成功</p>
      </div>
      <div className="checkoutSucceededContainer">
        <span>下訂成功!</span>
        <p>
          快到會員中心查看→
          <Link to="/user-home" className="checkoutSucceededLink">
            訂單紀錄
          </Link>
        </p>
      </div>
    </>
  );
};

export default CheckoutSucceeded;
