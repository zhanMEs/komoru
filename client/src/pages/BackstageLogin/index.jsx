import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Form } from "react-bootstrap";
import "./BackstageLogin.css";
import LOGO_OG from "../../assets/KOMORU_LOGO_OG.png";
import { Modal, Button } from "react-bootstrap";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { BsFillExclamationCircleFill } from "react-icons/bs";
// import LoginHeader from "../../components/BackstageAdminLoginHeader";
// import Background from "../../assets/BackstageLoginKOMORU.png"

// 20220708 登入成功彈跳視窗
// function LoginModal(props) {
//   let navigate = useNavigate()
//   return (
//     <Modal
//       {...props}
//       size="xs"
//       aria-labelledby="contained-modal-title-vcenter"
//       centered
//     >
//       <Modal.Header style={{ border: "none" }} closeButton>
//       </Modal.Header>
//       <Modal.Body >
//         <div className="text-center">
//           <BsFillCheckCircleFill size="8em" color="green" />
//           <h4 className="mt-4">登入成功!</h4>
//         </div>
//       </Modal.Body>
//       <Modal.Footer className="justify-content-center" style={{ border: "none" }}>
//       </Modal.Footer>
//     </Modal>
//   );
// }

//20220708 登入錯誤彈跳視窗
// function ErrorModal(props) {
//   return (
//     <Modal
//       {...props}
//       size="xs"
//       // aria-labelledby="example-modal-sizes-title-sm"
//       centered
//       // style={{ padding: "-1500px 0 0 0" }}
//     >
//       <Modal.Header style={{ border: "none" }} closeButton></Modal.Header>
//       <Modal.Body>
//         <div className="text-center">
//           <BsFillExclamationCircleFill size="7em" color="#cc5522" />
//           <h4 className="mt-4">帳號或密碼錯誤!</h4>
//         </div>
//       </Modal.Body>
//       <Modal.Footer
//         className="justify-content-center"
//         style={{ border: "none" }}
//       ></Modal.Footer>
//     </Modal>
//   );
// }

function BackstageLogin() {
  const [account, setAccount] = useState("");
  const [passwd, setPasswd] = useState("");

  //20220708 登入成功彈跳視窗狀態初始
  // const [loginShow, setLoginShow] = useState(true);

  //20220708 登入成功彈跳視窗狀態初始
  // const [errorShow, setErrorShow] = useState(false);

  let navigate = useNavigate();

  const inputAccountHandler = (e) => {
    setAccount(() => e.target.value);
    //console.log(account) //動態追蹤輸入的account值
  };

  const inputPasswdHandler = (e) => {
    setPasswd(() => e.target.value);
    //console.log(passwd) //動態追蹤輸入的pw值
  };

  // 0620 aki - 正式驗證帳號及密碼：登入驗證
  const loginHandlerWithPW = (event) => {
    event.preventDefault();
    console.log(account);
    console.log(passwd);

    if (account !== "" && passwd !== "") {
      axios({
        method: "POST",
        url: "http://localhost:5000/employee/login",
        data: {
          employeeAccount: account,
          employeePasswd: passwd,
        },
        withCredentials: true,
      })
        .then((res) => {
          // console.log(res.data);
          if (res.data.status) {
            console.log(res.data); // 印出撈到的資料看看
            // console.log(loginShow)
            // setLoginShow(true)
            alert("登入成功")
            navigate("/BackstageAdmin", { replace: true });
          } else {
            // setErrorShow(true);
            alert(res.data.errMsg);
          }

          // console.log(res.data.token); // 印出撈到的token看看
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (account === "" || passwd === "") {
      alert("請填寫帳號及密碼");
    }
  };

  return (
    <>
      {/* <div>
        <LoginHeader />
      </div> */}

      <div className="BackstageLogin-backgorund" style={{ height: "100vh" }}>
        <Container
          className="text-center"
          style={{ padding: "0 230px 0 230px" }}
        >
          <div style={{ paddingTop: "150px" }}></div>
          <div
            style={{
              boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
              height: "500px",
              padding: "50px",
            }}
          >
            <img src={LOGO_OG} alt="" className="mt-2" />
            <h3 className="mt-4">後台管理系統</h3>

            <Form className="col-lg-12">
              <div className="mb-4 mt-4">
                <input
                  className="form-control"
                  // id="account"
                  placeholder="請輸入帳號"
                  name="account"
                  onChange={inputAccountHandler}
                  style={{ height: "50px" }}
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  className="form-control"
                  // id="pwd"
                  placeholder="請輸入密碼"
                  name="pswd"
                  onChange={inputPasswdHandler}
                  style={{ height: "50px" }}
                />
              </div>
              <button
                className="btn col-md-12 "
                onClick={loginHandlerWithPW}
                style={{ background: "#ED8C4E", color: "#FFFFFF" }}
              >
                登入
              </button>
            </Form>
          </div>
        </Container>
        {/* <LoginModal
          show={loginShow}
          onHide={() => setLoginShow(false)}
        /> */}
        {/* <ErrorModal show={errorShow} onHide={() => setErrorShow(false)} /> */}
      </div>
    </>
  );
}

export default BackstageLogin;
