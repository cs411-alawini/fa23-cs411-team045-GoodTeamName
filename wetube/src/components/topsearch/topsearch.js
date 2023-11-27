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
        <div class="search-section">
          <form action="" class="search-bar">
          <input type="text" placeholder="Search channel" className="search-input" />
          <button type="submit"><img src={search} alt="" className="icon" /></button>
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
