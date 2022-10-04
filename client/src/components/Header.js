import React from "react";
import { Link } from "react-router-dom";

import SearchBar from "./SearchBar";

import logo from "./images/dobbie-logo.png";

import "./Header.css";

function Header() {
  return (
    <div className="header-main-container">
      <div className="header-sub-container">
        <div className="header-left">
          <Link to="/breed">
            <button className="create-breed-btn">Create your own breed</button>
          </Link>
        </div>
        <div className="header-middle">
          <h1>Proyect</h1>
          <img className="header-logo" src={logo} />
          <h1>Dogs</h1>
        </div>
        <div className="header-right">
          <SearchBar />
        </div>
      </div>
    </div>
  );
}

export default Header;
