import React from "react";

const ContactUsModal = (props) => {
  //   console.log(props.open);
  if (!props.open) {
    return null;
  }

  return (
    <div className="contactUsModalOverlay" onClick={props.close}>
      <div className="contactUsModalContainer">
        <span onClick={props.close} className="contactUsCloseBtn">
          X
        </span>
        <p>我們已收到您的訊息!謝謝!</p>
      </div>
    </div>
  );
};

export default ContactUsModal;
