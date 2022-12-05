import React, { useContext, useState } from "react";
import "./ExamAll.css";
import { Exam1Context } from "../../../Helper/Context";

function Exam1() {
  // const [exam1Data, setexam1Data] = useState("");
  // console.log(exam1Data);
  const { exam1Data, setExam1Data } = useContext(Exam1Context);
  const [click, setClick] = useState(false);
  const handleClick = () => {
    //toggle
    setClick((c) => !c);
  };
  return (
    <>
      <div className="topic">
        <p className="ExamQes">今天去一間咖啡廳,你喜歡:</p>

        <label className={exam1Data === "0" ? "colorActive" : "getOp"}>
          <input
            type="radio"
            name="qOneAnsValue"
            id="qOneAnsValue"
            value="0"
            defaultChecked={exam1Data === "0"}
            onChange={(e) => setExam1Data(e.target.value)}
          ></input>
          室外花園座位
        </label>
        {/* <div
          className="getOp"
          onClick={handleClick}
          style={{
            backgroundColor: click ? "black" : "",
            color: click ? "white" : "",
          }}
        > */}
        <label className={exam1Data === "1" ? "colorActive" : "getOp"}>
          <input
            type="radio"
            name="qOneAnsValue"
            id="qOneAnsValue"
            value="1"
            defaultChecked={exam1Data === "1"}
            onChange={(e) => setExam1Data(e.target.value)}
          ></input>
          坐在店內聞咖啡香
        </label>
        {/* </div> */}
      </div>
    </>
  );
}

export default Exam1;
