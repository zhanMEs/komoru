import { logout } from "../../App";
import "./Navbar.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Navbar() {
  
  const token = localStorage.token;
  
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
      <ul className="navbar--menu">
        <li>
          <Link className="navbar--item" to="/hotelIntro">
            房型介紹
          </Link>
        </li>
        <li>
          <Link className="navbar--item" to="/contactUs">
            聯絡我們
          </Link>
        </li>
        <li>
          <Link className="navbar--item" to="/user-home">
            會員中心
          </Link>
        </li>
        <li>
          <Link className="navbar--item" to="/bookingHomepage">
            即刻預定
          </Link>
        </li>
        <li>
          <Link className="navbar--item" to="/">
            EN | TW
          </Link>
        </li>
        <li>
          {token && (
            <Button variant="secondary" size="sm" onClick={logout}>
              登出
            </Button>
          )}
        </li>
      </ul>
    </nav>
  );
}
