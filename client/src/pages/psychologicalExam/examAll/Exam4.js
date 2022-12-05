import React, { useContext } from "react";
import "./ExamAll.css";
import {
  Exam1Context,
  Exam2Context,
  Exam3Context,
  Exam4Context,
  Exam5Context,
} from "../../../Helper/Context";

const Exam4 = () => {
  const { exam4Data, setExam4Data } = useContext(Exam4Context);
  // const [exam4Data, setexam4Data] = useState("");
  // console.log(exam4Data);
  return (
    <div className="topic">
      <p className="ExamQes">朋友被分手時</p>
      <label className={exam4Data === "T" ? "colorActive" : "getOp"}>
        <input
          type="radio"
          name="qFourAnsValue"
          id="qFourAnsValue"
          value="T"
          defaultChecked={exam4Data === "T"}
          onChange={(e) => setExam4Data(e.currentTarget.value)}
        ></input>
        你會先用邏輯分析事情的是非對錯,並提出建議
      </label>
      <label className={exam4Data === "F" ? "colorActive" : "getOp"}>
        <input
          type="radio"
          name="qFourAnsValue"
          id="qFourAnsValue"
          value="F"
          defaultChecked={exam4Data === "F"}
          onChange={(e) => setExam4Data(e.currentTarget.value)}
        ></input>
        你會先安撫對方情緒,更注重在對方的感受如何
      </label>
    </div>
  );
};

export default Exam4;
