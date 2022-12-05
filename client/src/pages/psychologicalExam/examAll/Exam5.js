import React, { useContext } from "react";
import "./ExamAll.css";
import {
  Exam1Context,
  Exam2Context,
  Exam3Context,
  Exam4Context,
  Exam5Context,
} from "../../../Helper/Context";

const Exam5 = () => {
  const { exam5Data, setExam5Data } = useContext(Exam5Context);
  // const [exam5Data, setexam5Data] = useState("");
  // console.log(exam5Data);
  return (
    <div className="topic">
      <p className="ExamQes">查到一間有興趣的餐廳,你會?</p>
      <label className={exam5Data === "J" ? "colorActive" : "getOp"}>
        <input
          type="radio"
          name="qFiveAnsValue"
          id="qFiveAnsValue"
          value="J"
          defaultChecked={exam5Data === "J"}
          onChange={(e) => setExam5Data(e.currentTarget.value)}
        ></input>
        神農嘗百白草!吃了就知道
      </label>
      <label className={exam5Data === "P" ? "colorActive" : "getOp"}>
        <input
          type="radio"
          name="qFiveAnsValue"
          id="qFiveAnsValue"
          value="P"
          defaultChecked={exam5Data === "P"}
          onChange={(e) => setExam5Data(e.currentTarget.value)}
        ></input>
        先看其他人評價,再決定是否試試看
      </label>
    </div>
  );
};

export default Exam5;
