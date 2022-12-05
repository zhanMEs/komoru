import React, { useEffect } from "react";
import "./Modal.css";

const BackPackerRoomModal = (props) => {
  if (!props.open) {
    return null;
  }
  return (
    <div className="roomModalOverlay" onClick={props.onClose}>
      <div className="modalContainer">
        <img className="ModalImg" src={props.backPackerUrl} alt="" />
        <div className="modalRight">
          <p onClick={props.onClose} className="ModalCloseBtn">
            X
          </p>
          <div className="ModalContent">
            <h1>{props.desTitle}</h1>
            <p>{props.des1}</p>
            <p>{props.des2}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackPackerRoomModal;
