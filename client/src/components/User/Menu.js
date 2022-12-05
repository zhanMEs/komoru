import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import './User.css'


export default function Menu() {
  
  const [isClicked, setIsClicked]=useState({
    profileLink:true,
    orderLink:false,
    feedbackLink:false,
    couponLink:false,
  })
  
  // 0711 aki - 點擊後的CSS樣式掛載
  const handleClick = (e) =>{
    const {name, value} = e.target;

    setIsClicked(prevIsClicked => ({
      [name]:!value
    }))

    
  }

  return (
    <ul className="user--menu">
      <li>
        <Link to="/user-home"
          value="1"
          name="profileLink" 
          onClick={handleClick} 
          className={isClicked.profileLink? "menu--item--on": "menu--item"}>基本資料
        </Link>
      </li>
      <li>
        <Link to="/user-home/order" 
          value="0"
          name="orderLink" 
          onClick={handleClick} 
          className={isClicked.orderLink? "menu--item--on": "menu--item"}>訂單記錄
        </Link>
      </li>
      <li>
        <Link to="/user-home/feedback" 
          value="0"
          name="feedbackLink"
          onClick={handleClick} 
          className={isClicked.feedbackLink? "menu--item--on": "menu--item"}>活動回饋
        </Link>
      </li>
      <li>
        <Link to="/user-home/coupon" 
          value="0"
          name="couponLink"
          onClick={handleClick} 
          className={isClicked.couponLink? "menu--item--on": "menu--item"}>優惠表單
        </Link>
      </li>
    </ul>
  )
}