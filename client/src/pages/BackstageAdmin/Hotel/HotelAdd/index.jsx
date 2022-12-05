import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { BsFillArrowUpSquareFill } from "react-icons/bs";
import { IoAlertCircleSharp } from "react-icons/io5";
import { HiOutlineRefresh } from "react-icons/hi";
import { MdOutlineFileUpload } from "react-icons/md";
import BackstageLodingModal from "../../../../components/BackstageLoadingModal";

function HotelAdd({ setAddShow, data }) {
  /*20220622 YN
     飯店資料初始化*/
  const [hotelData, setHotelData] = useState([]);

  /*20220622 YN
     新增表單資料初始化*/
  const [addFormData, setAddFormData] = useState({
    employeeId: "1",
    hotelTitle: "",
    hotelAddr: "",
    hotelTel: "",
    hotelDesc: "",
    hotelContent: "",
    cityId: "",
  });

  /*20220625 YN
     預覽照片狀態初始化*/
  const [primaryImgPreview, setPrimaryImgPreview] = useState(null);
  const [firstImgPreview, setFirstImgPreview] = useState(null);
  const [secondImgPreview, setSecondImgPreview] = useState(null);
  const [thirdImgPreview, setThirdImgPreview] = useState(null);

  /*20220625 YN
     照片不符合規格錯誤狀態初始化*/
  const [primaryError, setPrimaryError] = useState(false);
  const [firstError, setFirstError] = useState(false);
  const [secondError, setSecondError] = useState(false);
  const [thirdError, setThirdError] = useState(false);

  /*20220630 YN
     選擇照片狀態初始化*/
  const [selectedPrimaryFile, setSelectedPrimaryFile] = useState(null);
  const [selectedFirstFile, setSelectedFirstFile] = useState(null);
  const [selectedSecondFile, setSelectedSecondFile] = useState(null);
  const [selectedThirdFile, setSelectedThirdFile] = useState(null);

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
  //       console.log(res.data.dataList);
  //       setHotelData(res.data.dataList);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  // async function fetchFunction() {
  //   try{
  //   const response = await fetch(`http://localhost:5000/hotel/getHotelDataListWithMainImgAndCityName`);
  //   const json = await response.json();
  //   }
  //   catch(err) {
  //     throw err;
  //     console.log(err);
  //   }
  // }
  // useEffect(() => {
  //   const getData = async () => {
  //     const res = await axios
  //       .post(
  //         "http://localhost:5000/hotel/getHotelDataListWithMainImgAndCityName"
  //       )
  //       .then((res) => {
  //         console.log(res.data.dataList);
  //         setHotelData(res.data.dataList);
  //       })
  //       .catch((err) => console.log(err));
  //   };
  //   getData();
  // }, []);

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
      employeeId: "1",
      hotelTitle: addFormData.hotelTitle,
      hotelAddr: addFormData.hotelAddr,
      hotelTel: addFormData.hotelTel,
      hotelDesc: addFormData.hotelDesc,
      hotelContent: addFormData.hotelContent,
      cityId: addFormData.cityId,
    };
    const formData = new FormData();
    formData.append("hotelDataList", JSON.stringify(newContact));
    formData.append("mainHotelImgFile", selectedPrimaryFile);
    formData.append("firstHotelImgFile", selectedFirstFile);
    formData.append("secondHotelImgFile", selectedSecondFile);
    formData.append("thirdHotelImgFile", selectedThirdFile);
    // if (selectedPrimaryFile === null) {
    //   alert("請選擇照片");
    // } else if (selectedFirstaryFile === null) {
    //   alert("請選擇照片");
    // } else if (selectedSecondFile === null) {
    //   alert("請選擇照片");
    // } else if (selectedThirdFile === null) {
    //   alert("請選擇照片");
    // } else {
    // }
    console.log(...formData);
    if (
      addFormData.hotelTitle === "" ||
      addFormData.cityId === "" ||
      addFormData.hotelAddr === "" ||
      addFormData.hotelTel === "" ||
      addFormData.hotelDesc === "" ||
      addFormData.hotelContent === "" ||
      selectedPrimaryFile === null ||
      selectedFirstFile === null ||
      selectedSecondFile === null ||
      selectedThirdFile === null
    ) {
      setAlertImg(true);
    } else {
      setAlertImg(false);
      setLoading(true);
      fetch("http://localhost:5000/hotel/addHotel", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status) {
            alert("新增成功");
            setAddShow(false);
            window.location.reload(false);
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
  const primaryImageChangeHandle = (e) => {
    setPrimaryError(false);
    const selected = e.target.files[0];
    const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];
    if (selected && ALLOWED_TYPES.includes(selected.type)) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setPrimaryImgPreview(reader.result);
        setSelectedPrimaryFile(selected);
        console.log(selected);
      };
      reader.readAsDataURL(selected);
    } else {
      setPrimaryError(true);
    }
  };
  const firstImageChangeHandle = (e) => {
    setFirstError(false);
    const selected = e.target.files[0];
    const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];
    if (selected && ALLOWED_TYPES.includes(selected.type)) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setFirstImgPreview(reader.result);
        setSelectedFirstFile(selected);
        console.log(selected);
      };
      reader.readAsDataURL(selected);
    } else {
      setFirstError(true);
    }
  };
  const secondImageChangeHandle = (e) => {
    setSecondError(false);
    const selected = e.target.files[0];
    const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];
    if (selected && ALLOWED_TYPES.includes(selected.type)) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setSecondImgPreview(reader.result);
        setSelectedSecondFile(selected);
        console.log(selected);
      };
      reader.readAsDataURL(selected);
    } else {
      setSecondError(true);
    }
  };
  const thirdImageChangeHandle = (e) => {
    setThirdError(false);
    const selected = e.target.files[0];
    const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];
    if (selected && ALLOWED_TYPES.includes(selected.type)) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setThirdImgPreview(reader.result);
        setSelectedThirdFile(selected);
        console.log(selected);
      };
      reader.readAsDataURL(selected);
    } else {
      setThirdError(true);
    }
  };

  /*20220709 YN
  排除當modal開啟時，scrollbar 消失 sidebar 往右移 */
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => (document.body.style.overflowY = "");
  }, []);

  return (
    <>
      <Form className="row me-5 ms-5 mb-3 mt-3" onSubmit={addFormSubmitHandle}>
        <Form.Group className="col-6 d-flex g-0">
          <div className="container d-flex flex-column">
            <div
              className="col-12"
              style={{
                height: "70%",
                background: primaryImgPreview
                  ? `url("${primaryImgPreview}") no-repeat center/cover`
                  : "#f4f5f7",
              }}
            >
              {primaryImgPreview && (
                <button
                  style={{ border: "none", background: "none" }}
                  onClick={() => setPrimaryImgPreview(null)}
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
                style={{ paddingTop: "100px" }}
              >
                <div className="d-flex flex-column">
                  {!primaryImgPreview && (
                    <>
                      <label
                        className="btn text-white "
                        htmlFor="primaryfileUpload"
                      >
                        <MdOutlineFileUpload size="5em" color="#efa16a" />
                      </label>
                      <input
                        id="primaryfileUpload"
                        type="file"
                        style={{ display: "none" }}
                        onChange={primaryImageChangeHandle}
                      />
                      {selectedPrimaryFile === null && (
                        <>
                          {alertImg && (
                            <p
                              className="d-flex align-items-center"
                              style={{ color: "red" }}
                            >
                              <IoAlertCircleSharp size="20px" color="red" />
                              請上傳檔案
                            </p>
                          )}
                        </>
                      )}
                    </>
                  )}
                  {primaryError && (
                    <p className="text-center text-danger">不支援此檔案</p>
                  )}
                </div>
              </Form.Group>
            </div>

            <div className="mt-2 col-md-12 d-flex">
              <div className="col-md-4" style={{ paddingRight: "5px" }}>
                <div
                  style={{
                    height: "130px",
                    background: firstImgPreview
                      ? `url("${firstImgPreview}") no-repeat center/cover`
                      : "#f4f5f7",
                  }}
                >
                  {firstImgPreview && (
                    <button
                      style={{ border: "none", background: "none" }}
                      onClick={() => setFirstImgPreview(null)}
                    >
                      <HiOutlineRefresh
                        size="20px"
                        color="#ed8c4e"
                        style={{ marginTop: "10px" }}
                      />
                    </button>
                  )}
                  <Form.Group
                    className="d-flex justify-content-center "
                    style={{ paddingTop: "35px" }}
                  >
                    <div className="d-flex flex-column">
                      {!firstImgPreview && (
                        <>
                          <label
                            className="btn text-white "
                            htmlFor="firstFileUpload"
                          >
                            <MdOutlineFileUpload size="2em" color="#efa16a" />
                          </label>
                          <input
                            id="firstFileUpload"
                            type="file"
                            style={{ display: "none" }}
                            onChange={firstImageChangeHandle}
                          />
                          {selectedFirstFile === null && (
                            <>
                              {alertImg && (
                                <p
                                  className="d-flex align-items-center"
                                  style={{ color: "red" }}
                                >
                                  <IoAlertCircleSharp size="20px" color="red" />
                                  請上傳檔案
                                </p>
                              )}
                            </>
                          )}
                        </>
                      )}
                      {firstError && (
                        <p className="text-center text-danger">不支援此檔案</p>
                      )}
                    </div>
                  </Form.Group>
                </div>
              </div>

              <div
                className="col-md-4"
                style={{ paddingRight: "2.5px", paddingLeft: "2.5px" }}
              >
                <div
                  style={{
                    height: "130px",
                    background: secondImgPreview
                      ? `url("${secondImgPreview}") no-repeat center/cover`
                      : "#f4f5f7",
                  }}
                >
                  {secondImgPreview && (
                    <button
                      style={{ border: "none", background: "none" }}
                      onClick={() => setSecondImgPreview(null)}
                    >
                      <HiOutlineRefresh
                        size="20px"
                        color="#ed8c4e"
                        style={{ marginTop: "10px" }}
                      />
                    </button>
                  )}
                  <Form.Group
                    className="d-flex justify-content-center "
                    style={{ paddingTop: "35px" }}
                  >
                    <div className="d-flex flex-column">
                      {!secondImgPreview && (
                        <>
                          <label
                            className="btn text-white "
                            htmlFor="secondfileUpload"
                          >
                            <MdOutlineFileUpload size="2em" color="#efa16a" />
                          </label>
                          <input
                            id="secondfileUpload"
                            type="file"
                            style={{ display: "none" }}
                            onChange={secondImageChangeHandle}
                          />
                          {selectedSecondFile === null && (
                            <>
                              {alertImg && (
                                <p
                                  className="d-flex align-items-center"
                                  style={{ color: "red" }}
                                >
                                  <IoAlertCircleSharp size="20px" color="red" />
                                  請上傳檔案
                                </p>
                              )}
                            </>
                          )}
                        </>
                      )}
                      {secondError && (
                        <p className="text-center text-danger">不支援此檔案</p>
                      )}
                    </div>
                  </Form.Group>
                </div>
              </div>

              <div className="col-md-4" style={{ paddingLeft: "5px" }}>
                <div
                  style={{
                    height: "130px",
                    background: thirdImgPreview
                      ? `url("${thirdImgPreview}") no-repeat center/cover`
                      : "#f4f5f7",
                  }}
                >
                  {thirdImgPreview && (
                    <button
                      style={{ border: "none", background: "none" }}
                      onClick={() => setThirdImgPreview(null)}
                    >
                      <HiOutlineRefresh
                        size="20px"
                        color="#ed8c4e"
                        style={{ marginTop: "10px" }}
                      />
                    </button>
                  )}

                  <Form.Group
                    className="d-flex justify-content-center "
                    style={{ paddingTop: "35px" }}
                  >
                    <div className="d-flex flex-column">
                      {!thirdImgPreview && (
                        <>
                          <label
                            className="btn text-white "
                            htmlFor="fileUpload"
                          >
                            <MdOutlineFileUpload size="2em" color="#efa16a" />
                          </label>
                          <input
                            id="fileUpload"
                            type="file"
                            style={{ display: "none" }}
                            onChange={thirdImageChangeHandle}
                          />
                          {selectedThirdFile === null && (
                            <>
                              {alertImg && (
                                <p
                                  className="d-flex align-items-center"
                                  style={{ color: "red" }}
                                >
                                  <IoAlertCircleSharp size="20px" color="red" />
                                  請上傳檔案
                                </p>
                              )}
                            </>
                          )}
                        </>
                      )}
                      {thirdError && (
                        <p className="text-center text-danger">不支援此檔案</p>
                      )}
                    </div>
                  </Form.Group>
                </div>
              </div>
            </div>
          </div>
        </Form.Group>
        <Form.Group className="col-6">
          <Form.Group>
            <Form.Control
              type="text"
              name="hotelTitle"
              // required="required"
              placeholder="請輸入飯店名稱"
              className="km-modal-content"
              onChange={addFormChangeHandle}
            />
          </Form.Group>
          {addFormData.hotelTitle === "" && (
            <>
              {alertImg && (
                <div
                  className="d-flex"
                  style={{ color: "red", marginTop: "5px" }}
                >
                  <IoAlertCircleSharp
                    size="20px"
                    color="red"
                    style={{ marginRight: "5px" }}
                  />
                  <p>飯店不可空白</p>
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
              <option defaultValue>請選擇區域</option>
              <option value="1">北部</option>
              <option value="2">中部</option>
              <option value="3">南部</option>
              <option value="4">東部</option>
            </Form.Select>
          </Form.Group>
          {addFormData.cityId === "" && (
            <>
              {alertImg && (
                <div
                  className="d-flex"
                  style={{ color: "red", marginTop: "5px" }}
                >
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
              name="hotelAddr"
              // required="required"
              placeholder="請輸入地址"
              onChange={addFormChangeHandle}
              className="km-modal-content"
            />
          </Form.Group>
          {addFormData.hotelAddr === "" && (
            <>
              {alertImg && (
                <div
                  className="d-flex"
                  style={{ color: "red", marginTop: "5px" }}
                >
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
              name="hotelTel"
              // required="required"
              placeholder="請輸入聯絡電話"
              onChange={addFormChangeHandle}
              className="km-modal-content"
            />
          </Form.Group>
          {addFormData.hotelTel === "" && (
            <>
              {alertImg && (
                <div
                  className="d-flex"
                  style={{ color: "red", marginTop: "5px" }}
                >
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
              type="text"
              name="hotelDesc"
              // required="required"
              placeholder="備註"
              onChange={addFormChangeHandle}
              className="km-modal-content"
            />
          </Form.Group>
          {addFormData.hotelDesc === "" && (
            <>
              {alertImg && (
                <div
                  className="d-flex"
                  style={{ color: "red", marginTop: "5px" }}
                >
                  <IoAlertCircleSharp
                    size="20px"
                    color="red"
                    style={{ marginRight: "5px" }}
                  />
                  <p>備註不可空白</p>
                </div>
              )}
            </>
          )}
          <Form.Group className="mt-3">
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="請輸入飯店介紹"
              name="hotelContent"
              onChange={addFormChangeHandle}
              className="km-modal-content"
            />
          </Form.Group>
          {addFormData.hotelContent === "" && (
            <>
              {alertImg && (
                <div
                  className="d-flex"
                  style={{ color: "red", marginTop: "5px" }}
                >
                  <IoAlertCircleSharp
                    size="20px"
                    color="red"
                    style={{ marginRight: "5px" }}
                  />
                  <p>飯店介紹不可空白</p>
                </div>
              )}
            </>
          )}
        </Form.Group>
        <div className="d-flex justify-content-end mb-4 mt-3">
          <button
            className="btn   km-add-button-modal km-modal-footer"
            type="submit"
          >
            新增
          </button>
          {loading === true && <BackstageLodingModal/>}
        </div>
      </Form>
    </>
  );
}

export default HotelAdd;
