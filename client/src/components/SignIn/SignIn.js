import React, { useState } from "react"
import axios from 'axios'
import './SignIn.css'
import { useLocation, useNavigate } from "react-router-dom";
import { validEmail, validPhone } from "./Regex";
import { Badge } from 'react-bootstrap'



export default function SignIn(props) {

  const { state: { userMail } = {} } = useLocation();//把前一頁mail值繼續帶下來

  // 驗證表單使用: 故意設『全形空白』的部分，是希望布林值不是false，若有設定字串會顯示於畫面上
  const [emailErr, setEmailErr] = useState(true);
  const [passwdErr, setPasswdErr] = useState(true);
  const [phoneErr, setPhoneErr] = useState(true);
  const [allErr, setAllErr] = useState(true);
  const [validateCheck, setValidateCheck] = useState("");
  const [finish, setFinish] = useState("");

  const validate = () => {

    (!formData.mail || !formData.passwd || !formData.passwdCheck ||
      !formData.forgetPasswordAns || !formData.name || !formData.nickName || !formData.phone) ?
      setAllErr("各欄位不可空白") : setAllErr("");

    !validEmail.test(formData.mail) ? setEmailErr("email格式錯誤，請再次輸入") : setEmailErr("");

    (formData.passwd !== formData.passwdCheck) ? setPasswdErr("密碼與確認密碼不同，請再次輸入") : setPasswdErr("");
    !validPhone.test(formData.phone) ? setPhoneErr("手機格式錯誤，請再次輸入") : setPhoneErr("");
    //console.log(allErr, emailErr, passwdErr, phoneErr)

    if (!allErr && !emailErr && !passwdErr && !phoneErr) {
      setValidateCheck("可提交嚕") //因非同步因素，需要點擊兩下才能送出註冊資料 
    }

  }

  // 抓取表單資料使用 & 設立初始值
  const [formData, setFormData] = useState(
    {
      mail: userMail,
      passwd: "",
      passwdCheck: "",
      forgetPasswordAns: "",
      name: "",
      nickName: "",
      sex: "1",
      phone: "",
      registerType:"0"
    }
  )

  // 追蹤表單輸入值使用
  function inputHandler(e) {
    const { name, value } = e.target
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }))
  }
  console.log(formData)


  // 驗證ＯＫ後，提交後觸發
  function submitHandler(e) {
    e.preventDefault()
    axios({
      method: 'POST',
      url: 'http://localhost:5000/member/register',
      data: {
        mail: formData.mail,
        passwd: formData.passwd,
        forgetPasswordAns: formData.forgetPasswordAns,
        name: formData.name,
        nickName: formData.nickName,
        sex: formData.sex,
        phone: formData.phone,
        memberImgPath:"",
        registerType: "0"
      }
    })
      .then((res) => {
        console.log(res)
        setFinish(true)
      })
      .catch((err) => {
        console.log(err)
      });


  }

  // 會員成功建檔案於資料庫後，跳轉到首頁的函式 
  let navigate = useNavigate()
  const finishThenBackHome = () => navigate('/');



  return (
    <ul className="signIn">
      <h2 className="signIn--title">建立帳戶</h2>
      <li className="signIn--item">
        {emailErr && <Badge bg="warning" text="dark">{emailErr}</Badge>}

        <input className="signIn--input--XL"
          name="mail" id="mail" type="email"
          value={formData.mail}
          onChange={inputHandler}
          placeholder="請輸入 E-mail" />
      </li>

      <li className="signIn--item">
        <input className="signIn--input--XL"
          name="passwd" id="passwd" type="password" placeholder="請輸入密碼"
          value={formData.passwd}
          onChange={inputHandler} />
      </li>
      <li className="signIn--item">
        {passwdErr && <Badge bg="warning" text="dark">{passwdErr}</Badge>}
        <input className="signIn--input--XL" placeholder="再次輸入密碼"
          name="passwdCheck" id="passwdCheck" type="password"
          value={formData.passwdCheck}
          onChange={inputHandler} />
      </li>

      <li className="signIn--item">
        <input className="signIn--input--XL"
          name="forgetPasswordAns" id="forgetPasswordAns" placeholder="請輸入密碼提示"
          value={formData.forgetPasswordAns}
          onChange={inputHandler} />
      </li>
      <br />
      <br />
      <li className="signIn--item">
        <input className="signIn--input--M mr-16"
          name="name" id="name"
          value={formData.name}
          onChange={inputHandler}
          placeholder="請輸入姓名" />

        <input className="signIn--input--M"
          name="nickName" id="nickName"
          value={formData.nickName}
          onChange={inputHandler}
          placeholder="請輸入暱稱" />
      </li>
      <li className="signIn--item">
        <select className="signIn--input--M"
          name="sex" id="sex"
          value={formData.sex}
          onChange={inputHandler}>
          <option value="1">男性</option>
          <option value="0">女性</option>
        </select>
      </li>
      <li className="signIn--item">
        {phoneErr && <Badge bg="warning" text="dark">{phoneErr}</Badge>}
        <input className="signIn--input--XL"
          name="phone" id="phone"
          value={formData.phone}
          onChange={inputHandler}
          placeholder="請輸入手機號碼" />
      </li>
      {!validateCheck && <button onClick={validate} className="signIn--submit">點擊兩下送出</button>}

      {validateCheck && <button onClick={!finish ? submitHandler : finishThenBackHome}
        className={!finish ? "signIn--submitFin" : "signIn--submit"} > {!finish ? "請再次確認後送出" : "註冊成功！點擊返回首頁"}
      </button>}
      <div className="signIn--item mt-2">
        {allErr && <Badge bg="danger" >{allErr}</Badge>}
      </div>
    </ul>
  )

}
