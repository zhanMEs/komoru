import React from "react";
import { Link } from 'react-router-dom'
import MyNavLink from "../BackstageAdminMyNarLink";
import { RiBarChart2Line } from "react-icons/ri";
import { RiHome2Line } from "react-icons/ri";
import { RiFileList3Line } from "react-icons/ri";
import { RiSpyLine } from "react-icons/ri";
import { BiUser } from "react-icons/bi";
import { BsChevronCompactDown } from "react-icons/bs";
// import { RiBuildingLine } from "react-icons/ri";
// import { IoBedOutline } from "react-icons/io5";
import LOGO from "../../assets/my-logo.png";
import CatLOGO from "../../assets/CatLogo.png";
import "./BackstageAdminSidebar.css";

function Sidebar() {
  return (
    <>
      <div
        className=" container sticky-top"
        id="sticky-sidebar"
        // style={{ background: "#EFA16A" }}
        style={{ background: "white" }}
      >
        <ul
          className=" container nav flex-column text-start fs-4 d-block nav-pills"
          style={{ height: "100vh" }}
        >
          <div className="pt-lg-4 pb-lg-5 pt-md-5 pb-md-5">
            <Link to="order">
              <img
                className="img-fluid d-md-none d-lg-block"
                style={{ maxWidth: "70%", height: "auto", marginLeft: "20px" }}
                src={LOGO}
                alt=""
              />
              <img
                className="img-fluid d-lg-none d-md-block"
                style={{ maxWidth: "60%", height: "auto", marginLeft: "15px" }}
                src={CatLOGO}
                alt=""
              />
            </Link>
          </div>
          <li className="nav-item" style={{ alignItem: 'center' }}>
            <MyNavLink to="order">
              <div className="d-md-none d-lg-block">
                <RiFileList3Line className="mx-2 ms-4" />
                <span>訂單管理</span>
              </div>
              <div className="d-lg-none d-md-block text-center">
                <RiFileList3Line size="60%" />
              </div>
            </MyNavLink>

          </li>
          <li className="nav-item">
            <MyNavLink to="partnership">
              <div className="d-md-none d-lg-block">
                <RiSpyLine className="mx-2 ms-4" />
                <span>合作夥伴管理</span>
              </div>
              <div className="d-lg-none d-md-block text-center">
                <RiSpyLine size="60%" />
              </div>
            </MyNavLink>
          </li>
          <li className="nav-item dropdown">
            <a
              href="#submenu1"
              data-bs-toggle="collapse"
              className="nav-link dropdown-toggle pt-2 "
              // aria-expanded="false"
              style={{ textDecoration: "none", height: '60px', whiteSpace: 'normal' }}
            >
              {/* <div className="d-md-none d-lg-block">
                <RiHome2Line className="mx-2 ms-4" />
                <span className="kmr-font-color-primary km-sidebar">
                  飯店房型管理
                  <BsChevronCompactDown className="ms-3" size="20px" />
                </span>

              </div>
              <div className="d-lg-none d-md-block text-center">
                <RiHome2Line size="60%" />
              </div> */}

              <span
                className="kmr-font-color-primary km-sidebar"

              >

                <RiHome2Line className="mx-2 ms-4" />
                飯店房型管理
                <BsChevronCompactDown className="ms-3" size="20px" />
              </span>
            </a>
            <ul
              className="collapse nav hidden flex-column h-50 km-sidebar"
              id="submenu1"
              data-bs-parent="#menu"
              styl
            >
              <li >
                <MyNavLink className="nav-link text-center pt-lg-3 pt-md-0" style={{ height: '60px' }} to="hotel">
                  <p style={{ paddingRight: "80px" }}>飯店</p>
                </MyNavLink>
              </li>
              <li>
                <MyNavLink className=" nav-link text-center pt-3" style={{ height: '60px' }} to="room">
                  <p style={{ paddingRight: "80px" }}>房型</p>
                </MyNavLink>
              </li>
            </ul>
          </li>
          <li className="nav-item">
            <MyNavLink to="employee">
              <div className="d-md-none d-lg-block">
                <BiUser className="mx-2 ms-4" />
                <span>員工管理</span>
              </div>
              <div className="d-lg-none d-md-block text-center">
                <BiUser size="60%" />
              </div>

            </MyNavLink>
          </li>
          <li className="nav-item">
            <MyNavLink to="dashboard">
              <div className="d-md-none d-lg-block">
                <RiBarChart2Line className="mx-2 ms-4" />
                <span>分區報表</span>
              </div>
              <div className="d-lg-none d-md-block text-center">
                <RiBarChart2Line size="60%" />
              </div>
            </MyNavLink>
          </li>

        </ul>
        <div className="row">
          <div className="flex-column"></div>
        </div>
      </div>
    </>
  );
}
export default Sidebar;
