import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className="main-container">
      <div className="welcome-container">
        <div className="welcome-title">
          <h1 className="welcome-text">Dogs App</h1>
        </div>
        <div>
          <p>
            In this page you can search and see the details of numerous dog
            breeds
          </p>
          <p>and also create your own dog breed!</p>
          <p>have fun and thank you for visiting my react proyect</p>
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
