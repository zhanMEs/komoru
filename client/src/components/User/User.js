import React, { useState, useEffect } from "react"
import { Button, Alert } from "react-bootstrap"
import './User.css'
import axios from 'axios'


export default function User(props) {


  //抓取表單資料使用 & 設立初始值
  const [formData, setFormData] = useState(
    {
      // mail: "",
      // name: "",
      // nickName: "",
      // sex: "",
      // phone: ""
      // registerType:""
    }
  )

  // aki - 頭貼上傳初始化設定
  const [uploadErr, setUploadErr] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  /* 預覽照片狀態初始化 */
  const [imgPreview, setImgPreview] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(null);

  // 跳轉後即刻渲染資料「初始化」
  useEffect(() => {
    setFormData({
      mail: props.mail,
      name: props.name,
      nickName: props.nickName,
      sex: props.sex,
      phone: props.phone,
      iconPath: props.iconPath,
      registerType: props.registerType
    })
  }, [props])

  // 修改介面觸發：個人資料觸發函式
  const [alertData, setAlertData] = useState(false)
  const alertSwitch = () => {
    setAlertData(prevAlertData => !prevAlertData)
  }

  // 追蹤表單輸入值使用
  function inputHandler(e) {
    const { name, value } = e.target
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }))
  }
  console.log(formData)

  // 送出內容：個人資料修改
  function alterProfile(e) {
    e.preventDefault();
    axios({
      method: "POST",
      url: "http://localhost:5000/member/alterProfile",
      data: {
        mail: formData.mail,
        name: formData.name,
        nickName: formData.nickName,
        sex: formData.sex,
        phone: formData.phone
      }
    })
      .then((res) => {
        console.log(res)
        setAlertData(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // aki - 0705 預覽上傳大頭照
  const handleImageChange = (e) => {
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
      setUploadErr(true);
    }
  }

  // aki - 0705 正式上傳頭貼
  const onSubmit = (e) => {
    e.preventDefault();

    if (selectedFile) {
      let param = new FormData()
      param.append("icon", selectedFile)
      param.append("mail", formData.mail)
      // console.log(param.get("icon"))

      let config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      }

      axios.post(
        "http://localhost:5000/member/updateMemberIcon",
        param, config

      ).then((res) => {
        console.log('上傳成功')
        console.log(res)
        setUploadSuccess(true)

      }).catch((err) => {
        console.log(err)

      })
    } else {
      alert('尚未選取圖檔')
    }
  }

  // 0711 aki 頭像路徑判斷設定 (第三方註冊後更變path)
  let imgURL;
  if (formData.registerType === '2') { //LINE註冊
    let linePath = formData.iconPath.indexOf("profile.line"); //確認LINE註冊者的頭像是否有修改過
    imgURL = (linePath === -1) ? `http://localhost:5000${formData.iconPath}` : formData.iconPath;
  } else if (formData.registerType === '0') { //一般註冊
    imgURL = `http://localhost:5000${formData.iconPath}`;
  } else if (formData.registerType === '1'){ //google註冊
    let googlePath = formData.iconPath.indexOf("google"); //確認google註冊者的頭像是否有修改過
    imgURL = (googlePath === -1) ? `http://localhost:5000${formData.iconPath}` : formData.iconPath;
  }



return (
  <>
    <div className="user--card">
      <div className="card--title">
        <h3>會員基本資料</h3>
        <p>完善的會員中心系統，一鍵增修會員資料、隨心所欲更換喜愛頭像，放上最耀眼的自己！</p>
      </div>
      <img className="img-fluid mb-4 w-100" src="../komoru_member.png" alt="profile-banner" />

      {/* 會員頭像區 --------------------------------- */}
      <div className="user--card--inner">
        <div className="user--icon">
          <div
            className="icon--pic"
            style={{
              background: imgPreview
                ? `url("${imgPreview}") no-repeat center/cover`
                : `url("${formData.iconPath ? imgURL : `avatar-pl.png`}") no-repeat center/cover`
            }}

          >

          </div>
          <input
            className="fs-5 mb-1"
            name="iconFileUpload"
            id="iconFileUpload"
            type="file"
            onChange={handleImageChange}
          />
          <p className="errMsg">請上傳png、jpg、jpeg格式</p>

          <Button className="user--btn--L fs-4" onClick={onSubmit}>上傳/修改頭像</Button>

          {
            uploadErr &&
            <Alert variant="danger" onClose={() => setUploadErr(false)} dismissible>
              <h5>上傳格式錯誤，請再試一次</h5>
            </Alert>
          }
          {
            uploadSuccess &&
            <Alert variant="success" onClose={() => setUploadSuccess(false)} dismissible>
              <h5> - 上傳成功 SUCCESS - </h5>
            </Alert>
          }

        </div>

        {/* 會員個人資料區 --------------------------------- */}
        <ul className="user--form pt-3 pb-3">
          <li className="user--item">
            <span className="fs-4"> 帳號　{formData.mail}</span>
          </li>
          <li className="user--item">
            {!alertData && <span className="fs-4">姓名　{formData.name}</span>}
            {alertData && <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={inputHandler}
              placeholder="請輸入姓名"
            />}
          </li>
          <li className="user--item">
            {!alertData && <span className="fs-4">暱稱　{formData.nickName}</span>}
            {alertData && <input
              type="text"
              name="nickName"
              id="nickName"
              value={formData.nickName}
              onChange={inputHandler}
              placeholder="請輸入暱稱"
            />}
          </li>
          <li className="user--item">
            {!alertData &&
              <span className="fs-4">
                性別　{formData.sex === '1' ? `男性` :
                  formData.sex === '0' ? `女性` : <span className="text-muted">尚未設定</span>}
              </span>}
            {alertData && <select
              name="sex"
              id="sex"
              value={formData.sex}
              onChange={inputHandler}
            >
              <option value="1">男性</option>
              <option value="0">女性</option>
            </select>}
          </li>
          <li className="user--item">
            {!alertData &&
              <span className="fs-4">
                手機　{formData.phone ? formData.phone : <span className="text-muted">尚未設定</span>}
              </span>}
            {alertData && <input
              type="text"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={inputHandler}
              placeholder="請輸入手機號碼"
            />}
          </li>
        </ul>
        <div className="user--btnBar">

          {!alertData &&
            <Button
              className="user--btn--M fs-4"
              onClick={alertSwitch}
            >修改
            </Button>
          }
          {alertData &&
            <Button
              className="user--btn--M fs-4"
              onClick={alterProfile}
            >儲存
            </Button>
          }
        </div>

      </div>
    </div>

  </>
)

}