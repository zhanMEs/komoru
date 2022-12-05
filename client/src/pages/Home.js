import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { loginOrNot } from '../App';
import RecipeReviewCard from '../components/Card/Card';
import Example from '../components/Carousel/Carousel';
import QuiltedImageList from '../components/ImageList/ImageList';
import APP from '../components/ScrollToTop/ScrollToTop';
import SimpleHook from '../components/CountUp/CountUp';
import { Link } from "react-router-dom";
import Faq from '../components/Faq/Faq';
// 滑入效果試著放在components
// import Aos from "aos";
// import "aos/dist/aos.css";
// import {useEffect} from 'react';

import "../pages/Home.css"



export default function Home() {

  // useEffect(() => {
  //   Aos.init({ duration: 5000
  //    });
  // }, []);

  return (
    <div className='wrap'>
      <Navbar />
      <div className='Homepic'>
        <Example />
      </div>

      <div className='container-xxl'>
        <div className='row'>
          <div className='col'>
            <button onClick={loginOrNot}></button>

            <div className='about'>
              <h2 style={{ display: 'block', color: '#ED8C4E', textAlign: 'center' }}>關於 KOMORU</h2>
              <br />
              <p className='aboutWords' >ＫＯＭＯＲＵ 為全台最大的複合式訂房平台集結下訂房源、客製活動以及會員中心，為旅者打造前所未有的放假體驗。我們遂將休假與生活結合，創造一個經由住宿來體驗你不曾接觸的活動，期望旅客放假過後能找到新的興趣、甚至改變生活的型態。在 ＫＯＭＯＲＵ 的體驗不僅是休息歇腳等待下次啟程，而是讓你嚐過了一次鮮甜，便期待著下一道菜、下一次的改變。
              </p>
            </div>
            <div >
              <SimpleHook />
              <p className='numberWords'>超過70,000+人次體驗&nbsp;
                &nbsp;
                <btn><Link style={{ textDecoration: 'none' }} to="/bookingHomepage">現在就出發</Link></btn></p>

            </div>

            {/* 合作飯店 */}
            <div className='RoomLine'>
            </div>
            <h2 style={{ color: '#ED8C4E', textAlign: 'left' }}>合作飯店</h2>
            <br />
            <p className='RoomWords' >KOMORU合作的飯店遍佈全台，不僅與在地飯店合作、亦活絡當地消費，並且讓旅者與業者達到雙贏！
            </p>

            <div className='RoomList' data-aos="fade-up">
              <Link to="/hotelIntro">
                <QuiltedImageList />
              </Link>
            </div>

            {/* 會員系統 */}
            <div className='FeedBackLine'>
            </div>

            <div className='FeedBackFlex'>

              <div className='FeedBackLeft'>
                <h2 style={{ color: '#ED8C4E', textAlign: 'left' }}>會員系統</h2>
                <br />
                <p className='FeedBackWords' >KOMORU擁有易操作多功能的會員系統，協助你輕鬆管理你的會員資料並且瀏覽你的下訂紀錄，探索更多元的自己。
                </p>

                <h4 className='FeedBackItem' >• &nbsp;基本資料隨心所欲更換相片
                </h4>

                <h4 className='FeedBackItem' >• &nbsp;訂單記錄方便查看訂單內容
                </h4>

                <h4 className='FeedBackItem' >• &nbsp;活動回饋記錄旅程心得分享
                </h4>

                <h4 className='FeedBackItem' >• &nbsp;優惠表單領取各式優惠票卷
                </h4>

                <p className='FeedBackGo'>前往會員中心&nbsp;&nbsp;<btn><Link style={{ textDecoration: 'none' }} to="/user-home">加入KOMORU</Link></btn>
                </p>


              </div>
              <div className='FeedBackRight' data-aos="fade-left" >

                <RecipeReviewCard />
              </div>

            </div>


            {/* 問與答 */}
            <div className='FaqLine'>
            </div>

            <div className='FaqTitle'>
              <h2 className='FaqWords' style={{ color: '#ED8C4E', textAlign: 'center' }}>FAQ</h2>
              <Faq />
            </div>


          </div>
          <div className='HomeFooter'>
            <Footer />
          </div>

          <div className='ScrollTop'>
            <APP />
          </div>

        </div>


      </div>
    </div>


  )
}