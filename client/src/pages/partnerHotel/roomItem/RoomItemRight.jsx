import React, { useEffect } from "react";
import "./RoomItem.css";
import Aos from "aos";
import "aos/dist/aos.css";

const RoomItemRight = (props) => {
  // useEffect(() => {
  //   Aos.init({ duration: 2500 });
  // }, []);

  return (
    <div className="roomContainer-R">
      <div className="parent">
        <div
          className="privateRoom child"
          style={{
            backgroundImage: `url(${props.privateUrl})`,
          }}
          onClick={props.privateClick}
        >
          <span>私人套房</span>
        </div>
      </div>
      <div className="parent">
        <div
          className="backPackerRoom child"
          style={{
            backgroundImage: `url(${props.backPackerUrl})`,
          }}
          onClick={props.backPackerClick}
        >
          <span>背包客房</span>
        </div>
      </div>
    </div>
  );
};

export default RoomItemRight;
