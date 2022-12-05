import React, { useContext } from "react";
import "./DayContentVisible.css";
import { BookContext } from "../../../Helper/Context";
import { useEffect, useState } from "react";
import { Next } from "react-bootstrap/esm/PageItem";

const Day3ContentVisible = () => {
  const { activity1Data, setActivity1Data } = useContext(BookContext);
  const { activity2Data, setActivity2Data } = useContext(BookContext);
  const { activity3Data, setActivity3Data } = useContext(BookContext);

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
  let addTwoM = addDaysToDate(nd, 2).getMonth() + 1;
  let addOneD = addDaysToDate(nd, 1).getDate();
  let addTwoD = addDaysToDate(nd, 2).getDate();
  let fst = `${y.toString()}/${m.toString().padStart(2, "0")}/${d
    .toString()
    .padStart(2, "0")}`;
  let sec = `${y.toString()}/${addOneM.toString().padStart(2, "0")}/${addOneD
    .toString()
    .padStart(2, "0")}`;
  let trd = `${y.toString()}/${addTwoM.toString().padStart(2, "0")}/${addTwoD
    .toString()
    .padStart(2, "0")}`;

  const { countActivity, setCountActivity } = useContext(BookContext);
  useEffect(() => {
    if (
      activity3Data === "5" &&
      activity2Data === "3" &&
      activity1Data === "1"
    ) {
      setCountActivity(3);
    } else if (activity2Data === "3" && activity1Data === "1") {
      setCountActivity(2);
    } else if (activity3Data === "5" && activity1Data === "1") {
      setCountActivity(2);
    } else if (activity3Data === "5" && activity2Data === "3") {
      setCountActivity(2);
    } else if (activity1Data === "1") {
      setCountActivity(1);
    } else if (activity2Data === "3") {
      setCountActivity(1);
    } else if (activity3Data === "5") {
      setCountActivity(1);
    } else if (
      activity3Data === "6" &&
      activity2Data === "4" &&
      activity1Data === "2"
    ) {
      setCountActivity(0);
    }
  });

  // const [disableVisible, setDisableVisible] = useState(true);

  // useEffect(() => {
  //   activity1Data === "1" && activity2Data === "3" && activity3Data === "5"
  //     ? setDisableVisible(false)
  //     : setDisableVisible(true);
  // }, [activity1Data, activity2Data, activity3Data]);
  // console.log(activity1Data, activity2Data, activity3Data);

  //當活動參與都選否，使activityState得值變"1"(否)，才能直接跳轉OrderPage
  const { activityState, setActivityState } = useContext(BookContext);
  useEffect(() => {
    if (
      activity1Data === "2" &&
      activity2Data === "4" &&
      activity3Data === "6"
    ) {
      return setActivityState("1");
    }
  }, [activity1Data, activity2Data, activity3Data]);

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
            }}
          ></input>
          <span className="adjustActive">參加</span>
        </label>
        {/* {disableVisible && ( */}
        <>
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
        </>
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
            }}
          ></input>
          <span className="adjustActive">參加</span>
        </label>
        {/* {disableVisible && ( */}
        <>
          <label>
            <input
              className="rdobutton_radio"
              type="radio"
              name="pick2stActivity"
              id="activityId"
              value="4"
              onChange={(e) => {
                setActivity2Data(e.target.value);
              }}
            ></input>
            <span className="adjustActive">不參加</span>
          </label>
        </>
        {/* )} */}
      </div>
      <div className="activityChoice">
        <p className="dateFST">{trd}</p>
        <label>
          <input
            className="rdobutton_radio"
            type="radio"
            name="pick3stActivity"
            id="activityId"
            value="5"
            onChange={(e) => {
              setActivity3Data(e.target.value);
            }}
          ></input>{" "}
          <span className="adjustActive">參加</span>
        </label>
        {/* {disableVisible && ( */}
        <>
          <label>
            <input
              className="rdobutton_radio"
              type="radio"
              name="pick3stActivity"
              id="activityId"
              value="6"
              onChange={(e) => {
                setActivity3Data(e.target.value);
              }}
            ></input>
            <span className="adjustActive">不參加</span>
          </label>
        </>
        {/* )} */}
      </div>
    </>
  );
};

export default Day3ContentVisible;
