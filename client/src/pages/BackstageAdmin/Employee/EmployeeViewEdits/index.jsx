import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { IoAlertCircleSharp } from "react-icons/io5";
import BackstageLoding from "../../../../components/BackstageLoading";
import BackstageLodingModal from "../../../../components/BackstageLoadingModal";

function EmployeeViewEdits({ setEditShow, editData }) {
  /*20220624 YN
  修改資料初始化*/
  const [editModalData, setEditModalData] = useState({
    employeeId: "",
    employeeAccount: "",
    employeePasswd: "",
    employeeName: "",
    employeePhone: "",
    operatorEmployeeId: "1",
  });

  /*20220624 YN
   可否修改狀態初始化*/
  const [isDisabled, setIsDisabled] = useState(true);

  /*20220624 YN
   可否顯示密碼狀態初始化*/
  const [shown, setShown] = useState(false);

  /*20220710 YN
  修改按鈕初始化 */
  const [editButton, setEditButton] = useState(false);

  /*20220710 YN
  當輸入框為""，出現警示狀態初始化 */
  const [alertImg, setAlertImg] = useState(false);

  /*20220707 YN
資料載入過程初始化*/
  const [loading, setLoading] = useState(false);

  /*20220707 YN
 資料送出過程初始化*/
  const [saveloading, setSaveloading] = useState(false);

  /*20220624 YN
   可否修改狀態改變*/
  const disabledClickHandle = () => {
    setIsDisabled(!isDisabled);
    setShown(true);
    setEditButton(true);
    editModalData.employeePasswd = "";
  };

  /*20220624 YN
   取得後端檢視資料*/
  useEffect(() => {
    // console.log(editData)
    // let partnershipIdValue = { 'partnershipId': editData }
    fetch("http://localhost:5000/employee/getEmployeeDataByEmployeeId", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(editData),
    })
      .then((response) => response.json())
      .then((data) => {
        setEditModalData(data.dataList[0]);
        // console.log(data.dataList[0]);
        setLoading(true);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [editData]);

  /*20220622 YN
   取得輸入修改表單資料*/
  const editFormChangeHandle = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newEditFormData = { ...editModalData };
    newEditFormData[fieldName] = fieldValue;

    setEditModalData(newEditFormData);
    console.log(newEditFormData);
  };

  /*20220624 YN
  送出修改表單資料*/
  const editFormSubmitHandle = (event) => {
    event.preventDefault();
    const newContact = {
      employeeId: editModalData.employeeId,
      employeeAccount: editModalData.employeeAccount,
      employeePasswd: editModalData.employeePasswd,
      employeeName: editModalData.employeeName,
      employeePhone: editModalData.employeePhone,
      operatorEmployeeId: "1",
    };
    console.log(editModalData.employeeAccount);
    setEditModalData(newContact);

    if (
      editModalData.employeeAccount === "" ||
      editModalData.employeePasswd === ""
    ) {
      setAlertImg(true);
    } else {
      setSaveloading(true);
      setAlertImg(false);
      fetch("http://localhost:5000/employee/updateEmployeeByEmployeeId", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(newContact),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status) {
            setEditShow(false);
            window.location.reload(false);
            alert("修改成功");
          }
          console.log(data);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  };

  return (
    <>
      {loading ? (
        <Form className="container " onSubmit={editFormSubmitHandle}>
          <Form.Group className="km-modal-content">
            <Form.Label>員工帳號</Form.Label>
            <Form.Control
              type="text"
              name="employeeAccount"
              // required="required"
              placeholder="請輸入員工帳號"
              defaultValue={editModalData.employeeAccount}
              onChange={editFormChangeHandle}
              disabled={isDisabled}
              className="km-modal-content"
            />
          </Form.Group>
          {editModalData.employeeAccount === "" && (
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
            <Form.Label className="km-modal-content">員工密碼</Form.Label>
            <Form.Control
              type="text"
              name="employeePasswd"
              // required="required"
              placeholder="請輸入員工密碼"
              Value={shown ? "" : "******"}
              onChange={editFormChangeHandle}
              disabled={isDisabled}
              className="km-modal-content"
            />
            {/* <button className="btn" onClick={()=>setShown(!shown)}>顯示密碼</button> */}
          </Form.Group>
          {editModalData.employeePasswd === "" && (
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
            <Form.Label className="km-modal-content">員工姓名</Form.Label>
            <Form.Control
              type="text"
              name="employeeName"
              // required="required"
              defaultValue={editModalData.employeeName}
              placeholder="請輸入員工姓名"
              onChange={editFormChangeHandle}
              disabled={isDisabled}
              className="km-modal-content"
            />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label className="km-modal-content">員工電話</Form.Label>
            <Form.Control
              type="text"
              name="employeePhone"
              // required="required"
              placeholder="請輸入員工電話"
              defaultValue={editModalData.employeePhone}
              onChange={editFormChangeHandle}
              disabled={isDisabled}
              className="km-modal-content"
            />
          </Form.Group>
          <div className="mt-3 mb-5 d-flex justify-content-end">
            {editButton ? (
              <></>
            ) : (
              <button
                className="btn me-1 km-edit-button-modal km-modal-footer"
                onClick={disabledClickHandle}
              >
                修改
              </button>
            )}
            {editButton ? (
              <button
                className="btn me-1 km-save-button-modal km-modal-footer"
                type="submit"
              >
                儲存
              </button>
            ) : (
              <></>
            )}
            {saveloading === true && <BackstageLodingModal />}
          </div>
        </Form>
      ) : (
        <div className="d-flex justify-content-center">
          <BackstageLoding />
        </div>
      )}
    </>
  );
}

export default EmployeeViewEdits;
