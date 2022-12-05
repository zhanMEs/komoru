import React from "react"
import './ForgotPW.css'

export default function ForgotPW() {
  return (

    <div className="forgotPW">
      <h2 className="forgotPW--title">忘記密碼</h2>
      <h3 className="forgotPW--hint">輸入密碼提示</h3>
      <input className="forgotPW--input--L" name="mail" id="mail" />
      <button className="forgotPW--submit">送出繼續</button>
      <a className="forgotPW--back" href="login">回上一頁</a>
      <br/>
      <br/>
    </div>




  )

}