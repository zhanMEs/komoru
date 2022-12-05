import { Route, Routes } from 'react-router-dom'
import UserPage from './userPage'
import OrderPage from './OrderPageUserZone'
import FeedbackPage from './FeedbackPage'
import CouponPage from './CouponPage'


export default function UserSubHeader() {


  return (
    <>
      <Routes>
        <Route path="/" element={<UserPage />}></Route>
        <Route path="/order" element={<OrderPage />}></Route>
        <Route path="/feedback" element={<FeedbackPage />}></Route>
        <Route path="/coupon" element={<CouponPage />}></Route>
      </Routes>

    </>
  )
}