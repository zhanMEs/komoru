import React, { useContext } from "react";
import "./ExamAll.css";
import { Exam2Context } from "../../../Helper/Context";

const Exam2 = () => {
  const { exam2Data, setExam2Data } = useContext(Exam2Context);
  // const [exam2Data, setexam2Data] = useState("");
  // console.log(exam2Data);
  return (
    <div className="topic">
      <p className="ExamQes">休假時,我會:</p>

      <label className={exam2Data === "I" ? "colorActive" : "getOp"}>
        <input
          type="radio"
          name="qTwoAnsValue"
          id="qTwoAnsValue"
          value="I"
          defaultChecked={exam2Data === "I"}
          onChange={(e) => setExam2Data(e.currentTarget.value)}
        ></input>
        在家追劇
      </label>

      <label className={exam2Data === "E" ? "colorActive" : "getOp"}>
        <input
          type="radio"
          name="qTwoAnsValue"
          id="qTwoAnsValue"
          value="E"
          defaultChecked={exam2Data === "E"}
          onChange={(e) => setExam2Data(e.currentTarget.value)}
        ></input>
        出門和朋友聚會
      </label>
    </div>
  );
};

export default Exam2;
