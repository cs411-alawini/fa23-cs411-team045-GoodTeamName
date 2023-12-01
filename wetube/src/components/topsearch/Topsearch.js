import React from "react";
import "./topsearch.css";

import logo from "../../imgs/logo.png";
import search from "../../imgs/search.svg";

const Topsearch = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <img src={logo} alt="" className="logo-icon" />
        <span>WETUBE</span>
      </div>

      <div className="icons">
        <div className="search-section">
          <form action="" className="search-bar">
            <button type="submit" className="search-button">
              <img src={search} alt="Search" className="icon" />
            </button>
            <input
              type="text"
              placeholder="Search channel"
              className="search-input"
            />
          </form>
        </div>

        <div className="user">
          <img src={logo} alt="" className="icon" />
          <span>User name</span>
        </div>
      </div>
    </div>
  );
};

export default Topsearch;
