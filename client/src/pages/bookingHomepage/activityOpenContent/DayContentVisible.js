import React, { useContext } from "react";
import "./DayContentVisible.css";
import { BookContext } from "../../../Helper/Context";

const DayContentVisible = () => {
  const { activity1Data, setActivity1Data } = useContext(BookContext);
  const { activity2Data, setActivity2Data } = useContext(BookContext);
  const { activity3Data, setActivity3Data } = useContext(BookContext);
  console.log(activity1Data, activity2Data, activity3Data);

  return (
    <>
      <div className="activityChoice">
        <p>第一天</p>
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
        <label htmlFor="yes">是</label>
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
        <label htmlFor="yes">否</label>
      </div>
      <div className="activityChoice">
        <p>第二天</p>
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
        <label htmlFor="yes">是</label>
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
        <label htmlFor="yes">否</label>
      </div>
      <div className="activityChoice">
        <p>第三天</p>
        <input
          className="rdobutton_radio"
          type="radio"
          name="pick3stActivity"
          id="activityId"
          value="5"
          onChange={(e) => {
            setActivity3Data(e.target.value);
          }}
        ></input>
        <label htmlFor="yes">是</label>
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
        <label htmlFor="yes">否</label>
      </div>
    </>
  );
};

export default DayContentVisible;
