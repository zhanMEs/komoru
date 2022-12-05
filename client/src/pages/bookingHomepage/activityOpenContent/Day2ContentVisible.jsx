import React, { useState, useContext } from "react";
import "./DayContentVisible.css";
import { BookContext } from "../../../Helper/Context";
import { useEffect } from "react";

const Day2ContentVisible = () => {
  const { activity1Data, setActivity1Data } = useContext(BookContext);
  const { activity2Data, setActivity2Data } = useContext(BookContext);
  //日期計算
  const { date, setDate } = useContext(BookContext);
  function addDaysToDate(date, days) {
    var res = new Date(date);
    res.setDate(res.getDate() + days);
    return res;
  }

  var nd = new Date(date);
  let y = nd.getFullYear();
  let m = nd.getMonth() + 1;
  let d = nd.getDate();
  let addOneM = addDaysToDate(nd, 1).getMonth() + 1;
  let addOneD = addDaysToDate(nd, 1).getDate();
  let fst = `${y.toString()}/${m.toString().padStart(2, "0")}/${d
    .toString()
    .padStart(2, "0")}`;
  let sec = `${y.toString()}/${addOneM.toString().padStart(2, "0")}/${addOneD
    .toString()
    .padStart(2, "0")}`;

  const { countActivity, setCountActivity } = useContext(BookContext);

  //判斷活動共選幾天
  useEffect(() => {
    if (activity1Data === "1" && activity2Data === "3") {
      setCountActivity(2);
    } else if (activity1Data === "1" && activity2Data === "4") {
      setCountActivity(1);
    } else if (activity1Data === "2" && activity2Data === "3") {
      setCountActivity(1);
    } else if (activity1Data === "2" && activity2Data === "4") {
      setCountActivity(0);
    }
  }, [activity1Data, activity2Data]);

  //當全部選要參加活動時，隱藏"否"的選項
  const [disableNoVisible, setDisableNoVisible] = useState(true);
  useEffect(() => {
    activity1Data === "1" && activity2Data === "3"
      ? setDisableNoVisible(false)
      : setDisableNoVisible(true);
  }, [activity1Data, activity2Data]);

  //當活動參與都選否，使activityState得值變"1"(否)，才能直接跳轉OrderPage
  const { activityState, setActivityState } = useContext(BookContext);
  useEffect(() => {
    if (activity1Data === "2" && activity2Data === "4") {
      return setActivityState("1");
    }
  }, [activity1Data, activity2Data]);
  return (
    <>
      <div className="activityChoice">
        <p className="dateFST">{fst}</p>
        <label>
          <input
            className="rdobutton_radio"
            type="radio"
            name="pick1stActivity"
            id="activityId"
            value="1"
            onChange={(e) => {
              setActivity1Data(e.target.value);
              // countActivityDaysYes();
            }}
          ></input>
          <span className="adjustActive">參加</span>
        </label>
        {/* {disableNoVisible && ( */}

        <label>
          <input
            className="rdobutton_radio"
            type="radio"
            name="pick1stActivity"
            id="activityId"
            value="2"
            onChange={(e) => {
              setActivity1Data(e.target.value);
              // countActivityDaysNo();
            }}
          ></input>
          <span className="adjustActive">不參加</span>
        </label>

        {/* )} */}
      </div>
      <div className="activityChoice">
        <p className="dateFST">{sec}</p>
        <label>
          <input
            className="rdobutton_radio"
            type="radio"
            name="pick2stActivity"
            id="activityId"
            value="3"
            onChange={(e) => {
              setActivity2Data(e.target.value);
              // countActivityDaysYes();
            }}
          ></input>
          <span className="adjustActive">參加</span>
        </label>
        {/* {disableNoVisible && ( */}
        <label>
          <input
            className="rdobutton_radio"
            type="radio"
            name="pick2stActivity"
            id="activityId"
            value="4"
            onChange={(e) => {
              setActivity2Data(e.target.value);
              // countActivityDaysNo();
            }}
          ></input>
          <span className="adjustActive">不參加</span>
        </label>

        {/* )} */}
      </div>
    </>
  );
};

export default Day2ContentVisible;
