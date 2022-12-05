import Navbar from '../../components/Navbar/Navbar'
import Menu from '../../components/User/Menu'
import UserHeader from '../../components/User/UserHeader'
import UserSubHeader from './UserSubHeader'
import '../../components/User/User.css'
import Footer from '../../components/Footer/Footer'

export default function UserHomePage() {





  return (
    <>
      <div className='User--wrap'>
        <Navbar />
        <div className='User--titleBar User--bg--fix' >
          <UserHeader
            title="簡單、多功能的會員中心系統"
            text="KOMORU 協助你輕鬆創管理你的會員資料、瀏覽你的下訂紀錄，探索更多元的自己！"
            backgroundIMG="member_bg.jpeg" />
        </div>

        <div className='User--container'>
          <div className='User'>
            <Menu />
            <UserSubHeader />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )


}