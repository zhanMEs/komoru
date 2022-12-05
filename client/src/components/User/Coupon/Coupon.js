import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Coupon.css'
import { Tab, Tabs, Button } from 'react-bootstrap'
import axios from 'axios'
import CanUseCoupon from './CanUseCoupon'
import UsedCoupon from './UsedCoupon'
import BookingLoading from '../../BookingLoading/BookingLoading'

export default function Coupon(props) {

  console.log(props)
  let navigate = useNavigate()


  const [coupon, getCoupon] = useState([])
  const [usedCoupon, getUsedCoupon] = useState([])
  // 初始化loading狀態
  const [loading, setLoading] = useState(false)
  // 0714 aki-註冊送酷碰卷 顯示/消失
  const [singInCoupon, setSingInCoupon] = useState('')

    //0707 aki - 撈取優惠卷 by token
    useEffect(() => {

      axios({
        method: "post",
        url: "http://localhost:5000/coupon/getCouponByMemberId",
        data: {
          token: localStorage.token
        }
      }).then((res) => {
        setLoading(true)
        console.log(res.data.dataList)
        // 未使用（Ｏ可用）
        getCoupon(res.data.dataList.usableCouponlist)

        // 已使用（Ｘ用掉的）
        getUsedCoupon(res.data.dataList.UnusableCouponByMemberId)

      }).catch((err) => {
        console.log(err)
      })

    }, [])

  const coupons = coupon.map((item) => {
    return (
      <CanUseCoupon
        key={item.couponId}
        {...item}
      />
    )
  })

  const usedCoupons = usedCoupon.map((item) => {
    return (
      <UsedCoupon
        key={item.couponId}
        {...item}
      />
    )
  })

  // 0714 aki-確認該會員是否有酷碰券（連線資料庫）
  useEffect(() => {
    // 連線確認是否領過
    axios({
      method: "post",
      url: "http://localhost:5000/couponItem/checkSignIn200coupon",
      data: {
        token: localStorage.token
      }
    }).then((res) => {
      console.log(res);
      if (!res.data.dataList.length) {
        // 發一張給他(顯示領取按鍵)
        setSingInCoupon(true)
      } else {
        console.log('該用戶已領取過註冊送200酷碰卷')
      }
    }).catch((err) => {
      console.log(err)
    })
  }, [singInCoupon])


  //0714 aki-點擊後發送註冊送200元酷碰卷
  const getSingInCoupon = () => {
    // 連線領卷
      axios({
        method:"post",
        url:"http://localhost:5000/coupon/createCoupon",
        data:{
          member_id:props.memberId,
          coupon_id:1, // 0715 aki-酷碰id改1
          count:1
        }
      })
    // 領取後消失
    setSingInCoupon(false)
    alert('已領取【新會員註冊送 200元 COUPON券】!')
    navigate('/user-home', { replace: true })
    
    // window.location.reload("false") //重新渲染頁面

  }

  return (
    <>
      {/* 註冊送兩百酷碰卷領取 */}
      {singInCoupon &&
        <div className="d-grid gap-2 mb-3">
          <Button variant="danger" size="lg" onClick={getSingInCoupon}>
            新會員註冊送 200元 COUPON券【 點擊領取 】
          </Button>
        </div>
      }
      <div className="Coupon--card" >

        { //資料尚未取得之前，顯示Loading
          !loading &&
          <div className='d-flex justify-content-center'>
            <BookingLoading />
          </div>
        }

        {loading &&
          <Tabs fill
            defaultActiveKey="coupon"
            id="coupon-tab"
            className="mb-3 fs-5"
          >
            <Tab eventKey="coupon" title="未使用">
              <section className="coupon--item">
                {coupons}
              </section>
            </Tab>
            <Tab eventKey="coupon-used" title="已使用">
              <section className="coupon--item">
                {usedCoupons}
              </section>
            </Tab>
          </Tabs>
        }

      </div >
    </>
  )
}