import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import BackstageLoding from "../../../../components/BackstageLoading";
import BackstageLodingModal from "../../../../components/BackstageLoadingModal";

function PartnershipEdit({ setEditShow, editData, data }) {
  /*20220624 YN
  修改資料初始化*/
  const [editModalData, setEditModalData] = useState({
    partnershipId: "",
    cityId: "",
    partnershipName: "",
    partnershipContactPerson: "",
    partnershipAddr: "",
    partnershipTel: "",
    employeeId: "1",
    partnershipDesc: "",
  });
  // const [editFormData, setEditFormData] = useState({
  //   partnershipId: "",
  //   cityId: "",
  //   partnershipName:  `${editModalData.partnershipName}`,
  //   partnershipContactPerson: "",
  //   partnershipAddr: "",
  //   partnershipTel: "",
  //   employeeId: "1",
  // });

  /*20220624 YN
   可否修改狀態初始化*/
  const [isDisabled, setIsDisabled] = useState(true);

  /*20220622 YN
   城市資料初始化*/
  const [cityData, setCityData] = useState([]);

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
    setEditButton(true);
  };

  /*20220624 YN
   取得後端檢視資料*/
  useEffect(() => {
    // console.log(editData)
    // let partnershipIdValue = { 'partnershipId': editData }
    fetch(
      "http://localhost:5000/partnership/getPartnershipDataByPartnershipId",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(editData),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setEditModalData(data.dataList[0]);
        // console.log(data.dataList[0]);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [editData]);

  /*20220622 YN
   取得後端城市資料*/
  useEffect(() => {
    axios
      .post("http://localhost:5000/city/getCityDataList")
      .then((res) => {
        // console.log(res.data.dataList);
        setLoading(true);
        setCityData(res.data.dataList);
      })
      .catch((err) => console.log(err));
  }, []);

  /*20220622 YN
   城市資料用map轉換成選單格式*/
  const cityArr = cityData.map((cityData, index) => {
    return (
      <option
        key={index}
        value={cityData.cityId}
        selected={editModalData.cityId === cityData.cityId ? true : ""}
      >
        {cityData.cityName}
      </option>
    );
  });
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
      cityId: editModalData.cityId,
      partnershipContactPerson: editModalData.partnershipContactPerson,
      partnershipName: editModalData.partnershipName,
      partnershipAddr: editModalData.partnershipAddr,
      partnershipTel: editModalData.partnershipTel,
      partnershipId: editModalData.partnershipId,
      employeeId: 1,
      partnershipDesc: editModalData.partnershipDesc,
    };
    const newContacts = newContact;
    // console.log(newContacts);
    // setEditFormData(newContacts);
    setSaveloading(true);
    fetch(
      "http://localhost:5000/partnership/updatePartnershipByPartnershipId",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(newContacts),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          window.location.reload(false);
          setEditShow(false);
          alert("修改成功");
        } else {
          console.log(data);
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  /*20220709 YN
  排除當modal開啟時，scrollbar 消失 sidebar 往右移 */
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => (document.body.style.overflowY = "");
  }, []);

  console.log(cityArr);
  return (
    <>
      {loading ? (
        <Form
          className="container km-modal-content"
          onSubmit={editFormSubmitHandle}
        >
          <Form.Group>
            <Form.Label>商家名稱</Form.Label>
            <Form.Control
              type="text"
              name="partnershipName"
              // required="required"
              defaultValue={editModalData.partnershipName}
              onChange={editFormChangeHandle}
              disabled={isDisabled}
              className="km-modal-content"
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>負責人</Form.Label>
            <Form.Control
              type="text"
              name="partnershipContactPerson"
              // required="required"
              defaultValue={editModalData.partnershipContactPerson}
              onChange={editFormChangeHandle}
              disabled={isDisabled}
              className="km-modal-content"
            />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>區域</Form.Label>
            <Form.Select
              name="cityId"
              onChange={editFormChangeHandle}
              disabled={isDisabled}
              className="km-modal-content"
            >
              <option disabled>請選擇區域</option>
              {cityArr}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>地址</Form.Label>
            <Form.Control
              type="text"
              name="partnershipAddr"
              // required="required"
              defaultValue={editModalData.partnershipAddr}
              onChange={editFormChangeHandle}
              disabled={isDisabled}
              className="km-modal-content"
            />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>聯絡電話</Form.Label>
            <Form.Control
              type="text"
              name="partnershipTel"
              // required="required"
              defaultValue={editModalData.partnershipTel}
              onChange={editFormChangeHandle}
              disabled={isDisabled}
              className="km-modal-content"
            />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>備註</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              disabled={isDisabled}
              defaultValue={editModalData.partnershipDesc}
              onChange={editFormChangeHandle}
              name="partnershipDesc"
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

export default PartnershipEdit;
