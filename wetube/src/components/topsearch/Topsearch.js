import React from "react";
import "./topsearch.css";

import logo from "../../imgs/logo.png";
import search from "../../imgs/search.svg";

const Topsearch = () => {
  const storedUser = sessionStorage.getItem("currentUser");
  const data = JSON.parse(storedUser);
  const user = data.user;
  console.log(user);

  return (
    <div className="navbar">
      <div className="logo">
        <img src={logo} alt="" className="logo-icon" />
        <span>WETUBE</span>
      </div>

      <div className="icons">
        <div className="search-section">
          <form action="" className="search-bar">
            <span className="search-button">
              <img src={search} alt="Search" className="icon" />
            </span>
            <input
              type="text"
              placeholder="Search channel"
              className="search-input"
            />
          </form>
        </div>

        <div className="user">
          {user && (
            <>
              <img src={logo} alt="" className="icon" />
              <span>{user.username}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topsearch;
