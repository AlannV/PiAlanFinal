import React from "react";

import logo from "../images/dobbie-logo.png";

import "./Header.css";

function Header() {
  return (
    <div className="header-main-container">
      <div className="header-sub-container">
        <div className="header-left"></div>
        <div className="header-middle">
          <h1>Proyect</h1>
          <img className="header-logo" src={logo} />
          <h1>Dogs</h1>
        </div>
        <div className="header-right"></div>
      </div>
    </div>
  );
}

export default Header;
