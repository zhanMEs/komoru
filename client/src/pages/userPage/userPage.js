import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../components/User/User.css'
import axios from 'axios'
import User from '../../components/User/User'
import RainbowCard from '../../components/RainbowCard/RainbowCard'




export default function UserPage() {

  // 獲取會員資料
  const [userData, setUserData] = useState({})

  //0623 aki - 若沒有token則跳轉登入頁
  let navigate = useNavigate()
  useEffect(() => {
    if (!localStorage.token) {
      navigate('/login', { replace: true })
    } else {
      axios({
        method: "post",
        url: "http://localhost:5000/member/isLogin",
        data: {
          token: localStorage.token
        }
      }).then((res) => {
        let data = res.data[0];
        setUserData(data) //把值取出來

      }).catch((err) => {
        console.log(err)
      })
    }
  }, [])

  console.log(userData)

  return (
    <>
      <RainbowCard className="border border-danger" />
      <User
        mail={userData.memberMail}
        name={userData.memberName}
        nickName={userData.memberNickName}
        sex={userData.memberGender}
        phone={userData.memberPhone}
        iconPath={userData.memberImgPath}
        registerType={userData.registerType}
      />
    </>
  )
}