import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./topsearch.css";

import logo from "../../imgs/logo.png";
import search from "../../imgs/search.svg";
import Search from "../../pages/search/Search";

const Topsearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const storedUser = sessionStorage.getItem("currentUser");
  const data = JSON.parse(storedUser);
  const user = data.user;
  console.log(user);

  const handleSearch = (e) => {
    e.preventDefault();

    navigate(`search/${searchTerm}`);
  };

  return (
    <div className="navbar">
      <div className="logo">
        <img src={logo} alt="" className="logo-icon" />
        <span>WETUBE</span>
      </div>

      <div className="icons">
        <div className="search-section">
          <form action="" className="search-bar" onSubmit={handleSearch}>
            <span className="search-button">
              <img src={search} alt="Search" className="icon" />
            </span>
            <input
              type="text"
              placeholder="Search channel"
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
        </div>

        <div className="user">
          {user && (
            <>
              <span>{user.username}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topsearch;
