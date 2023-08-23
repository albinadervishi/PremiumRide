import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./Navbar.css";
import Logo from "../../images/premiumLogo.png";
import User from "../../images/user_747376.png";
import Menu from "../../images/menu.png";

const Navbar = (props) => {
    const [sidebarWidth, setSidebarWidth] = useState(0);
    const [mainMargin, setMainMargin] = useState(0);
  
    const openNav = () => {
      setSidebarWidth(200);
      setMainMargin(200);
    };
  
    const closeNav = () => {
      setSidebarWidth(0);
      setMainMargin(0);
    };

  return (
    <div class="pos-f-t">
      <div className="navInfo">
        <p>Costumer Service: +355 69 77 34 012</p>&nbsp;&nbsp;&nbsp;&nbsp;
        <p>info@premiumride.com</p>
      </div>

      <nav class="navbar ">

      <div
          id="mySidebar"
          className="sidebar"
          style={{ width: sidebarWidth, transition: "0.5s" }}
        >
          <a href="#" className="closebtn" onClick={closeNav}>
            &times;
          </a>
          <Link to={"/profile"}><p>Profile</p></Link>
          <Link to={"/order-cab"}><p >Order a cab</p></Link>
          <Link to={"/profile"}><p>About</p></Link>
          <Link to={"/profile"}><p>Contact</p></Link>
        </div>

        <div id="main" style={{ marginLeft: mainMargin, transition: "0.5s" }}>
          <button  onClick={openNav}>
            <img src={Menu} alt="MenuLogo" class="menu-btn"></img>
          </button>
        </div>

        <Link to={"/"} className="logo"><img src={Logo} alt="Logo"></img></Link>

        <div className="loginBar d-flex align-items-center">
          <img src={User} alt="UserLogo"></img>
          <button>Login/Register</button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
