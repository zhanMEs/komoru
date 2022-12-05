import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import ExamAll from "./examAll/ExamAll";
import "./PsychologicalExam.css";
import Navbar from "../../components/Navbar/Navbar";
import { AiOutlineRight } from "react-icons/ai";

function PsychologicalExam() {
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
      </div>
      <div className="ExamFrame">
        <div className="examContainer">
          <ExamAll />
        </div>
      </div>
    </>
  );
}

export default PsychologicalExam;
