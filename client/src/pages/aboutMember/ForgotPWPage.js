import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import ForgotPW from '../../components/ForgotPW/ForgotPW';
import '../../components/ForgotPW/ForgotPW.css'

export default function ForgotPWPage() {
  return (
    <div className='forgotPW--wrap'>
      <Navbar />
      <div className='container'>
        <ForgotPW />
        <div className="forgotPW--Confirm">
      <p className="Confirm--text">登入或註冊帳戶表示您同意本公司的條件和扣款以及隱私權說明</p>
    </div>
      </div>
    </div>
  )
}