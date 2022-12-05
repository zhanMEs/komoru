import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Booking from "./booking/Booking";
import "./BookingHomepage.css";
import BookingAgreeModal from "./bookingAgreeModal/BookingAgreeModal";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
// import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import { AiOutlineRight } from "react-icons/ai";

function BookingHomepage() {
  let navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.token) {
      navigate("/login", { replace: true });
    }
  });

  return (
    <>
      <BookingAgreeModal />
      <Navbar />
      <div className="bookingBreadcrumbs">
        <Link to="/">首頁</Link>
        <span>
          <AiOutlineRight />
        </span>
        <p>即刻預定</p>
      </div>
      <div className="bookingHomepageContainer">
        <Booking />
      </div>
      <div className="bookingFooter">
        <Footer />
      </div>
    </>
  );
}

export default BookingHomepage;
