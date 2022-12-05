import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import BackstageAdmin from "./pages/BackstageAdmin";
import BackstageLogin from "./pages/BackstageLogin";

// AKI
import Home from "./pages/Home";
import LoginPage from "./pages/aboutMember/LoginPage";
import ForgotPW from "./pages/aboutMember/ForgotPWPage";
import Register from "./pages/aboutMember/Register";
import UserHomePage from "./pages/userPage/UserHomePage";

//ZH
import PsychologicalExam from "./pages/psychologicalExam/PsychologicalExam";
import BookingHomepage from "./pages/bookingHomepage/BookingHomepage";
import BookingOrderPage from "./pages/orderPage/BookingOrderPage";
import CheckoutSucceeded from "./pages/checkoutSucceededPage/CheckoutSucceeded";
import { BookContext } from "./Helper/Context";
import PartnerHotel from "./pages/partnerHotel/PartnerHotel";
import ContactUs from "./pages/contactUs/ContactUs";
import OrderWithNoActivity from "./pages/orderPage/OrderWithNoActivity";

// import ReactLoading from 'react-loading';

// 0622 - 確認該用戶是否登入，可以連這隻api
export const loginOrNot = () => {
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
    })
    .catch((err) => {
      console.log(err);
    });
};

// 0622- aki 登出請調用該函式
export const logout = () => {
  localStorage.removeItem("token");
  window.location.reload("false"); //想重新渲染同頁面可以用這段
};

function App() {
  //2022-06-23 ZH
  //用context讓所有組件共用以下state
  const [date, setDate] = useState("");
  const [dayState, setDayState] = useState("");
  const [cityState, setCityState] = useState([]);
  const [roomState, setRoomState] = useState("default");
  const [couponState, setCouponState] = useState("");
  const [couponData, setCouponData] = useState([]);
  const [activityState, setActivityState] = useState("");
  const [activity1Data, setActivity1Data] = useState("");
  const [activity2Data, setActivity2Data] = useState("");
  const [activity3Data, setActivity3Data] = useState("");
  const [countActivity, setCountActivity] = useState(Number(0));
  const [sumActivity, setSumActivity] = useState("");
  const [cityIdValue, setCityIdValue] = useState("");

  const all = {
    date,
    setDate,
    dayState,
    setDayState,
    cityState,
    setCityState,
    cityIdValue,
    setCityIdValue,
    roomState,
    setRoomState,
    couponState,
    setCouponState,
    couponData,
    setCouponData,
    activityState,
    setActivityState,
    activity1Data,
    setActivity1Data,
    activity2Data,
    setActivity2Data,
    activity3Data,
    setActivity3Data,
    countActivity,
    setCountActivity,
    sumActivity,
    setSumActivity,
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* YN */}
        <Route path="/BackstageLogin" element={<BackstageLogin />}></Route>
        <Route path="/BackstageAdmin/*" element={<BackstageAdmin />}></Route>

        {/* AKI */}
        <Route path="/" element={<Home />} />
        <Route path="/login/*" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotPW" element={<ForgotPW />} />
        <Route path="/user-home/*" element={<UserHomePage />} />

        {/* ZH */}
        <Route
          path="/bookingHomepage"
          element={
            <BookContext.Provider value={all}>
              <BookingHomepage />
            </BookContext.Provider>
          }
        />
        <Route
          path="/psychologicalExam"
          element={
            <BookContext.Provider value={all}>
              <PsychologicalExam />
            </BookContext.Provider>
          }
        />

        <Route
          path="/bookingOrderPage"
          element={
            <BookContext.Provider value={all}>
              <BookingOrderPage />
            </BookContext.Provider>
          }
        />
        <Route
          path="/OrderWithNoActivity"
          element={
            <BookContext.Provider value={all}>
              <OrderWithNoActivity />
            </BookContext.Provider>
          }
        />
        <Route path="checkoutSucceeded" element={<CheckoutSucceeded />} />
        <Route path="/hotelIntro" element={<PartnerHotel />} />
        <Route path="/contactUs" element={<ContactUs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
