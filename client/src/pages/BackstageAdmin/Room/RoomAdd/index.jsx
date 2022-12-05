import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { MdOutlineFileUpload } from "react-icons/md";
import { IoAlertCircleSharp } from "react-icons/io5";
import { HiOutlineRefresh } from "react-icons/hi";
import BackstageLodingModal from "../../../../components/BackstageLoadingModal";

function RoomAdd({ setAddShow, data, hotelData }) {
  /*20220622 YN
   飯店資料初始化*/
  // const [hotelData, setHotelData] = useState([]);

  /*20220622 YN
   房型資料初始化*/
  // const [roomData, setRoomData] = useState([]);

  /*20220622 YN
   新增表單資料初始化*/
  const [addFormData, setAddFormData] = useState({
    employeeId: "1",
    hotelId: "",
    roomType: "",
    liveNum: "",
    roomContent: "",
  });

  /*20220625 YN
   預覽照片狀態初始化*/
  const [imgPreview, setImgPreview] = useState(null);

  /*20220625 YN
   照片不符合規格錯誤狀態初始化*/
  const [error, setError] = useState(false);
  /*20220630 YN
     選擇照片狀態初始化*/
  const [selectedFile, setSelectedFile] = useState(null);

  /*20220710 YN
  當輸入框為""，出現警示狀態初始化 */
  const [alertImg, setAlertImg] = useState(false);

  /*20220707 YN
 資料載入過程初始化*/
  const [loading, setLoading] = useState(false);

  /*20220622 YN
   取得後端飯店資料*/
  // useEffect(() => {
  //   axios
  //     .post(
  //       "http://localhost:5000/hotel/getHotelDataListWithMainImgAndCityName"
  //     )
  //     .then((res) => {
  //       // console.log(res.data.dataList);
  //       setHotelData(res.data.dataList);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  /*20220628 YN
   將飯店資料map成飯店選項*/
  const hotelTitleArr = hotelData.map((hotelTitleData, index) => {
    return (
      <option key={index} value={hotelTitleData.hotelId}>
        {hotelTitleData.hotelTitle}
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
    console.log(newFormData);
  };
  /*20220622 YN
   送出時取得輸入新增表單資料，並傳到後端重整畫面*/
  const addFormSubmitHandle = (event) => {
    event.preventDefault();
    const newContact = {
      hotelId: addFormData.hotelId,
      roomType: addFormData.roomType,
      liveNum: addFormData.liveNum,
      roomContent: addFormData.roomContent,
      employeeId: 1,
    };
    // const newContacts = newContact;

    /*20220628 YN
    使用formData接text(使用for將取得資料陣列化)、file資料，
    打包成formData傳給後端*/
    // for (var index in newContact) {
    // }
    console.log(newContact);
    const formData = new FormData();
    formData.append("roomDataList", JSON.stringify(newContact));
    formData.append("roomImgFile", selectedFile);

    console.log(...formData);
    // setAddFormData(newContacts);
    console.log(selectedFile);
    
    if (
      addFormData.hotelId === "" ||
      addFormData.roomType === "" ||
      addFormData.liveNum === "" ||
      addFormData.roomContent === "" ||
      selectedFile === null
    ) {
      setAlertImg(true);
    } else {
      setAlertImg(false);
      setLoading(true)
      fetch("http://localhost:5000/room/addRoom", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status) {
            setAddShow(false);
            window.location.reload(false);
            alert("新增成功");
          }
          console.log(data);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  };

  /*20220625 YN
  更換照片、預覽照片、限制照片格式*/
  const handleImageChange = (e) => {
    setError(false);
    const selected = e.target.files[0];
    const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];
    if (selected && ALLOWED_TYPES.includes(selected.type)) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setImgPreview(reader.result);
        setSelectedFile(selected);
      };
      reader.readAsDataURL(selected);
    } else {
      setError(true);
    }
  };

  /*20220709 YN
  排除當modal開啟時，scrollbar 消失 sidebar 往右移 */
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => (document.body.style.overflowY = "");
  }, []);

  return (
    <Form className="me-5 ms-5 mt-3 mb-3 row" onSubmit={addFormSubmitHandle}>
      <div
        className="col-6 "
        style={{
          background: imgPreview
            ? `url("${imgPreview}") no-repeat center/cover`
            : "#f4f5f7",
        }}
      >
        {imgPreview && (
          <button
            style={{ border: "none", background: "none" }}
            onClick={() => setImgPreview(null)}
          >
            <HiOutlineRefresh
              size="30px"
              color="#ed8c4e"
              style={{ marginTop: "10px" }}
            />
          </button>
        )}
        <Form.Group
          className="d-flex justify-content-center "
          style={{ paddingTop: "90px" }}
        >
          <div className="d-flex flex-column">
            {!imgPreview && (
              <>
                <label className="btn text-white" htmlFor="fileUpload">
                  <MdOutlineFileUpload size="5em" color="#efa16a" />
                </label>
                <input
                  name="fileUploadName"
                  id="fileUpload"
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
                {selectedFile === null && (
                  <>
                    {alertImg && (
                      <p
                        className="d-flex align-items-center"
                        style={{ color: "red" }}
                      >
                        <IoAlertCircleSharp size="20px" color="red" />
                        請上傳檔案
                      </p>
                      // <p
                      //   className="text-center"
                      //   style={{ fontSize: "18px", color: "red" }}
                      // >

                      // </p>
                    )}
                  </>
                )}

                {error && (
                  <p className="text-center text-danger">不支援此檔案</p>
                )}
              </>
            )}
          </div>
        </Form.Group>
      </div>
      <Form.Group className="col-6">
        <Form.Group>
          <Form.Select
            name="hotelId"
            onChange={addFormChangeHandle}
            className="km-modal-content"
          >
            <option value="" selected>
              請選擇飯店
            </option>
            {hotelTitleArr}
          </Form.Select>
          {addFormData.hotelId === "" && (
            <>
              {alertImg && (
                <p style={{ color: "red" }}>
                  <IoAlertCircleSharp size="20px" color="red" />
                  飯店不可空白
                </p>
              )}
            </>
          )}
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Select
            name="roomType"
            onChange={addFormChangeHandle}
            className="km-modal-content"
          >
            <option value="" selected>
              請選擇房型
            </option>
            <option value="1">單人房</option>
            <option value="0">背包客</option>
          </Form.Select>
        </Form.Group>
        {addFormData.roomType === "" && (
          <>
            {alertImg && (
              <p style={{ color: "red" }}>
                <IoAlertCircleSharp size="20px" color="red" />
                房型不可空白
              </p>
            )}
          </>
        )}
        <Form.Group className="mt-3">
          <Form.Control
            type="text"
            name="liveNum"
            // required="required"
            placeholder="請輸入容納人數"
            onChange={addFormChangeHandle}
            className="km-modal-content"
          />
        </Form.Group>
        {addFormData.liveNum === "" && (
          <>
            {alertImg && (
              <p style={{ color: "red" }}>
                <IoAlertCircleSharp size="20px" color="red" />
                容納人數不可空白
              </p>
            )}
          </>
        )}
        <Form.Group className="mt-3">
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="請輸入介紹"
            name="roomContent"
            onChange={addFormChangeHandle}
            className="km-modal-content"
          />
        </Form.Group>
        {addFormData.roomContent === "" && (
            <>
              {alertImg && (
                <p style={{ color: "red" }}>
                  <IoAlertCircleSharp size="20px" color="red" />
                  介紹不可空白
                </p>
              )}
            </>
          )}
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

export default RoomAdd;
