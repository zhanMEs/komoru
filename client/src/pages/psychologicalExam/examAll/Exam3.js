import React, { useContext } from "react";
import "./ExamAll.css";
import {
  Exam1Context,
  Exam2Context,
  Exam3Context,
  Exam4Context,
  Exam5Context,
} from "../../../Helper/Context";

const Exam3 = () => {
  const { exam3Data, setExam3Data } = useContext(Exam3Context);
  // const [exam3Data, setexam3Data] = useState("");
  // console.log(exam3Data);
  return (
    <div className="topic">
      <p className="ExamQes">當新款3C產品推出,你會覺得?</p>
      <label className={exam3Data === "N" ? "colorActive" : "getOp"}>
        <input
          type="radio"
          name="qThreeAnsValue"
          id="qThreeAnsValue"
          value="N"
          defaultChecked={exam3Data === "N"}
          onChange={(e) => setExam3Data(e.currentTarget.value)}
        ></input>
        哇！這想法太創新了,如何做到的？想立刻嘗試
      </label>
      <label className={exam3Data === "S" ? "colorActive" : "getOp"}>
        <input
          type="radio"
          name="qThreeAnsValue"
          id="qThreeAnsValue"
          value="S"
          defaultChecked={exam3Data === "S"}
          onChange={(e) => setExam3Data(e.currentTarget.value)}
        ></input>
        好酷，但不知道到底好不好用....CP值符不符合？
      </label>
    </div>
  );
};

export default Exam3;
