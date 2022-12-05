import React, { useState, useEffect } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import axios from "axios";
import "./PartnershipAdd.css";
import { IoAlertCircleSharp } from "react-icons/io5";
import BackstageLoding from "../../../../components/BackstageLoading";
import BackstageLodingModal from "../../../../components/BackstageLoadingModal";
// import {GoAlert} from 'react-icons/go'

function PartnershipAdd({ data, setAddShow }) {
  /*20220622 YN
   城市資料初始化*/
  const [cityData, setCityData] = useState([]);
  /*20220622 YN
   新增表單資料初始化*/
  const [addFormData, setAddFormData] = useState({
    partnershipContactPerson: "",
    partnershipName: "",
    partnershipAddr: "",
    partnershipTel: "",
    employeeId: "1",
    cityId: "",
    partnershipDesc: "",
  });

  /*20220710 YN
  當輸入框為""，出現警示狀態初始化 */
  const [alertImg, setAlertImg] = useState(false);

  /*20220707 YN
 資料載入過程初始化*/
  const [loading, setLoading] = useState(false);

  /*20220622 YN
   取得後端城市資料*/
  useEffect(() => {
    axios
      .post("http://localhost:5000/city/getCityDataList")
      .then((res) => {
        // console.log(res.data.dataList);
        setCityData(res.data.dataList);
      })
      .catch((err) => console.log(err));
  }, []);
  /*20220622 YN
   將城市資料使用map作下拉選項*/
  const cityArr = cityData.map((cityData, index) => {
    return (
      <option key={index} value={cityData.cityId}>
        {cityData.cityName}
      </option>
    );
  });
  /*20220622 YN
   取得輸入新增表單資料*/
  const addFormChangeHandle = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
    // console.log(newFormData);
  };
  /*20220622 YN
   送出時取得輸入新增表單資料，並傳到後端重整畫面*/
  const addFormSubmitHandle = (event) => {
    event.preventDefault();

    const newContact = {
      partnershipContactPerson: addFormData.partnershipContactPerson,
      partnershipName: addFormData.partnershipName,
      cityId: addFormData.cityId,
      partnershipAddr: addFormData.partnershipAddr,
      partnershipTel: addFormData.partnershipTel,
      employeeId: 1,
      partnershipDesc: addFormData.partnershipDesc,
    };

    const newContacts = newContact;

    setAddFormData(newContacts);
    // console.log(newContacts)
    // console.log(addFormData.partnershipName)

    if (
      addFormData.partnershipName === "" ||
      addFormData.partnershipContactPerson === "" ||
      addFormData.cityId === "" ||
      addFormData.partnershipAddr === "" ||
      addFormData.partnershipTel === ""
    ) {
      setAlertImg(true);
    } else {
      setAlertImg(false);
      setLoading(true);
      fetch("http://localhost:5000/partnership/addPartnership", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(newContacts),
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
      // data.push(newContacts);
    }
  };

  /*20220709 YN
  排除當modal開啟時，scrollbar 消失 sidebar 往右移 */
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => (document.body.style.overflowY = "");
  }, []);

  return (
    <Form className="me-5 ms-5 mt-3 mb-3 " onSubmit={addFormSubmitHandle}>
      <Form.Group>
        <Form.Control
          type="text"
          name="partnershipName"
          // required="required"
          placeholder="請輸入商家名稱"
          onChange={addFormChangeHandle}
          className="km-modal-content"
        />
      </Form.Group>
      {addFormData.partnershipName === "" && (
        <>
          {alertImg && (
            <div className="d-flex" style={{ color: "red", marginTop: "5px" }}>
              <IoAlertCircleSharp
                size="20px"
                color="red"
                style={{ marginRight: "5px" }}
              />
              <p>商家名稱不可空白</p>
            </div>
          )}
        </>
      )}
      <Form.Group className="mt-3">
        <Form.Control
          type="text"
          name="partnershipContactPerson"
          // required="required"
          placeholder="請輸入負責人"
          onChange={addFormChangeHandle}
          className="km-modal-content"
        />
      </Form.Group>
      {addFormData.partnershipContactPerson === "" && (
        <>
          {alertImg && (
            <div className="d-flex" style={{ color: "red", marginTop: "5px" }}>
              <IoAlertCircleSharp
                size="20px"
                color="red"
                style={{ marginRight: "5px" }}
              />
              <p>負責人不可空白</p>
            </div>
          )}
        </>
      )}
      <Form.Group className="mt-3">
        <Form.Select
          name="cityId"
          onChange={addFormChangeHandle}
          className="km-modal-content"
        >
          <option selected>請選擇區域</option>
          {cityArr}
        </Form.Select>
      </Form.Group>
      {addFormData.cityId === "" && (
        <>
          {alertImg && (
            <div className="d-flex" style={{ color: "red", marginTop: "5px" }}>
              <IoAlertCircleSharp
                size="20px"
                color="red"
                style={{ marginRight: "5px" }}
              />
              <p>區域不可空白</p>
            </div>
          )}
        </>
      )}
      <Form.Group className="mt-3">
        <Form.Control
          type="text"
          name="partnershipAddr"
          // required="required"
          placeholder="請輸入地址"
          onChange={addFormChangeHandle}
          className="km-modal-content"
        />
      </Form.Group>
      {addFormData.partnershipAddr === "" && (
        <>
          {alertImg && (
            <div className="d-flex" style={{ color: "red", marginTop: "5px" }}>
              <IoAlertCircleSharp
                size="20px"
                color="red"
                style={{ marginRight: "5px" }}
              />
              <p>地址不可空白</p>
            </div>
          )}
        </>
      )}
      <Form.Group className="mt-3">
        <Form.Control
          type="text"
          name="partnershipTel"
          // required="required"
          placeholder="請輸入聯絡電話"
          onChange={addFormChangeHandle}
          className="km-modal-content"
          // oninput="value=value.replace(/[^0-9]/g,'')"
        />
      </Form.Group>
      {addFormData.partnershipTel === "" && (
        <>
          {alertImg && (
            <div className="d-flex" style={{ color: "red", marginTop: "5px" }}>
              <IoAlertCircleSharp
                size="20px"
                color="red"
                style={{ marginRight: "5px" }}
              />
              <p>聯絡電話不可空白</p>
            </div>
          )}
        </>
      )}
      <Form.Group className="mt-3">
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="請輸入備註"
          name="partnershipDesc"
          onChange={addFormChangeHandle}
          className="km-modal-content"
        />
      </Form.Group>
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

export default PartnershipAdd;
