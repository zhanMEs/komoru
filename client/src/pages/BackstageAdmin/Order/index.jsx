import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
// import OrderData from "./db_OrderList.json";
import OrderView from "./OrderView";
import BackstageLoding from "../../../components/BackstageLoading";
import "../BackstageAdmin.css";
import "./Order.css";

function Order() {
  /* 20220616 YG
  初始化使用者資料
  初始化頁數*/
  // const [users, setUsers] = useState(OrderData.slice(0));
  const [pageNumber, setPageNumber] = useState(0);
  /*20220617 YN
  接後端資料初始化*/
  const [data, setData] = useState([]);
  /*20220628 YN
  入住資料狀態初始化*/
  const [orderData, setOrderData] = useState([]);

  /*20220622 YN
  檢視表單modal顯示狀態初始化*/
  const [editShow, setEditShow] = useState(false);

  /*20220624 YN
 取當下選取列表時的data狀態初始化*/
  const [editData, setEditData] = useState();

  /*20220707 YN
 資料載入過程初始化*/
  const [loading, setLoading] = useState(false);

  /*20220706 YN
  篩選功能輸入狀態初始化*/
  const [sreachData, setSreachData] = useState({
    keyword: "",
    orderStatus: "",
  });

  /*20220711 YN
  判斷有無選取狀態初始化*/
  const [inputHandle, setInputHandle] = useState(false);

  // const [isClicked, setIsClicked]=useState({
  //   defaultfield:false,
  // })

  //   const handleClick = (e) =>{
  //     const {name, value} = e.target;
  // console.log(e.target)
  //     setIsClicked(prevIsClicked => ({
  //       [name]:value
  //     }))
  //   }

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

  /*20220617 YN
  接後端api取後端資料*/
  useEffect(() => {
    axios
      .post(
        "http://localhost:5000/order/getOrderDataListWithRoomDescAndStayNight"
      )
      .then((res) => {
        console.log(res.data.dataList);
        setData(res.data.dataList);
        setLoading(true);
      })
      .catch((err) => console.log(err));
  }, []);

  /*20220628 YN
  取得目前選取列表orderData資料，並設定orderData狀態*/
  const orderStatusChange = (index) => {
    setOrderData(data[index]);
    setInputHandle(true);
    // console.log(data[index])
  };

  /*20220628 YN
  判斷目前取得的orderStatus狀態資料是否為"未入住"，並轉換狀態*/
  const unCheckInHandle = () => {
    // console.log(orderData.orderStatus)
    if (inputHandle === false) {
      alert("請選取項目");
    } else {
      if (orderData.orderStatus !== "未入住") {
        if (window.confirm("確定修改嗎?")) {
          const orderLists = {
            orderId: orderData.orderId,
            orderStatus: "0",
            employeeId: "1",
          };
          console.log(orderLists);
          fetch("http://localhost:5000/order/updateOrderStatusByOrderId", {
            method: "POST",
            headers: {
              "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(orderLists),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              window.location.reload(false);
              alert("修改成功");
            })
            .catch((e) => {
              console.error(e);
            });
        }
      } else {
        alert("目前以'未入住'狀態");
      }
    }
  };
  /*20220628 YN
  判斷目前取得的orderStatus狀態資料是否為"已入住"，並轉換狀態*/
  const checkInHandle = () => {
    // console.log(orderData.orderStatus)
    if (inputHandle === false) {
      alert("請選取項目");
    } else {
      if (orderData.orderStatus !== "已入住") {
        if (window.confirm("確定修改嗎?")) {
          const orderLists = {
            orderId: orderData.orderId,
            orderStatus: "1",
            employeeId: "1",
          };
          console.log(orderLists);
          fetch("http://localhost:5000/order/updateOrderStatusByOrderId", {
            method: "POST",
            headers: {
              "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(orderLists),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              window.location.reload(false);
              alert("修改成功");
            })
            .catch((e) => {
              console.error(e);
            });
        }
      } else {
        alert("目前為'已入住'狀態");
      }
    }
  };

  /*20220628 YN
  判斷目前取得的orderStatus狀態資料是否為"已退房"，並轉換狀態*/
  const checkOutHandle = () => {
    // console.log(orderData.orderStatus)
    if (inputHandle === false) {
      alert("請選取項目");
    } else {
      if (orderData.orderStatus !== "已退房") {
        if (window.confirm("確定修改嗎?")) {
          const orderLists = {
            orderId: orderData.orderId,
            orderStatus: "2",
            employeeId: "1",
          };
          console.log(orderLists);
          fetch("http://localhost:5000/order/updateOrderStatusByOrderId", {
            method: "POST",
            headers: {
              "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(orderLists),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              window.location.reload(false);
              alert("修改成功");
            })
            .catch((e) => {
              console.error(e);
            });
        }
      } else {
        alert("目前以'已退房'狀態");
      }
    }
  };

  /*20220617 YN
  利用變數取畫面上顯示資料 */
  const arr = data.map((data, index) => {
    return (
      <tr key={index} className="form-check-label" >
          <td className="col-sm-1" style={{padding:'0'}}>
          <label style={{ width: "100%", height: "100%"}}>
            <input
              className="form-check-input"
              type="radio"
              name="defaultfield"
              value={data.orderId}
              onClick={() => orderStatusChange(index)}
              
            />
            </label>
          </td>
          <td className="col-sm-1">{data.orderNumber}</td>
          <td className="col-sm-1">{data.orderStartDate}</td>
          <td className="col-sm-1">{data.orderStatus}</td>
          <td className="col-sm-1">{data.memberName}</td>
          <td className="col-sm-1">{data.roomType}</td>
          <td className="col-sm-1">{data.stayNight}</td>
          <td className="col-sm-1">
            <button
              onClick={() => handleViewShow(index)}
              className="btn km-page-content km-edit-button-content"
            >
              檢視
            </button>
          </td>
        
        </tr>
    );
  });

  /*20220705 YN
 檢視表單，modal顯示狀態設定*/
  const handleViewShow = (index) => {
    setEditShow(true);
    setEditData(data[index]);
    // console.log(data[index].orderId)
  };

  // const handleEditShow = () => setEditShow(true);
  const handleEditClose = () => setEditShow(false);

  /*20220616 YG
  設定畫面上資料個數*/
  const userPerPage = 10;
  /*20220616 YG
  總頁面資料個數 */
  const pageVisited = pageNumber * userPerPage;
  /*20220616 YG
  利用變數取畫面上顯示資料 */
  const displayUsers = arr.slice(pageVisited, pageVisited + userPerPage);

  /*20220616 YG
  (react-paginate參數)
  取頁簽顯示數字 */
  const pageCount = Math.ceil(data.length / userPerPage);
  /*20220616 YG
  (react-paginate參數)
  點選後更換頁面 */
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  // console.log(loading)

  /*20220706 YN
    取得搜尋關鍵字及選擇值*/
  const sreachChangeHandle = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...sreachData };
    newFormData[fieldName] = fieldValue;
    console.log(newFormData);
    setSreachData(newFormData);
  };
  /*20220706 YN
    送出搜尋關鍵字及選擇值進行篩選*/
  const sreachSubmitHandle = (event) => {
    event.preventDefault();
    const newContact = {
      keyword: sreachData.keyword,
      orderStatus: sreachData.orderStatus,
    };
    console.log(newContact);

    // setAddFormData(newContacts);
    fetch(
      "http://localhost:5000/order/getOrderDataListByKeywordAndOrderStatus",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(newContact),
      }
    )
      .then((response) => response.json()) // 取出 JSON 資料，並還原成 Object。response.json()　一樣回傳 Promise 物件
      .then((data) => {
        let result = data.dataList;
        console.log(data);
        if (result.length === 0) {
          alert("查無此資料");
          setData(data.dataList);
          // console.log(data.dataList);
        } else {
          setData(data.dataList);
          // console.log(data.dataList);
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };
  return (
    <>
      <div className="mx-5  mb-5">
        <div className="ms-5">
          <h3 className="mt-5 mb-5 km-page-title">訂單管理</h3>
        </div>
        <div>
          <div className="row ms-5 mb-5 g-0">
            <div className="col-sm-4">
              <div className="d-flex justify-content-start">
                {orderData.orderStatus === "未入住" ? (
                  <></>
                ) : (
                  <button
                    onClick={unCheckInHandle}
                    className=" btn km-page-header km-button-header"
                  >
                    未入住
                  </button>
                )}

                {orderData.orderStatus === "已入住" ? (
                  <></>
                ) : (
                  <button
                    onClick={checkInHandle}
                    className="btn ms-2 km-page-header km-button-header"
                  >
                    已入住
                  </button>
                )}

                {orderData.orderStatus === "已退房" ? (
                  <></>
                ) : (
                  <button
                    onClick={checkOutHandle}
                    className="btn ms-2 km-page-header km-button-header"
                  >
                    已退房
                  </button>
                )}
              </div>
            </div>
            <div className="col-sm-7 ms-5">
              <div className="row g-0 justify-content-end">
                <div className="col-3 me-2">
                  <input
                    name="keyword"
                    className="form-control col-1 km-page-header"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    onChange={sreachChangeHandle}
                  />
                </div>
                <div className="col-3 me-2">
                  <select
                    name="orderStatus"
                    className=" form-select col-2 km-page-header "
                    aria-label="Default select example"
                    onChange={sreachChangeHandle}
                  >
                    <option value="" selected>
                      入住狀態搜尋
                    </option>
                    <option value="0">未入住</option>
                    <option value="1">已入住</option>
                    <option value="2">已退房</option>
                  </select>
                </div>
                <div className="col-2 ">
                  <button
                    className="btn km-page-header km-button-header"
                    type="submit"
                    onClick={sreachSubmitHandle}
                  >
                    搜尋
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="row ms-5 g-0">
            <div className="col-sm-11">
              {loading ? (
                <>
                  <table className="table table-hover text-center align-middle km-page-content table-condensed">
                    <thead>
                      <tr>
                        <td></td>
                        <td>訂單編號</td>
                        <td>入住日期</td>
                        <td>入住狀態</td>
                        <td>訂購姓名</td>
                        <td>區域/房型</td>
                        <td>入住天數</td>
                        <td>功能</td>
                      </tr>
                    </thead>
                    <tbody>{displayUsers}</tbody>
                  </table>
                </>
              ) : (
                <div className="d-flex justify-content-center">
                  <BackstageLoding />
                </div>
              )}
              <div className="d-flex justify-content-center">
                <ReactPaginate
                  // className="km-paginate-bg"
                  nextLabel=">"
                  previousLabel="<"
                  pageCount={pageCount}
                  onPageChange={changePage}
                  breakClassName={"page-item"}
                  breakLinkClassName={"page-link"}
                  containerClassName={"pagination"}
                  pageClassName={"page-item"}
                  pageLinkClassName={"page-link"}
                  previousClassName={"page-item"}
                  previousLinkClassName={"page-link"}
                  nextClassName={"page-item"}
                  nextLinkClassName={"page-link"}
                  activeClassName={"active"}
                  pageRangeDisplayed={2}
                  marginPagesDisplayed={1}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        size="lg"
        // aria-labelledby="contained-modal-title-vcenter"
        // centered
        show={editShow}
        onHide={handleEditClose}
        style={{ margin: "-60px 0 0 170px" }}
      >
        <Modal.Header closeButton style={{ border: "none" }}></Modal.Header>
        {editData && (
          <OrderView
            // editShow={editShow}
            setEditShow={setEditShow}
            editData={editData}
          />
        )}
      </Modal>
    </>
  );
}

export default Order;
