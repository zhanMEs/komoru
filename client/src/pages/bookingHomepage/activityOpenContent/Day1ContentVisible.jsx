import React, { useContext, useEffect, useState } from "react";
import "./DayContentVisible.css";
import { BookContext } from "../../../Helper/Context";

const Day1ContentVisible = () => {
  //日期計算
  const { date, setDate } = useContext(BookContext);
  let nd = new Date(date);
  let y = nd.getFullYear();
  let m = nd.getMonth() + 1;
  let d = nd.getDate();
  let fst = `${y.toString()}/${m.toString().padStart(2, "0")}/${d
    .toString()
    .padStart(2, "0")}`;

  const { activity1Data, setActivity1Data } = useContext(BookContext);
  const { countActivity, setCountActivity } = useContext(BookContext);
  const [disable1Visible, setDisable1Visible] = useState(true);
  useEffect(() => {
    activity1Data === "1"
      ? setDisable1Visible(false)
      : setDisable1Visible(true);
  }, [activity1Data]);

  const show = () => {
    setCountActivity(1);
  };

  //當活動參與都選否，使activityState得值變"1"(否)，才能直接跳轉OrderPage
  const { activityState, setActivityState } = useContext(BookContext);
  useEffect(() => {
    if (activity1Data === "2") {
      return setActivityState("1");
    }
  }, [activity1Data]);

  // const onSubmit = (e) => {
  //   console.log(e);
  // };
  return (
    <div className="activityChoice">
      <p className="dateFST">{fst}</p>
      <label>
        <input
          className="rdobutton_radio"
          type="radio"
          name="pick1stActivity"
          id="activityId"
          value="1"
          onClick={show}
          onChange={(e) => {
            setActivity1Data(e.target.value);
          }}
        ></input>
        <span className="adjustActive">參加</span>
      </label>
      {/* {disable1Visible && (
        <> */}
      <label>
        <input
          className="rdobutton_radio"
          type="radio"
          name="pick1stActivity"
          id="activityId"
          value="2"
          onChange={(e) => {
            setActivity1Data(e.target.value);
          }}
        ></input>
        <span className="adjustActive">不參加</span>
      </label>
      {/* </>
      )} */}
    </div>
  );
};

export default Day1ContentVisible;
