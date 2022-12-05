import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import './RainbowCard.css'
import BookingLoading from '../BookingLoading/BookingLoading';

export default function RainbowCard(props) {

  // 0708 aki-彩虹卡顯示開關
  const [show, setShow] = useState(true);
  // 0708 aki-金句內容資料獲取
  const [rainbowCard, setRainbowCard] = useState('')
  // 初始化loading狀態
  const [loading, setLoading] = useState(false)

  // 0708 獲取金句
  useEffect(() => {
    axios({
      method: "post",
      url: "http://localhost:5000/rainbowCard/getRainbowCard",
      data: {
        token: localStorage.token
      }
    }).then((res) => {
      setLoading(true)
      setRainbowCard(res.data.dataList.getRainbowCard[0].rainbowCardContent)
      setShow(true)
    })
      .catch((err) => {
        console.log(err)
      })
  }
    , [])

  /*20220709 YN
  排除當modal開啟時，scrollbar 消失 sidebar 往右移 */
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => (document.body.style.overflowY = "");
  }, []);



  return (
    <>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        className="w-100"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Body>
          <div className="rainbowCard">
            <p className="rainbowCard--EN">KOMORU想送給你一句話...</p>

            { //資料尚未取得之前，顯示Loading
              !loading &&
              <div className='d-flex justify-content-center'>
                <BookingLoading />
              </div>
            }

            {loading && <p className="rainbowCard--CN">{rainbowCard}</p>}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
