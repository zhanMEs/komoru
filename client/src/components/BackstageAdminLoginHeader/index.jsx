import React from "react";
import LOGO from "../../assets/LOGO.png"

function LoginHeader() {
  return (
    <div className="d-flex align-items-center" style={{background:'#ED8C4E',height:"150px",paddingLeft:"159px"}}>
        <img style={{width:'250px',height:"100px"}} src={LOGO} alt="" />
    </div>
  );
}

export default LoginHeader;
