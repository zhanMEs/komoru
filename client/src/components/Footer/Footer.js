import React from "react";
import "./Footer.css";

export default function Footer() {
  const token = localStorage.token;

  return <div className="footer">

<p className="FooterMail">17komoru@gmail.com</p>

<div class="v-line">
</div>


<div className="FooterIcon">

<a className="Icon"><img src="footerigicon.png"></img></a>
<a className="Icon"><img src="footerfbicon.png"></img></a>
<a className="Icon"><img src="footermailicon.png"></img></a>

</div>



<p className="copyRight">Copyright 2022 © All rights reserved KOMORU </p>


  </div>;

}
