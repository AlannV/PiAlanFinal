import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className="main-container">
      <div className="welcome-container">
        <div className="welcome-title">
          <h1 className="welcome-text">Proyecto individual "Dogs!"</h1>
        </div>
        <div className="welcome-btn">
          <Link to="/home">
            <button className="enter-btn">Entrar!</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
