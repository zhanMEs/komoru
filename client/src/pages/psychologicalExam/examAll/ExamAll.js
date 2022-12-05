import React, { useState, useContext, useEffect } from "react";
import "./ExamAll.css";
import Exam1 from "./Exam1";
import Exam2 from "./Exam2";
import Exam3 from "./Exam3";
import Exam4 from "./Exam4";
import Exam5 from "./Exam5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Exam1Context,
  Exam2Context,
  Exam3Context,
  Exam4Context,
  Exam5Context,
  BookContext,
} from "../../../Helper/Context";
import {
  HiOutlineArrowLeft,
  HiOutlineArrowRight,
  HiOutlineArrowCircleRight,
} from "react-icons/hi";
import BookingLoading from "../../../components/BookingLoading/BookingLoading";

const ExamAll = () => {
  const [loading, setLoading] = useState(false);
  //問題狀態初始化
  const [exam1Data, setExam1Data] = useState("");
  const [exam2Data, setExam2Data] = useState("");
  const [exam3Data, setExam3Data] = useState("");
  const [exam4Data, setExam4Data] = useState("");
  const [exam5Data, setExam5Data] = useState("");
  console.log(exam1Data, exam2Data, exam3Data, exam4Data, exam5Data);

  // const [personality, setPersonality] = useState("");
  // const [personalityDescribe, setPersonalityDescribe] = useState("");
  const [activityPack, setActivityPack] = useState("");
  // const [examImg, setExamImg] = useState();
  const [examResult, setExamResult] = useState("");

  const [page, setPage] = useState(0);
  const FormTitles = ["問題一.", "問題二.", "問題三.", "問題四.", "問題五."];

  const [memberId, setMemberId] = useState("");
  useEffect(() => {
    axios({
      method: "post",
      url: "http://localhost:5000/member/isLogin",
      data: {
        token: localStorage.token,
      },
    })
      .then((res) => {
        //有登入的話，回傳「會員資訊」在res.data[0] ｜ 沒登入則回傳message
        let userData = res.data[0];
        console.log(userData);
        setMemberId(userData.memberId);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //2022-06-16 -ZH
  //在同一分頁展示不同測驗題目
  const PageDisplay = () => {
    if (page === 0) {
      return (
        <Exam1Context.Provider value={{ exam1Data, setExam1Data }}>
          <Exam1 />
        </Exam1Context.Provider>
      );
    } else if (page === 1) {
      return (
        <Exam2Context.Provider value={{ exam2Data, setExam2Data }}>
          <Exam2 />
        </Exam2Context.Provider>
      );
    } else if (page === 2) {
      return (
        <Exam3Context.Provider value={{ exam3Data, setExam3Data }}>
          <Exam3 />
        </Exam3Context.Provider>
      );
    } else if (page === 3) {
      return (
        <Exam4Context.Provider value={{ exam4Data, setExam4Data }}>
          <Exam4 />
        </Exam4Context.Provider>
      );
    } else if (page === 4) {
      return (
        <Exam5Context.Provider value={{ exam5Data, setExam5Data }}>
          <Exam5 />
        </Exam5Context.Provider>
      );
    }
  };

  const navigator = useNavigate();
  //下一步按鈕去訂單明細頁面
  const ToOrderPage = () => {
    navigator("/bookingOrderPage", {
      state: {
        activityPack,
      },
    });
  };
  //顯示測驗結果畫面
  const ExamResultDisplay = () => {
    if (page === 5) {
      return (
        <>
          {loading ? (
            <>
              <div className="examFormCantainer">
                <h1>{examResult.personality}</h1>
                <p className="personalityDescribe">
                  {examResult.personalityDescribe[0]}
                  <br />
                  {examResult.personalityDescribe[1]}
                  <br />
                  {examResult.personalityDescribe[2]}
                </p>
                {/* <p>活動包:{activityPack}</p> */}
                <img src={require("../madCat.png")} alt="" />
                <button onClick={ToOrderPage} className="nextStepResult">
                  查看訂單&nbsp;
                  <HiOutlineArrowCircleRight className="HiOutlineArrowCircleRight" />
                </button>
              </div>
            </>
          ) : (
            <div style={{ marginLeft: 600, marginTop: 200 }}>
              <BookingLoading />
            </div>
          )}
        </>
      );
    }
  };

  const { activityState, setActivityState } = useContext(BookContext);
  const nextPage = () => {
    if (page < 5) {
      setPage((currentPage) => currentPage + 1);
    }

    if (page === 4) {
      if (exam1Data === "") {
        alert("問題一不得為空!");
        setPage((page) => 0);
      } else if (exam2Data === "") {
        {
          alert("問題二不得為空!");
          setPage((page) => 1);
        }
      } else if (exam3Data === "") {
        {
          alert("問題三不得為空!");
          setPage((page) => 2);
        }
      } else if (exam4Data === "") {
        {
          alert("問題四不得為空!");
          setPage((page) => 3);
        }
      } else if (exam5Data === "") {
        {
          alert("問題五不得為空!");
          setPage((page) => 4);
        }
      } else {
        console.log(activityState);
        const ExamDetails = {
          isActive: activityState,
          memberId: memberId,
          qOneAnsValue: exam1Data,
          q2AnsValue: exam2Data,
          q3AnsValue: exam3Data,
          q4AnsValue: exam4Data,
          q5AnsValue: exam5Data,
        };
        console.log({
          isActive: activityState,
          memberId: memberId,
          qOneAnsValue: exam1Data,
          q2AnsValue: exam2Data,
          q3AnsValue: exam3Data,
          q4AnsValue: exam4Data,
          q5AnsValue: exam5Data,
        });
        fetch("http://localhost:5000/examItem/getAndSaveExamData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          body: JSON.stringify(ExamDetails),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setExamResult(data.dataList);
            // setPersonality(data.dataList.personality);
            // setPersonalityDescribe(data.dataList.personalityDescribe);
            setActivityPack(data.dataList.activePackType);
          })
          .then(() => {
            setLoading(true);
          })
          .catch(console.error);
      }
    }
  };
  // console.log(examResult);
  // console.log(personality);
  return (
    <div className="form">
      {examResult === "" && (
        <>
          <div className="progressbar">
            <div
              style={{
                width:
                  page === 0
                    ? "20%"
                    : page === 1
                    ? "40%"
                    : page === 2
                    ? "60%"
                    : page === 3
                    ? "80%"
                    : "100%",
              }}
            ></div>
          </div>
          <div className="examFormCantainer">
            <div>
              <p className="examHeaderTitle">{FormTitles[page]}</p>
            </div>
            <div className="examBody">{PageDisplay()}</div>

            <div className="examFooter">
              <button
                disabled={page === 0}
                onClick={() => {
                  setPage((page) => page - 1);
                }}
                className="prevBtn"
              >
                <HiOutlineArrowLeft />
              </button>
              <button onClick={nextPage} className="nextBtn">
                <HiOutlineArrowRight />
              </button>
            </div>
          </div>
        </>
      )}

      {ExamResultDisplay()}
    </div>
  );
};

export default ExamAll;
