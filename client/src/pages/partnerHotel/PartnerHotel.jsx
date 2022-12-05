import React, { useState, useEffect, useRef } from "react";
// import TaipeiHotelImg from "./hotelImg/TaipeiHotelImg";
// import TaichungHotelImg from "./hotelImg/TaichungHotelImg";
// import HotelDescription from "./hotelDescription/HotelDescription";
import axios from "axios";
import "./PartnerHotel.css";
import Aos from "aos";
import "aos/dist/aos.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import RoomItemLeft from "./roomItem/RoomItemLeft";
import RoomItemRight from "./roomItem/RoomItemRight";
import PrivateRoomModal from "./roomModal/PrivateRoomModal";
import BackPackerRoomModal from "./roomModal/BackPackerRoomModal";
import { BsChevronLeft, BsChevronRight, BsSearch } from "react-icons/bs";
import UserHeader from "../../components/User/UserHeader";
import { useNavigate } from "react-router-dom";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import BookingLoading from "../../components/BookingLoading/BookingLoading";

const PartnerHotel = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  const [current1, setCurrent1] = useState(0);
  const [current2, setCurrent2] = useState(0);
  const [current3, setCurrent3] = useState(0);
  const [current4, setCurrent4] = useState(0);

  // //獲取飯店資料
  // const [data, setData] = useState([{}, {}, {}, {}]);
  // useEffect(() => {
  //   axios({
  //     method: "post",
  //     url: "http://localhost:5000/hotel/getHotelDataListWithMainImgAndCityName",
  //   })
  //     .then((res) => {
  //       console.log(res.data.dataList);
  //       setData(res.data.dataList);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);
  // console.log(data[0].hotelContent);

  //獲取房型資料
  // const [roomDes, setRoomDes] = useState("");
  // useEffect(() => {
  //   axios({
  //     method: "post",
  //     url: "http://localhost:5000/hotel/getHotelAndRoomContent",
  //   })
  //     .then((res) => {
  //       console.log(res.data.dataList);
  //       // setRoomDes(res.data.dataList);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  //獲取飯店資料
  const [data, setData] = useState([{}, {}, {}, {}]);
  const [HotelTaipeiImg, setHotelTaipeiImg] = useState([{}, {}, {}, {}]);
  const [HotelTaichungImg, setHotelTaichungImg] = useState([{}, {}, {}, {}]);
  const [HotelTainanImg, setHotelTainanImg] = useState([{}, {}, {}, {}]);
  const [HotelHualienImg, setHotelHualienImg] = useState([{}, {}, {}, {}]);
  const [roomTaipeiDes, setRoomTaipeiDes] = useState([{}, {}]);
  const [roomTaichungDes, setRoomTaichungDes] = useState([{}, {}]);
  const [roomTainanDes, setRoomTainanDes] = useState([{}, {}]);
  const [roomHualienDes, setRoomHualienDes] = useState([{}, {}]);
  useEffect(() => {
    axios({
      method: "post",
      url: "http://localhost:5000/hotel/getHotelAndRoomContent",
    })
      .then((res) => {
        console.log("first");
        console.log(res.data.dataList);
        setData(res.data.dataList);
        setHotelTaipeiImg(res.data.dataList[0].hotelImg);
        setHotelTaichungImg(res.data.dataList[1].hotelImg);
        setHotelTainanImg(res.data.dataList[2].hotelImg);
        setHotelHualienImg(res.data.dataList[3].hotelImg);
        setRoomTaipeiDes(res.data.dataList[0].roomContent);
        setRoomTaichungDes(res.data.dataList[1].roomContent);
        setRoomTainanDes(res.data.dataList[2].roomContent);
        setRoomHualienDes(res.data.dataList[3].roomContent);
        setLoading(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //map出飯店照片路經的Array
  const imgTaipei = HotelTaipeiImg.map((ImgPath, index) => {
    return `http://localhost:5000${ImgPath.hotelImgPath}`;
  });
  const imgTaichung = HotelTaichungImg.map((ImgPath, index) => {
    return `http://localhost:5000${ImgPath.hotelImgPath}`;
  });
  const imgTainan = HotelTainanImg.map((ImgPath, index) => {
    return `http://localhost:5000${ImgPath.hotelImgPath}`;
  });
  const imgHualien = HotelHualienImg.map((ImgPath, index) => {
    return `http://localhost:5000${ImgPath.hotelImgPath}`;
  });

  //台北

  const nextSlide1 = () => {
    setCurrent1(current1 === HotelTaipeiImg.length - 1 ? 0 : current1 + 1);
  };
  const prevSlide1 = () => {
    setCurrent1(current1 === 0 ? HotelTaipeiImg.length - 1 : current1 - 1);
  };

  //台中
  const nextSlide2 = () => {
    setCurrent2(current2 === HotelTaichungImg.length - 1 ? 0 : current2 + 1);
  };
  const prevSlide2 = () => {
    setCurrent2(current2 === 0 ? HotelTaichungImg.length - 1 : current2 - 1);
  };

  //台南
  const nextSlide3 = () => {
    setCurrent3(current3 === HotelTainanImg.length - 1 ? 0 : current3 + 1);
  };
  const prevSlide3 = () => {
    setCurrent3(current3 === 0 ? HotelTainanImg.length - 1 : current3 - 1);
  };

  //花蓮
  const nextSlide4 = () => {
    setCurrent4(current4 === HotelHualienImg.length - 1 ? 0 : current4 + 1);
  };
  const prevSlide4 = () => {
    setCurrent4(current4 === 0 ? HotelHualienImg.length - 1 : current4 - 1);
  };

  const [openPrivate1Modal, setOpenPrivate1Modal] = useState(false);
  const [openBackPacker1Modal, setOpenBackPacker1Modal] = useState(false);
  const [openPrivate2Modal, setOpenPrivate2Modal] = useState(false);
  const [openBackPacker2Modal, setOpenBackPacker2Modal] = useState(false);
  const [openPrivate3Modal, setOpenPrivate3Modal] = useState(false);
  const [openBackPacker3Modal, setOpenBackPacker3Modal] = useState(false);
  const [openPrivate4Modal, setOpenPrivate4Modal] = useState(false);
  const [openBackPacker4Modal, setOpenBackPacker4Modal] = useState(false);

  const openPrivateModal1Click = () => {
    setOpenPrivate1Modal(true);
  };
  const openBackPackerModal1Click = () => {
    setOpenBackPacker1Modal(true);
  };
  const openPrivateModal2Click = () => {
    setOpenPrivate2Modal(true);
  };
  const openBackPackerModal2Click = () => {
    setOpenBackPacker2Modal(true);
  };
  const openPrivateModal3Click = () => {
    setOpenPrivate3Modal(true);
  };
  const openBackPackerModal3Click = () => {
    setOpenBackPacker3Modal(true);
  };
  const openPrivateModal4Click = () => {
    setOpenPrivate4Modal(true);
  };
  const openBackPackerModal4Click = () => {
    setOpenBackPacker4Modal(true);
  };

  useEffect(() => {
    if (
      openPrivate1Modal === true ||
      openPrivate2Modal === true ||
      openPrivate3Modal === true ||
      openPrivate4Modal === true ||
      openBackPacker1Modal === true ||
      openBackPacker2Modal === true ||
      openBackPacker3Modal === true ||
      openBackPacker4Modal === true
    ) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [
    openPrivate1Modal,
    openPrivate2Modal,
    openPrivate3Modal,
    openPrivate4Modal,
    openBackPacker1Modal,
    openBackPacker2Modal,
    openBackPacker3Modal,
    openBackPacker4Modal,
  ]);
  // useEffect(() => {
  //   if (openPrivate1Modal === true) {
  //     document.body.style.overflow = "hidden";
  //   }
  //   if (openPrivate1Modal === false) {
  //     document.body.style.overflow = "unset";
  //   }
  // }, [openPrivate1Modal]);

  //滾動到指定元素
  const [serchValue, setSearchValue] = useState("");
  const TaipeiRef = useRef(null);
  const TaichungRef = useRef(null);
  const TainanRef = useRef(null);
  const HualienRef = useRef(null);
  const scrollToTaipei = () => TaipeiRef.current.scrollIntoView();
  const scrollToTaichung = () => TaichungRef.current.scrollIntoView();
  const scrollToTainan = () => TainanRef.current.scrollIntoView();
  const scrollToHualien = () => HualienRef.current.scrollIntoView();
  useEffect(() => {
    if (serchValue === "Taipei") {
      scrollToTaipei();
    }
    if (serchValue === "Taichung") {
      scrollToTaichung();
    }
    if (serchValue === "Tainan") {
      scrollToTainan();
    }
    if (serchValue === "Hualien") {
      scrollToHualien();
    }
  }, [serchValue]);

  const navigate = useNavigate();
  const goBooking = () => {
    navigate("/bookingHomePage");
  };
  return (
    <>
      {/* Modal必須放最外層，否則overlay無法作用 */}
      {/* 台北房型 */}
      <PrivateRoomModal
        onClose={() => {
          setOpenPrivate3Modal(false);
        }}
        open={openPrivate3Modal}
        privateUrl={`http://localhost:5000${roomTaipeiDes[1].roomImgPath}`}
        desTitle="夾腳拖的家-私人套房"
        // des1={roomTaipeiDes[0].roomContent}
        des2={roomTaipeiDes[1].roomContent}
      />
      <BackPackerRoomModal
        onClose={() => {
          setOpenBackPacker3Modal(false);
        }}
        open={openBackPacker3Modal}
        backPackerUrl={`http://localhost:5000${roomTaipeiDes[0].roomImgPath}`}
        desTitle="夾腳拖的家-背包客房"
        des1={roomTaipeiDes[0].roomContent}
        // des2="2"
      />

      {/* 台中房型 */}
      <PrivateRoomModal
        onClose={() => {
          setOpenPrivate1Modal(false);
        }}
        open={openPrivate1Modal}
        privateUrl={`http://localhost:5000${roomTaichungDes[1].roomImgPath}`}
        desTitle="誠星青年旅館-私人套房"
        des1="若是你希望保有個人空間，並且喜愛自在的坐臥在地板上，那麼這間客房會十分適合您入住。"
        des2="簡約的單人空間沒有華而不實的設備，有的僅是簡單的設施讓你放慢腳步在這生活，為旅人提供一個認識勤美一帶的機會，但或許每次都能讓你有新的發現和新的感受。"
      />
      <BackPackerRoomModal
        onClose={() => {
          setOpenBackPacker1Modal(false);
        }}
        open={openBackPacker1Modal}
        backPackerUrl={`http://localhost:5000${roomTaichungDes[0].roomImgPath}`}
        desTitle="誠星青年旅館-背包客房"
        des1="六人背包床位提供給旅人最基本的起居空間，雖然不算寬敞但絕不至於狹小，房間的一半配置了和式休憩區，讓共用的房間增加了更多與人交流聊天的機會。"
        des2="你也可以與三兩好友一起包下這間房，也可以享有與好友間的獨處時光，我們房型雖然簡單，但希望能讓你每次入住都能有新的發現和新的感受，並用緩慢悠哉的步調感受台中。"
      />

      {/* 台南房型 */}
      <PrivateRoomModal
        onClose={() => {
          setOpenPrivate2Modal(false);
        }}
        open={openPrivate2Modal}
        privateUrl={`http://localhost:5000${roomTainanDes[1].roomImgPath}`}
        desTitle="快活慢行-私人套房"
        des1={roomTainanDes[1].roomContent}
        // des2="2"
      />
      <BackPackerRoomModal
        onClose={() => {
          setOpenBackPacker2Modal(false);
        }}
        open={openBackPacker2Modal}
        backPackerUrl={`http://localhost:5000${roomTainanDes[0].roomImgPath}`}
        desTitle="快活慢行-背包客房"
        des1={roomTainanDes[0].roomContent}
        // des2="2"
      />

      {/* 花蓮房型 */}
      <PrivateRoomModal
        onClose={() => {
          setOpenPrivate4Modal(false);
        }}
        open={openPrivate4Modal}
        privateUrl={`http://localhost:5000${roomHualienDes[1].roomImgPath}`}
        desTitle="山林山鄰-私人套房"
        des1={roomHualienDes[0].roomContent}
        // des2="2"
      />
      <BackPackerRoomModal
        onClose={() => {
          setOpenBackPacker4Modal(false);
        }}
        open={openBackPacker4Modal}
        backPackerUrl={`http://localhost:5000${roomHualienDes[0].roomImgPath}`}
        desTitle="山林山鄰-背包客房"
        des1={roomHualienDes[0].roomContent}
        // des2="2"
      />

      <Navbar />

      {/* 0712 aki-更改為滾動視差  */}
      <div className="partnerHotel--titleBar partnerHotel--bg--fix mb-5 partnerHotel-banner">
        <UserHeader
          title="遍地全台的合作飯店一覽"
          text="KOMORU與北、中、南、東各個在地飯店合作，活絡社會並讓旅者與業者達到雙贏！"
        />
      </div>

      <div className="goBookingContainer">
        <button className="goBooking" onClick={goBooking}>
          立即預定
        </button>
      </div>

      <ScrollToTop />

      {/* 快速搜索 */}
      <div className="searchContainer">
        <p>
          <BsSearch />
        </p>
        <select
          name="citySearch"
          id="citySearch"
          className="citySearch"
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        >
          <option value="">快速搜尋</option>
          <option value="Taipei">北部</option>
          <option value="Taichung">中部</option>
          <option value="Tainan">南部</option>
          <option value="Hualien">東部</option>
        </select>
      </div>

      {loading ? (
        <>
          <div className="pHotelContainer" ref={TaipeiRef}>
            {/* 台北 */}
            <section className="sliderleft">
              <BsChevronLeft
                className="sliderleft-left-arrow"
                onClick={prevSlide3}
              />
              <BsChevronRight
                className="sliderleft-right-arrow"
                onClick={nextSlide3}
              />

              {imgTaipei.map((TaipeiImg, index) => {
                return (
                  <div
                    className={index === current3 ? "slide active" : "slide"}
                    key={index}
                  >
                    {index === current3 && (
                      <img src={TaipeiImg} alt="err img" className="image" />
                    )}
                  </div>
                );
              })}
              <div className="sizeRight" data-aos="fade-up">
                <div>
                  <h1>夾腳拖的家</h1>
                  <h1>Flip Flop Hostel</h1>
                </div>
                <p>{data[0].hotelContent}</p>
                <br />
                <br />
                <p>{data[0].hotelTel}</p>
                <p>{data[0].hotelAddr}</p>
                <a
                  href="https://www.facebook.com/OwlStay.FlipFlopHostel/"
                  target="_blank"
                >
                  認識 夾角拖的家 Flip Flop Hostel
                </a>
              </div>
            </section>
            <RoomItemLeft
              privateClick={openPrivateModal3Click}
              backPackerClick={openBackPackerModal3Click}
              privateUrl={`http://localhost:5000${roomTaipeiDes[1].roomImgPath}`}
              backPackerUrl={`http://localhost:5000${roomTaipeiDes[0].roomImgPath}`}
            />

            <div className="partnerHotelLine" ref={TaichungRef}></div>

            {/* 台中 */}
            <section className="sliderRight">
              <BsChevronLeft
                className="sliderRight-left-arrow"
                onClick={prevSlide1}
              />
              <BsChevronRight
                className="sliderRight-right-arrow"
                onClick={nextSlide1}
              />
              <div className="sizeLeft" data-aos="fade-up">
                <div>
                  <h1>誠星青年旅館</h1>
                  <h1>Star Hostel</h1>
                </div>
                {/* {data[0].hotelContent} */}
                <p>{data[1].hotelContent}</p>
                <br />
                <br />
                <br />
                <br />
                <p>{data[1].hotelTel}</p>
                <p>{data[1].hotelAddr}</p>
                <a href="https://starhostelparklane.com/" target="_blank">
                  認識 誠星青年旅館 Star Hostel
                </a>
              </div>
              {imgTaichung.map((Taichungimg, index) => {
                return (
                  <div
                    className={index === current1 ? "slide active" : "slide"}
                    key={index}
                  >
                    {index === current1 && (
                      <img
                        src={Taichungimg}
                        alt="Taipei img"
                        className="image"
                      />
                    )}
                  </div>
                );
              })}
            </section>
            <RoomItemRight
              privateClick={openPrivateModal1Click}
              backPackerClick={openBackPackerModal1Click}
              privateUrl={`http://localhost:5000${roomTaichungDes[1].roomImgPath}`}
              backPackerUrl={`http://localhost:5000${roomTaichungDes[0].roomImgPath}`}
            />

            <div className="partnerHotelLine" ref={TainanRef}></div>

            {/* 台南 */}
            <section className="sliderleft ">
              <BsChevronLeft
                className="sliderleft-left-arrow"
                onClick={prevSlide2}
              />
              <BsChevronRight
                className="sliderleft-right-arrow"
                onClick={nextSlide2}
              />
              {imgTainan.map((Tainanimg, index) => {
                return (
                  <div
                    className={index === current2 ? "slide active" : "slide"}
                    key={index}
                  >
                    {index === current2 && (
                      <img src={Tainanimg} alt="err img" className="image" />
                    )}
                  </div>
                );
              })}
              <div className="sizeRight" data-aos="fade-up">
                <div>
                  <h1>快活慢行</h1>
                </div>
                <p>{data[2].hotelContent}</p>
                <br />
                <p>{data[2].hotelTel}</p>
                <p>{data[2].hotelAddr}</p>
                <a href="https://hiihubs.com/" target="_blank">
                  認識 快活慢行
                </a>
              </div>
            </section>
            <RoomItemLeft
              privateClick={openPrivateModal2Click}
              backPackerClick={openBackPackerModal2Click}
              privateUrl={`http://localhost:5000${roomTainanDes[1].roomImgPath}`}
              backPackerUrl={`http://localhost:5000${roomTainanDes[0].roomImgPath}`}
            />

            <div className="partnerHotelLine" ref={HualienRef}></div>

            {/* 花蓮 */}
            <section className="sliderRight">
              <BsChevronLeft
                className="sliderRight-left-arrow"
                onClick={prevSlide4}
              />
              <BsChevronRight
                className="sliderRight-right-arrow"
                onClick={nextSlide4}
              />
              <div className="sizeLeft" data-aos="fade-up">
                <div>
                  <h1>山林山鄰</h1>
                </div>
                <p>{data[3].hotelContent}</p>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <p>{data[3].hotelTel}</p>
                <p>{data[3].hotelAddr}</p>
                <a href="https://www.forest3030hostel.com.tw/" target="_blank">
                  認識 山林山鄰
                </a>
              </div>
              {imgHualien.map((Hualienimg, index) => {
                return (
                  <div
                    className={index === current4 ? "slide active" : "slide"}
                    key={index}
                  >
                    {index === current4 && (
                      <img src={Hualienimg} alt="err img" className="image" />
                    )}
                  </div>
                );
              })}
            </section>
            <RoomItemRight
              privateClick={openPrivateModal4Click}
              backPackerClick={openBackPackerModal4Click}
              privateUrl={`http://localhost:5000${roomHualienDes[1].roomImgPath}`}
              backPackerUrl={`http://localhost:5000${roomHualienDes[0].roomImgPath}`}
            />
          </div>
        </>
      ) : (
        <div style={{ marginLeft: 900, marginTop: 0 }}>
          <BookingLoading />
        </div>
      )}
      <Footer />
    </>
  );
};

export default PartnerHotel;
