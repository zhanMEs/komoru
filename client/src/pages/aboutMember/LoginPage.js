import { useEffect } from 'react';
import { useNavigate, useHistory } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar';
import Confirm from '../../components/Confirm/Confirm'
import Login from '../../components/Login/Login';
import '../../components/Login/Login.css'


export default function LoginPage() {

  //0712 aki - 若有token則跳轉首頁
  let navigate = useNavigate()
  useEffect(() => {

      if (localStorage.token) {
        navigate('/', { replace: true })
      }
    }, [])

//     if(!localStorage.token){
//       history.push("/")
//   }
// },[localStorage.token,history]);
  



  return (
    <div className='login--wrap'>
      <Navbar />
      <div className='login--container'>
        <Login />
        <Confirm />
      </div>
    </div>
  )
}