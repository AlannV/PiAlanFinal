import React from "react";

import gitLogo from "../images/github-logo.png";
import linLogo from "../images/linkedin-logo.png";

import { Link } from "react-router-dom";

import "./Footer.css";

function Footer() {
  return (
    <div className="footer-main-container">
      <div className="git-container">
        <a href="https://github.com/AlannV">
          <img src={gitLogo} />
        </a>
      </div>
      <div className="in-container">
        <a href="https://www.linkedin.com/in/alan-vargas-5b6b814b/">
          <img src={linLogo} />
        </a>
      </div>
    </div>
  );
}

export default Footer;
