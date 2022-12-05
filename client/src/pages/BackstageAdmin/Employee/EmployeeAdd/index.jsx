import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { IoAlertCircleSharp } from "react-icons/io5";
import BackstageLodingModal from "../../../../components/BackstageLoadingModal";
function EmployeeAdd({ setAddShow }) {
  /*20220622 YN
   新增表單資料初始化*/
  const [addFormData, setAddFormData] = useState({
    employeeAccount: "",
    employeePasswd: "",
    employeeName: "",
    employeePhone: "",
    operatorEmployeeId: "1",
  });

  /*20220710 YN
  當輸入框為""，出現警示狀態初始化 */
  const [alertImg, setAlertImg] = useState(false);

   /*20220707 YN
 資料載入過程初始化*/
 const [loading, setLoading] = useState(false);


  /*20220622 YN
   取得輸入新增表單資料*/
  const addFormChangeHandle = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
    console.log(newFormData);
  };
  /*20220622 YN
   送出時取得輸入新增表單資料，並傳到後端重整畫面*/
  const addFormSubmitHandle = (event) => {
    event.preventDefault();

    const newContact = {
      employeeAccount: addFormData.employeeAccount,
      employeePasswd: addFormData.employeePasswd,
      employeeName: addFormData.employeeName,
      employeePhone: addFormData.employeePhone,
      operatorEmployeeId: "1",
    };

    // console.log(newContact)
    // setAddFormData(newContacts);

    if (
      addFormData.employeeAccount === "" ||
      addFormData.employeePasswd === "" ||
      addFormData.employeeName === "" ||
      addFormData.employeePhone === ""
    ) {
      setAlertImg(true);
    } else {  
      setAlertImg(false);
      setLoading(true)
      fetch("http://localhost:5000/employee/addEmployee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(newContact),
      })
        .then((response) => response.json()) // 取出 JSON 資料，並還原成 Object。response.json()　一樣回傳 Promise 物件
        .then((data) => {
          console.log(data);
          alert("新增成功");
          setAddShow(false);
          window.location.reload(false);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  };

  /*20220709 YN
  排除當modal開啟時，scrollbar 消失 sidebar 往右移 */
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => (document.body.style.overflowY = "");
  }, []);
  return (
    <Form className="me-5 ms-5 mt-3 mb-3" onSubmit={addFormSubmitHandle}>
      <Form.Group>
        <Form.Control
          type="text"
          name="employeeAccount"
          // required="required"
          placeholder="請輸入員工帳號"
          onChange={addFormChangeHandle}
          className="km-modal-content"
        />
      </Form.Group>
      {addFormData.employeeAccount === "" && (
        <>
          {alertImg && (
            <h6 style={{ color: "red" }}>
              <IoAlertCircleSharp size="20px" color="red" />
              員工帳號不可空白
            </h6>
          )}
        </>
      )}
      <Form.Group className="mt-3">
        <Form.Control
          type="text"
          name="employeePasswd"
          // required="required"
          placeholder="請輸入員工密碼"
          onChange={addFormChangeHandle}
          className="km-modal-content"
        />
      </Form.Group>
      {addFormData.employeePasswd === "" && (
        <>
          {alertImg && (
            <h6 style={{ color: "red" }}>
              <IoAlertCircleSharp size="20px" color="red" />
              員工密碼不可空白
            </h6>
          )}
        </>
      )}
      <Form.Group className="mt-3">
        <Form.Control
          type="text"
          name="employeeName"
          // required="required"
          placeholder="請輸入員工姓名"
          onChange={addFormChangeHandle}
          className="km-modal-content"
        />
      </Form.Group>
      {addFormData.employeeName === "" && (
        <>
          {alertImg && (
            <h6 style={{ color: "red" }}>
              <IoAlertCircleSharp size="20px" color="red" />
              員工姓名不可空白
            </h6>
          )}
        </>
      )}
      <Form.Group className="mt-3">
        <Form.Control
          type="text"
          name="employeePhone"
          // required="required"
          placeholder="請輸入員工電話"
          onChange={addFormChangeHandle}
          className="km-modal-content"
        />
      </Form.Group>
      {addFormData.employeePhone === "" && (
        <>
          {alertImg && (
            <h6 style={{ color: "red" }}>
              <IoAlertCircleSharp size="20px" color="red" />
              員工電話不可空白
            </h6>
          )}
        </>
      )}
      <div className="mt-3 mb-4 d-flex justify-content-end">
        <button
          className="btn km-add-button-modal km-modal-footer"
          type="submit"
        >
          新增
        </button>
        {loading === true && <BackstageLodingModal />}
      </div>
    </Form>
  );
}

export default EmployeeAdd;
