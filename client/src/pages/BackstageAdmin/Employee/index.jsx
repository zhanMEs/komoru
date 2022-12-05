import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import EmployeeAdd from "./EmployeeAdd";
import EmployeeViewEdits from "./EmployeeViewEdits";
import BackstageLoding from "../../../components/BackstageLoading";

function Employee() {
  /* 20220616 YN
  初始化使用者資料
  初始化頁數*/
  // const [users, setUsers] = useState(OrderData.slice(0));
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

  /*20220707 YN
資料載入過程初始化*/
  const [loading, setLoading] = useState(false);

  /*20220706 YN
  篩選功能輸入狀態初始化*/
  const [sreachData, setSreachData] = useState({
    keyword: "",
    // cityId: "",
  });

  /*20220624 YN
 初始化*/
  // const [deletData, setDeletData] = useState();

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

  /*20220622 YN
  新增表單時，modal顯示狀態設定*/
  const handleAddShow = () => setAddShow(true);
  const handleAddClose = () => setAddShow(false);

  /*20220617 YN
  接後端api取合作夥伴後端資料*/
  useEffect(() => {
    const fetchData = async () => {
      // get the data from the api
      const response = await fetch(
        "http://localhost:5000/employee/getEmployeeDataList",
        {
          method: "POST",
        }
      );
      // set state with the result
      const json = await response.json();
      const dataResult = json.dataList;
      // console.log(dataResult);
      setData(dataResult);
      setLoading(true);
    };
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
    // axios
    //   .post(
    //     "http://localhost:5000/partnership/getPartnershipDataListWithCityName"
    //   )
    //   .then((res) => {
    //     // console.log(res.data.dataList);
    //     setData(res.data.dataList);
    //   })
    //   .catch((err) => console.log(err));
  }, []);

  /*20220616 YN
  設定畫面上資料個數*/
  const userPerPage = 10;
  /*20220616 YN
  總頁面資料個數 */
  const pageVisited = pageNumber * userPerPage;

  /*20220703 YN
  map所有員工資料 */
  const arr = data.map((data, index) => {
    return (
      <tr key={index} className="form-check-label">
        {/* <td className="col-sm-1">{data.employeeId}</td> */}
        <td className="col-sm-1">{data.employeeAccount}</td>
        <td className="col-sm-1">{data.employeeName}</td>
        <td className="col-sm-1">{data.employeePhone}</td>
        <td className="col-sm-1 ">
          <button
            onClick={() => handleEditShow(index)}
            className="me-1 btn km-page-content km-edit-button-content"
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
  /*20220622 YN
  修改表單時，modal顯示狀態設定*/
  const handleEditShow = (index) => {
    setEditShow(true);
    setEditData(data[index]);
    // console.log(data[index].partnershipId)
  };

  // const handleEditShow = () => setEditShow(true);
  const handleEditClose = () => setEditShow(false);

  /*20220620 YN
  移除功能 */
  const deletFormHandle = (index) => {
    if (window.confirm("確定要移除嗎?")) {
      const result = {
        employeeId: `${data[index].employeeId}`,
        operatorEmployeeId: "1",
      };

      fetch("http://localhost:5000/employee/delEmployeeByEmployeeId", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(result),
      })
        // .then((response) => response.json())
        .then((res) => {
          // console.log(res);
          alert('移除成功')
          window.location.reload(false);
        })
        .catch((e) => {
          console.error(e);
        });

    }
  };

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
      // cityId: sreachData.cityId,
    };
    console.log(newContact);

    // setAddFormData(newContacts);
    fetch("http://localhost:5000/employee/getEmployeeDataListByKeyword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(newContact),
    })
      .then((response) => response.json())
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
          <h3 className="mt-5 mb-5 km-page-title">員工管理</h3>
        </div>
        <div>
          <div className="row ms-5 mb-5 g-0">
            <div className="col-sm-4">
              <div className="d-flex justify-content-start">
                <button
                  onClick={handleAddShow}
                  className="btn km-page-header km-button-header"
                >
                  新增員工
                </button>

                <Modal
                  size="lg"
                  // aria-labelledby="contained-modal-title-vcenter"
                  // centered
                  show={addShow}
                  onHide={handleAddClose}
                  style={{
                    margin: '0 0 0 170px',
                  }}
                >
                  <Modal.Header closeButton style={{ border: "none" }}></Modal.Header>
                  <EmployeeAdd
                    data={data}
                    addShow={addShow}
                    setAddShow={setAddShow}
                  />
                </Modal>
              </div>
            </div>
            <div className="col-sm-7 ms-5">
              <div className="row g-0 justify-content-end">
                <div className="col-3 me-2">
                  <input
                    name="keyword"
                    className="form-control col-1 km-page-header"
                    type="search"
                    placeholder="搜尋"
                    aria-label="Search"
                    onChange={sreachChangeHandle}
                  />
                </div>
                {/* <div className="col-3 me-2">
                  <select
                    name="cityId"
                    className=" form-select col-2"
                    aria-label="Default select example"
                    onChange={sreachChangeHandle}
                    style={{fontSize: "20px"}}
                  >
                    <option value="" selected>
                      地區搜尋
                    </option>
                    <option value="1">北區</option>
                    <option value="2">中區</option>
                    <option value="3">南區</option>
                    <option value="4">東區</option>
                  </select>
                </div> */}
                <div className="col-2 km-page-header">
                  <button
                    className="btn km-button-header"
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
            <div className="col-sm-11 ">
              {loading ? (
                <>
                  <table
                    className="table table-hover  text-center align-middle km-page-content"
                  >
                    <thead>
                      <tr>
                        {/* <td>員工編號</td> */}
                        <td>員工帳號</td>
                        <td>員工姓名</td>
                        <td>員工電話</td>
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
        size="lg"
        // aria-labelledby="contained-modal-title-vcenter"
        // centered
        show={editShow}
        onHide={handleEditClose}
        style={{ margin:'-50px 0 0 170px' }}
      >
        <Modal.Header closeButton style={{ border: "none" }}></Modal.Header>
        <EmployeeViewEdits setEditShow={setEditShow} editData={editData} />
      </Modal>
    </>
  );
}

export default Employee;
