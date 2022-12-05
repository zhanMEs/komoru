import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../components/User/User.css'
import Coupon from '../../components/User/Coupon/Coupon'
import axios from 'axios'


export default function CouponPage() {

  // 0717 aki-取得用戶id父傳子
  const[idData,setIdData]=useState('')

  //0623 aki - 若沒有token則跳轉登入頁
  let navigate = useNavigate()
  useEffect(() => {
    if (!localStorage.token) {
      navigate('/login', { replace: true })
    }
  })

  //0714 aki-取得用戶資料
  useEffect(() => {
    axios({
      method: "post",
      url: "http://localhost:5000/member/isLogin",
      data: {
        token: localStorage.token,
      },
    })
      .then((res) => {
        //有登入的話，回傳「會員資訊」在res.data[0] ｜ 沒登入則回傳message
        let userData = res.data[0];
        console.log(userData);
        setIdData(userData.memberId)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])
  


return (
  <div className="Feedback--card">
    <div className="card--title">
      <h3>優惠票卷查看</h3>
      <p>註冊即送 200NTD 優惠票卷！關注KOMORU官方平台，領取各式超值的優惠票卷。</p>
    </div>
    <img className="img-fluid mb-4 w-100" src="../komoru_member.png" alt="profile-banner" />
    <Coupon
      memberId={idData}/>
  </div>
)
}