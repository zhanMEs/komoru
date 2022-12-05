import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../components/User/User.css'
import Feedback from '../../components/User/Feedback'
import axios from 'axios'
import { Button } from 'react-bootstrap'
import BookingLoading from '../../components/BookingLoading/BookingLoading'


export default function FeedbackPage() {

  const [feedbackData, setFeedbackData] = useState([])
  const [isOrder, setIsOrder] = useState(false)
  // 初始化loading狀態
  const [loading, setLoading] = useState(false)

  //0623 aki - 若沒有token則跳轉登入頁
  let navigate = useNavigate()
  useEffect(() => {
    if (!localStorage.token) {
      navigate('/login', { replace: true })
    }
  })

  //  0628 aki 抓取該會員的訂單記錄(含feedback)
  useEffect(() => {
    axios({
      method: "post",
      url: "http://localhost:5000/feeback/getFeebeakByMemberId",
      data: {
        token: localStorage.token
      }
    }).then((res) => {
      setLoading(true)
      if (res.data.length) {
        let postFeedbackData = res.data;
        setFeedbackData(postFeedbackData) //想辦法把值取出來
        setIsOrder(true)
      }
      console.log(res.data)
    }).catch((err) => {
      console.log(err)
    })
  }, [])

  // 0629 aki 接收到的資料設定入元件
  const feebacks = feedbackData.map(item => {
    return (
      <Feedback
        key={item.orderId}
        isOrder={isOrder}
        {...item}
      />
    )
  })

  const toBooking = () => {
    navigate('/bookingHomepage', { replace: true })
  }

  return (
    <>
      {!isOrder && // 若無任何訂單的畫面
        <div className="Feedback--card--none">
          <div className="card--title">
            <h3>訂單活動回饋</h3>
            <p>寫下對於此趟旅程的心得分享給 KOMORU官方平台，讓大家一同改變、成長。</p>
          </div>
          <img className="img-fluid mb-4 w-100" src="../komoru_member.png" alt="profile-banner" />

          { //資料尚未取得之前，顯示Loading
            !loading &&
            <div className='d-flex justify-content-center'>
              <BookingLoading />
            </div>
          }

          {loading &&
            <section>
              <h2>目前沒有可供評論的訂單，現在就出發！</h2>
              <Button className="user--btn--M mt-3 fs-3" onClick={toBooking}>
                前往預定
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-right-short" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z" />
                </svg>
              </Button>
            </section>
          }
        </div>
      }

      {isOrder && // 訂單記錄畫面
        <div className="Feedback--card">
          <div className="card--title">
            <h3>訂單活動回饋</h3>
            <p>寫下對於此趟旅程的心得分享給 KOMORU官方平台，讓大家一同改變、成長。</p>
          </div>
          <img className="img-fluid mb-4 w-100" src="../komoru_member.png" alt="profile-banner" />
          {feebacks}
        </div>
      }

    </>

  )
}