import React,{useState} from "react"
import { useNavigate } from 'react-router-dom'
import './Feedback.css'
import { Button, Accordion, Form } from 'react-bootstrap'
import axios from "axios"


export default function Feedback(props) {
  let navigate = useNavigate()

  const [feedback, setFeedback] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    axios({
      method: 'POST',
      url: 'http://localhost:5000/feeback/alterFeeback',
      data: {
        orderId:props.orderId,
        feebackContent:feedback, 
      }
    })
      .then((res) => {
        console.log(res)
        alert('已收到心得回饋，感謝您！')
        navigate('/user-home', { replace: true })
        // navigate('/user-home/feedback', { replace: true })
        // window.location.reload("false")
      })
      .catch((err) => {
        console.log(err) 
      });

  }

  const inputHandler = (e) => {
      e.preventDefault()
      setFeedback(prevFeedback => e.target.value)
  } 
  // console.log(feedback)  //動態追蹤輸入的pw值

  return (
    <>
      {/* 下：有訂房紀錄版 */}
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <ul className="acco-header p-2 w-100 d-flex justify-content-between">
              <li className="pt-2 pb-1">{props.orderStartDate}</li>
              <li className="ps-2 pt-2 pb-1 w-75"> {props.roomDesc} / {props.roomType? "私人房型":"背包客房"}</li>
              <li className="pt-2 pb-1">{props.memberName}</li>
            </ul>
          </Accordion.Header>
          {props.feebackId && // 已提交心得回饋的畫面
            <Accordion.Body className="p-4 text-start">
              <p className="p-3">{props.feebackContent}</p>
            </Accordion.Body>
          }
          {!props.feebackId && // 若無提交過心得的輸入畫面
            <Accordion.Body className="p-4 text-start">
              <Form>
                <Form.Group className="mb-3 mt-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Control 
                    as="textarea" 
                    rows={5} 
                    placeholder="填寫活動反饋" 
                    onChange={inputHandler}
                    value={feedback} 
                  />
                </Form.Group>
              </Form>
              <span>對於此趟旅程有什麼想法或是改變歡迎分享給 KOMORU</span>
              <Button 
                className="Feedback--btn float-end me-1" 
                size="sm" 
                variant="secondary"
                onClick={submitHandler}>
                提交
              </Button>
            </Accordion.Body>
          }
        </Accordion.Item>
      </Accordion>
    </>
  )

}