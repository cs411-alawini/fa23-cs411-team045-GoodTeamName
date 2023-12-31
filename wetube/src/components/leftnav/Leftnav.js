import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "./leftnav.css";

const Leftnav = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    sessionStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <div className="menu">
      <div className="item">
        <Link to="" className="listItem">
          <span className="listItemTitle">Dashboard</span>
        </Link>
      </div>

      <div className="item">
        <Link to="trending" className="listItem">
          <span className="listItemTitle">Trending</span>
        </Link>
      </div>

      <div className="item">
        <Link to="playlists" className="listItem">
          <span className="listItemTitle">Playlists</span>
        </Link>
      </div>

      <div className="item">
        <Link to="friends" className="listItem">
          <span className="listItemTitle">Friends</span>
        </Link>
      </div>

      <div className="item">
        <button className="listItemTitle btn" onClick={handleLogOut}>
          Log out
        </button>
      </div>
    </div>
  );
};

export default Leftnav;
