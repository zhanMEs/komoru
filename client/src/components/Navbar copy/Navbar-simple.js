
import "./Navbar.css";

import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h1>
        <Link className="navbar--title" to="/">
          <img
            className="navbar--logo"
            src="KOMORU_LOGO_White.png"
            alt="LOGO"
          ></img>
        </Link>
      </h1>
  
    </nav>
  );
}
