import React, { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route, Navigate } from "react-router-dom";
import Order from "../../pages/BackstageAdmin/Order";
import Partnership from "../../pages/BackstageAdmin/Partnership";
import Dashboard from "../../pages/BackstageAdmin/Dashboard";
import Hotel from "../../pages/BackstageAdmin/Hotel";
import Room from "../../pages/BackstageAdmin/Room";
import Employee from "../../pages/BackstageAdmin/Employee";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from 'react-router-dom'


function AdminHeader() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    axios({
      method: "POST",
      url: "http://localhost:5000/employee/checkIsLogin",
      withCredentials: true,
    })
      .then((res) => {
        if (res.data.status === true) {
          // console.log(res.data);
          setUserName(res.data.dataList.employeeName);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let navigate = useNavigate();
  const logOut = () => {
    axios({
      method: "POST",
      url: "http://localhost:5000/employee/logout",
      withCredentials: true,
    })
      .then((res) => {
        if (res.data.status === true) {
          console.log(res.data); 
          alert("已登出");
          navigate("/BackstageLogin", { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div
        className="d-flex  sticky-top justify-content-end align-items-center"
        style={{ background: "#EFA16A",
         height: "100px" ,
         boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)" }}
      >
        <h6 className="fs-4 text-white me-4">您好, {userName}</h6>
        <button className="btn me-5" onClick={logOut}>
          <FiLogOut size="2em" color="white" />
        </button>
      </div>
      <Routes>
        <Route path="/order" element={<Order />}></Route>
        <Route path="/partnership" element={<Partnership />}></Route>
        <Route path="/dashboard/*" element={<Dashboard />}></Route>
        <Route path="/hotel" element={<Hotel />}></Route>
        <Route path="/room" element={<Room />}></Route>
        <Route path="/employee" element={<Employee />}></Route>
        <Route path="/" element={<Navigate to="order" />}></Route>
      </Routes>
    </>
  );
}

export default AdminHeader;
