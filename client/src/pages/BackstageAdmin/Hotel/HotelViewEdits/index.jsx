import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { BsFillArrowUpSquareFill } from "react-icons/bs";
import { IoAlertCircleSharp } from "react-icons/io5";
import { HiOutlineRefresh } from "react-icons/hi";
import { MdOutlineFileUpload } from "react-icons/md";
import BackstageLoding from "../../../../components/BackstageLoading";
import BackstageLodingModal from "../../../../components/BackstageLoadingModal";

function HotelViewEdits({ setEditShow, editData, data }) {
  /*20220624 YN
  修改資料初始化*/
  const [editModalData, setEditModalData] = useState({
    hotelTitle: "",
    cityId: "",
    hotelAddr: "",
    hotelTel: "",
    hotelDesc: "",
    hotelContent: "",
    employeeId: "1",
    roomImgPath: "",
  });

  /*20220624 YN
  修改照片資料初始化*/
  const [mainImageData, setMainImageData] = useState();
  const [firstImageData, setFirstImageData] = useState();
  const [secondImageData, setSecondImageData] = useState();
  const [thirdImageData, setThirdImageData] = useState();

  /*20220622 YN
   新增表單資料初始化*/
  // const [addFormData, setAddFormData] = useState({
  //   employeeId: "1",
  //   hotelTitle: "",
  //   hotelAddr: "",
  //   hotelTel: "",
  //   hotelDesc: "",
  // });

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

  /*20220624 YN
   可否修改狀態初始化*/
  const [isDisabled, setIsDisabled] = useState(true);

  /*20220703 YN
  縣市狀態初始化*/
  // const [cityData, setCityData] = useState();

  /*20220701 YN
    修改圖片狀態初始化*/
  const [editImage, setEditImage] = useState(false);

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
  const [saveloading, setsaveloading] = useState(false);

/*20220714 YN
  更換照片按鈕切換初始化*/
  const [imgButton, setImgButton] = useState(false);



  /*20220701 YN
     取得後端預設飯店資料*/
  useEffect(() => {
    // let hotelIdValue = { "hotelId": editData.hotelId}
    // console.log(editData)
    fetch("http://localhost:5000/hotel/getHotelDataWithImgByHotelId", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(editData),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(true);
        setEditModalData(data.dataList.hotelData[0]);
        console.log(data.dataList.hotelData[0])
        //20220703 判斷主圖
        let mainResult = data.dataList.hotelImgDataList;
        let mainArr = mainResult.filter((result) => {
          return result.hotelImgIsMain === "0";
        });
        //20220703 判斷副圖
        let otherResult = data.dataList.hotelImgDataList;
        let otherArr = otherResult.filter((result) => {
          return result.hotelImgIsMain === "1";
        });

        setMainImageData(mainArr[0].hotelImgPath);
        setFirstImageData(
          typeof otherArr[0].hotelImgPath === "undefined"
            ? ""
            : otherArr[0].hotelImgPath
        );
        setSecondImageData(
          typeof otherArr[1].hotelImgPath === "undefined"
            ? ""
            : otherArr[1].hotelImgPath
        );
        setThirdImageData(
          typeof otherArr[2].hotelImgPath === "undefined"
            ? ""
            : otherArr[2].hotelImgPath
        );
        console.log(data.dataList);
        // console.log(data.dataList.hotelImgDataList[0].hotelImgPath);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  // console.log(editData)
  /*20220701 YN
     取得後端預設飯店資料*/
  // useEffect(() => {
  //   axios
  //     .post("http://localhost:5000/city/getCityDataList")
  //     .then((res) => {
  //       console.log(res.data.dataList);
  //       setCityData(res.data.dataList);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);
  // console.log(cityData);
  // /*20220701 YN
  //  飯店資料使用map作下拉選項*/
  // const cityArr = cityData.map((cityData, index) => {
  //   return console.log(cityData);
  // });

  /*20220622 YN
   取得輸入新增表單資料*/
  const editFormChangeHandle = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editModalData };
    newFormData[fieldName] = fieldValue;

    setEditModalData(newFormData);
    console.log(newFormData);
  };
  /*20220622 YN
   送出時取得輸入新增表單資料，並傳到後端重整畫面*/
  const editFormSubmitHandle = (event) => {
    event.preventDefault();
    const newContact = {
      hotelId: editModalData.hotelId,
      hotelTitle: editModalData.hotelTitle,
      cityId: editModalData.cityId,
      hotelAddr: editModalData.hotelAddr,
      hotelTel: editModalData.hotelTel,
      hotelDesc: editModalData.hotelDesc,
      hotelContent: editModalData.hotelContent,
      employeeId: "1",
      hotelImgPath: {
        mainHotelImgFile: mainImageData,
        firstHotelImgFile:
          typeof firstImageData === "undefined" ? "" : firstImageData,
        secondHotelImgFile:
          typeof secondImageData === "undefined" ? "" : secondImageData,
        thirdHotelImgFile:
          typeof thirdImageData === "undefined" ? "" : thirdImageData,
      },
    };
    // 20220703 YN 有更換照片傳的變數
    // const editContact = {
    //   hotelTitle: editModalData.hotelTitle,
    //   cityId: editModalData.cityId,
    //   hotelAddr: editModalData.hotelAddr,
    //   hotelTel: editModalData.hotelTel,
    //   hotelDesc: editModalData.hotelDesc,
    //   hotelContent: editModalData.hotelContent,
    //   employeeId: "1",
    //   hotelImgPath: "",
    // };
    console.log(newContact);
    // setAddFormData(newContacts);
    setsaveloading(true);
    if (editImage === true) {
      const formData = new FormData();
      formData.append("hotelDataList", JSON.stringify(newContact));
      formData.append("mainHotelImgFile", selectedPrimaryFile);
      formData.append("firstHotelImgFile", selectedFirstFile);
      formData.append("secondHotelImgFile", selectedSecondFile);
      formData.append("thirdHotelImgFile", selectedThirdFile);
      if (selectedPrimaryFile === null) {
        setAlertImg(true);
        // alert("請選擇主要照片");
      } else {
        console.log(...formData);
        setAlertImg(false);
        setLoading(true);
        fetch("http://localhost:5000/hotel/updateHotelByHotelId", {
          method: "POST",
          body: formData,
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
    } else {
      const formData = new FormData();
      formData.append("hotelDataList", JSON.stringify(newContact));
      formData.append("hotelImgFile", []);
      console.log(...formData);
      setLoading(true);
      fetch("http://localhost:5000/hotel/updateHotelByHotelId", {
        method: "POST",
        body: formData,
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

  /*20220701 YN
  修改狀態改變*/
  const disabledClickHandle = () => {
    // setEditImage(true);
    setIsDisabled(!isDisabled);
    setEditButton(true);
  };

  /*20220709 YN
  排除當modal開啟時，scrollbar 消失 sidebar 往右移 */
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => (document.body.style.overflowY = "");
  }, []);


  /*20220714 YN
更換照片按鈕功能*/
  const showChangeImg = () => {
    setImgButton(true);
    setEditImage(true)
  }

  /*20220714 YN
  原始照片按鈕功能*/
  const showOriginalImg = () => {
    setImgButton(false);
    setEditImage(false)
  }

  return (
    <>
      {loading ? (
        <Form className="row me-5 ms-5 mb-3 mt-3" onSubmit={editFormSubmitHandle}>
          {!editImage && (
            <Form.Group className="col-6 d-flex g-0 ">
              <div className="container d-flex flex-column">
                <div
                  className="col-12"
                  style={{
                    height: "70%",
                    background: `url("http://localhost:5000${mainImageData}") no-repeat center/cover`,
                  }}
                ></div>
                <div className="mt-2 col-md-12 d-flex">
                  <div className="col-md-4" style={{ paddingRight: "5px" }}>
                    <div
                      style={{
                        height: "150px",
                        background: `url("http://localhost:5000${firstImageData}") no-repeat center/cover`,
                      }}
                    ></div>
                  </div>
                  <div
                    className="col-md-4"
                    style={{ paddingRight: "2.5px", paddingLeft: "2.5px" }}
                  >
                    <div
                      style={{
                        height: "150px",
                        background: `url("http://localhost:5000${secondImageData}") no-repeat center/cover`,
                      }}
                    ></div>
                  </div>
                  <div className="col-md-4" style={{ paddingLeft: "5px" }}>
                    <div
                      style={{
                        height: "150px",
                        background: `url("http://localhost:5000${thirdImageData}") no-repeat center/cover`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </Form.Group>
          )}

          {editImage && (
            <Form.Group className="col-6 d-flex g-0 ">
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
                                  請上傳主要圖片
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
                              {/* {selectedFirstFile === null && (
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
                              )} */}
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
                                  {/* {alertImg && (
                                    <p
                                      className="d-flex align-items-center"
                                      style={{ color: "red" }}
                                    >
                                      <IoAlertCircleSharp size="20px" color="red" />
                                      請上傳檔案
                                    </p>
                                  )} */}
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
                              {/* {selectedThirdFile === null && (
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
                              )} */}
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
          )}

          <Form.Group className="col-6 km-modal-content">
            <Form.Group>
              <Form.Label>飯店名稱</Form.Label>
              <Form.Control
                className="km-modal-content"
                type="text"
                name="hotelTitle"
                // required="required"
                defaultValue={editModalData.hotelTitle}
                onChange={editFormChangeHandle}
                disabled={isDisabled}
              />
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>區域</Form.Label>
              <Form.Select
                name="cityId"
                disabled={isDisabled}
                onChange={editFormChangeHandle}
                className="km-modal-content"
              >
                <option disabled>請選擇區域</option>
                <option value="1" selected={editModalData.cityId === 1 ? true : ""}>北部</option>
                <option value="2" selected={editModalData.cityId === 2 ? true : ""}>中部</option>
                <option value="3" selected={editModalData.cityId === 3 ? true : ""}>南部</option>
                <option value="4" selected={editModalData.cityId === 4 ? true : ""}>東部</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>地址</Form.Label>
              <Form.Control
                className="km-modal-content"
                type="text"
                name="hotelAddr"
                // required="required"
                defaultValue={editModalData.hotelAddr}
                onChange={editFormChangeHandle}
                disabled={isDisabled}
              />
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>聯絡電話</Form.Label>
              <Form.Control
                type="text"
                name="hotelTel"
                // required="required"
                className="km-modal-content"
                defaultValue={editModalData.hotelTel}
                onChange={editFormChangeHandle}
                disabled={isDisabled}
              />
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>備註</Form.Label>
              <Form.Control
                className="km-modal-content"
                type="text"
                name="hotelDesc"
                // required="required"
                placeholder="備註"
                defaultValue={editModalData.hotelDesc}
                onChange={editFormChangeHandle}
                disabled={isDisabled}
              />
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>飯店簡介</Form.Label>
              <Form.Control
                className="km-modal-content"
                as="textarea"
                rows={3}
                defaultValue={editModalData.hotelContent}
                name="hotelContent"
                onChange={editFormChangeHandle}
                disabled={isDisabled}
              />
            </Form.Group>
          </Form.Group>
          <div className="mt-3 mb-4 d-flex justify-content-end">
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
              !imgButton &&
              <a
                className="btn me-2 km-img-button-modal km-modal-footer"
                onClick={showChangeImg}
              >
                更換照片
              </a>
            ) : (
              <></>
            )}

            {editButton && imgButton ? (
              <a
                className="btn me-2 km-img-button-modal km-modal-footer"
                onClick={showOriginalImg}
              >
                原始照片
              </a>
            ) : (
              <></>
            )}

            {editButton ? (
              <button
                className="btn me-1 km-img-button-modal km-modal-footer"
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

export default HotelViewEdits;
