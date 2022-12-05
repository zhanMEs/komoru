import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";
import RoomViewEdits from "./RoomViewEdits";
import RoomAdd from "./RoomAdd";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BackstageLoding from "../../../components/BackstageLoading";
function Room() {
  /* 20220616 YN
  初始化使用者資料
  初始化頁數*/
  // const [users, setUsers] = useState(HotelData.slice(0));
  const [pageNumber, setPageNumber] = useState(0);
  /*20220617 YN
  接後端資料初始化*/
  const [data, setData] = useState([]);
  /*20220622 YN
  增加表單modal顯示狀態初始化*/
  const [addShow, setAddShow] = useState(false);
  /*20220622 YN
  檢視表單modal顯示狀態初始化*/
  const [editShow, setEditShow] = useState(false);
  /*20220624 YN
  取當下選取列表時的data狀態初始化*/
  const [editData, setEditData] = useState();

  /*20220622 YN
   飯店資料初始化*/
  const [hotelData, setHotelData] = useState([]);

  /*20220706 YN
  篩選功能輸入狀態初始化*/
  const [sreachData, setSreachData] = useState({
    keyword: "",
    cityId: "",
  });

  /*20220707 YN
資料載入過程初始化*/
  const [loading, setLoading] = useState(false);

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
        "http://localhost:5000/room/getRoomDataListWithMainImgAndHotelNameAndCityName"
      )
      .then((res) => {
        // console.log(res.data.dataList);
        setData(res.data.dataList);
        setLoading(true);
      })
      .catch((err) => console.log(err));
  }, []);

  /*20220616 YN
  設定畫面上資料個數*/
  const userPerPage = 6;
  /*20220616 YN
  總頁面資料個數 */
  const pageVisited = pageNumber * userPerPage;

  /*20220617 YN
  利用變數取畫面上顯示資料 */
  const arr = data.map((data, index) => {
    return (
      // console.log(values.hotelTitle)
      <tr key={index} className="form-check-label">
        <td className="col-sm-1">{data.roomType}</td>
        <td className="col-sm-1">{data.hotelTitle}</td>
        <td className="col-sm-1">{data.cityName}</td>
        <td className="col-sm-1">{data.liveNum}</td>
        <td className="col-sm-1">
          <div
            className=" "
            style={{
              width: "100%",
              height: "200px",
              backgroundImage: `url("http://localhost:5000${data.roomImgPath}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        </td>
        <td className="col-sm-1 ">
          <button
            className="me-1 btn km-page-content km-edit-button-content"
            onClick={() => handleEditShow(index)}
          >
            檢視/修改
          </button>

          <button
            onClick={() => deletFormHandle(index)}
            className="btn km-page-content km-delet-button-content"
          >
            移除
          </button>
        </td>
      </tr>
    );
  });
  /*20220617 YN
  arr變數(畫面)進行slice顯示資料 */
  const displayUsers = arr.slice(pageVisited, pageVisited + userPerPage);
  /*20220616 YN
  (react-paginate參數)
  取頁簽顯示數字 */
  const pageCount = Math.ceil(data.length / userPerPage);
  /*20220616 YN
  (react-paginate參數)
  點選後更換頁面 */
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  /*20220620 YN
  移除功能 */
  const deletFormHandle = (index) => {
    // setData(
    //   data.filter((dataList) => {
    //     return data[index].roomId !== dataList.roomId;
    //   })
    // );
    // console.log(dataList.partnershipId);
    if (window.confirm("確定要移除嗎?")) {
      const result = {
        roomId: `${data[index].roomId}`,
        employeeId: "1",
      };

      fetch("http://localhost:5000/room/delRoomByRoomId", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(result),
      })
        // .then((response) => response.json())
        .then((res) => {
          console.log(res);
          alert("移除成功");
          window.location.reload(false);
        })
        .catch((e) => {
          console.error(e);
        });

    }
  };
  /*20220622 YN
  新增表單時，modal顯示狀態設定*/
  const handleAddShow = () => setAddShow(true);
  const handleAddClose = () => setAddShow(false);
  /*20220622 YN
  修改表單時，modal顯示狀態設定*/
  const handleEditShow = (index) => {
    setEditShow(true);
    setEditData(data[index]);
    console.log(data[index]);
  };

  // const handleEditShow = () => setEditShow(true);
  const handleEditClose = () => setEditShow(false);

  // /*20220701 YN
  //   取得後端飯店資料*/
  useEffect(() => {
    const getData = async () => {
      const res = await axios
        .post(
          "http://localhost:5000/hotel/getHotelDataListWithMainImgAndCityName"
        )
        .then((res) => {
          console.log(res.data.dataList);
          setHotelData(res.data.dataList);
        })
        .catch((err) => console.log(err));
    };
    getData();
  }, []);

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
      cityId: sreachData.cityId,
    };
    console.log(newContact);
    fetch("http://localhost:5000/room/getRoomDataListByKeywordAndCityId", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(newContact),
    })
      .then((response) => response.json()) // 取出 JSON 資料，並還原成 Object。response.json()　一樣回傳 Promise 物件
      .then((data) => {
        let result = data.dataList;
        console.log(data);
        if (result.length === 0) {
          alert("查無此資料");
          setData(data.dataList);
        } else {
          setData(data.dataList);
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
          <h3 className="mt-5 mb-5 km-page-title">飯店房型管理 &gt; 房型</h3>
        </div>
        <div>
        <div className="row ms-5 mb-5 g-0">
            <div className="col-sm-4">
              <div className="d-flex justify-content-start">
                <button
                  onClick={handleAddShow}
                  className="btn km-page-header km-button-header"
                >
                  新增房型
                </button>
                <Modal
                  size="xl"
                  // aria-labelledby="contained-modal-title-vcenter"
                  // centered
                  show={addShow}
                  onHide={handleAddClose}
                  style={{
                    margin: '0 0 0 170px',
                  }}
                >
                  <Modal.Header closeButton style={{ border: "none" }}></Modal.Header>
                  <RoomAdd
                    data={data}
                    addShow={addShow}
                    setAddShow={setAddShow}
                    hotelData={hotelData}
                  />
                </Modal>
              </div>
            </div>
            <div className="col-sm-8">
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
                    name="cityId"
                    className=" form-select col-2 km-page-header"
                    aria-label="Default select example"
                    onChange={sreachChangeHandle}
                  >
                   <option value="" selected>
                      區域搜尋
                    </option>
                    <option value="1">北部</option>
                    <option value="2">中部</option>
                    <option value="3">南部</option>
                    <option value="4">東部</option>
                  </select>
                </div>
                <div className="col-2">
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
            <div className=" col-sm-11">
              {loading ? (
                <>
                  <table
                    className="table table-sm table-hover text-center align-middle km-page-content"
                  >
                    <thead>
                      <tr>
                        <td className="col-sm-1">房型</td>
                        <td className="col-sm-1">飯店名稱</td>
                        <td className="col-sm-1">區域</td>
                        <td className="col-sm-1">容納人數</td>
                        <td className="col-sm-1">圖片</td>
                        <td className="col-sm-1">功能</td>
                      </tr>
                    </thead>
                    <tbody
                      style={{
                        height: " 600px",
                        width: " 1340px",
                        overflowY: "scroll",
                        position: "absolute",
                      }}
                    >
                      {displayUsers}
                    </tbody>
                  </table>
                </>
              ) : (
                <div className="d-flex justify-content-center">
                  <BackstageLoding />
                </div>
              )}
              <div
                className=" d-flex justify-content-center"
                style={{
                  marginTop: "620px",
                }}
              >
                <nav aria-label="Page navigation example">
                  <ul className="pagination">
                    <ReactPaginate
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
                    />
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        size="xl"
        // aria-labelledby="contained-modal-title-vcenter"
        // centered
        show={editShow}
        onHide={handleEditClose}
        style={{ margin:'-50px 0 0 170px' }}
      >
        <Modal.Header closeButton style={{ border: "none" }}></Modal.Header>
        {hotelData && (
          <RoomViewEdits
            editData={editData}
            setEditShow={setEditShow}
            data={data}
            hotelData={hotelData}
          />
        )}
      </Modal>
    </>
  );
}

export default Room;
