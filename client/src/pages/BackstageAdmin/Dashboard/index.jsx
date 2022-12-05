import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Routes,
  Route,
  Link,
  Outlet,
  Navigate,
  useNavigate,
  NavLink,
} from "react-router-dom";
import DashboardChartsNorth from "./DashboardChartsNorth";
import DashboardChartsSouth from "./DashboardChartsSouth";
import DashboardChartsMiddle from "./DashboardChartsMiddle";
import DashboardChartsEast from "./DashboardChartsEast";
import "./Dashboard.css";

function Dashboard() {
  /*20220709 YN
  資料選取月份狀態初始化 */
  const [dateData, setDateData] = useState({
    dateRange: "2022-06",
  });

  /*20220709 YN
  區域標題狀態初始化 */
  const [titleArea, setTitleArea] = useState("北部");


  const [isClicked, setIsClicked]=useState({
    north:true,
    middle:false,
    south:false,
    east:false,
  })

  // 0711 aki - 點擊後的CSS樣式掛載
  const handleClick = (e) =>{
    const {name, value} = e.target;
console.log(e.target)
    setIsClicked(prevIsClicked => ({
      [name]:!value
    }))
  }

  /*20220704 YN
  登入狀態為false自動轉跳Login頁面 */
  let navigate = useNavigate();
  useEffect(() => {
    axios({
      method: "POST",
      url: "http://localhost:5000/employee/checkIsLogin",
      withCredentials: true,
    })
      .then((res) => {
        if (res.data.status === false) {
          navigate("/BackstageLogin", { replace: true });
          // console.log(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const dateRangeChangeHandle = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newEditFormData = { ...dateData };
    newEditFormData[fieldName] = fieldValue;

    setDateData(newEditFormData);
    console.log(newEditFormData);
  };

  return (
    <>
      <div className="mx-5" style={{ marginBottom: "50px" }}>
        <div className="ms-5 me-5 d-flex justify-content-between align-items-center">
          <h3 className="mt-5 mb-5 km-page-title">分區報表 &gt; {titleArea}</h3>
          <select
            class="form-select mt-5 mb-5"
            style={{ width: "200px" }}
            aria-label="Default select example"
            name="dateRange"
            onChange={dateRangeChangeHandle}
          >
            <option value="2022-06" selected>
              2022-06
            </option>
            <option value="2022-07" >2022-07</option>
            <option value="2022-08">2022-08</option>
            <option value="2022-09">2022-09</option>
            <option value="2022-10">2022-10</option>
            <option value="2022-11">2022-11</option>
            <option value="2022-12">2022-12</option>
          </select>
        </div>
        <div className="ms-5 me-5">
          <div className="row g-0" style={{ height: "300px"}}>
            <Link
              // className="col me-5 km-dashboard-text km-dashboard-hover-north"
              value='1'
              name='north'
              onClick={handleClick}
              className={isClicked.north? "km-img-north col me-5 km-dashboard-text km-dashboard-hover-north": "km-dashboard-img-north col me-5 km-dashboard-text km-dashboard-hover-north"}
              to="north"
            >
              {/* <div
                class="d-flex justify-content-center align-items-center"
                style={{ height: "100%" }}
                >
                </div> */}
                {/* <h2>北區</h2> */}
                {/* <img class="cover-fit " src={northImage} alt="" /> */}
            </Link>
            <Link
              // className="col me-5 km-img-middle km-dashboard-img-middle km-dashboard-text km-dashboard-hover-middle"
              value='0'
              name='middle'
              onClick={handleClick}
              className={isClicked.middle?"km-img-middle col me-5 km-dashboard-text": "km-dashboard-img-middle col me-5 km-dashboard-text"}
              to="middle"

            >
              {/* <div
                class="d-flex justify-content-center align-items-center"
                style={{ height: "100%" }}
                >
                </div> */}
                {/* <h2>中區</h2> */}
                {/* <img class="cover-fit" src={middleImage} alt="" /> */}
            </Link>
            <Link
              // className="col me-5 km-img-sorth km-dashboard-img-sorth km-dashboard-text km-dashboard-hover-south"
              value='0'
              name='south'
              onClick={handleClick}
              className={isClicked.south? "km-img-south col me-5 km-dashboard-text": "km-dashboard-img-south col me-5 km-dashboard-text"}
              to="south"
            >
              {/* <div
                class="d-flex justify-content-center align-items-center"
                style={{ height: "100%" }}
              >
              </div> */}
                {/* <h2>南區</h2> */}
                {/* <img class="cover-fit" src={sorthImage} alt="" /> */}
            </Link>
            <Link
              // className="col km-img-east km-dashboard-img-east km-dashboard-text km-dashboard-hover-east"
              value='0'
              name='east'
              onClick={handleClick}
              className={isClicked.east? "km-img-east col me-5 km-dashboard-text": "km-dashboard-img-east col me-5 km-dashboard-text"}
              to="east"
            >
              {/* <div
                class="d-flex justify-content-center align-items-center"
                style={{ height: "100%" }}
              >
              </div> */}
                {/* <h2>東區</h2> */}
                {/* <img class="cover-fit" src={eastImage} alt="" /> */}
            </Link>
          </div>
        </div>
      </div>
      {/* <Outlet /> */}

      <Routes>
        <Route
          path="north"
          element={
            <DashboardChartsNorth
              dateData={dateData}
              setTitleArea={setTitleArea}
            />
          }
        />
        <Route
          path="middle"
          element={
            <DashboardChartsMiddle
              dateData={dateData}
              setTitleArea={setTitleArea}
            />
          }
        />
        <Route
          path="south"
          element={
            <DashboardChartsSouth
              dateData={dateData}
              setTitleArea={setTitleArea}
            />
          }
        />
        <Route
          path="east"
          element={
            <DashboardChartsEast
              dateData={dateData}
              setTitleArea={setTitleArea}
            />
          }
        />
        <Route path="/" element={<Navigate to="north" />}></Route>
      </Routes>
    </>
  );
}

export default Dashboard;
