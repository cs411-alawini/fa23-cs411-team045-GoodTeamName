import React from "react";
import "./trending.css"; // Importing the CSS file
import Bar from "../../components/barchart/Barchart";
import Pie from "../../components/piechart/Piechart";
import Videoinfo from "../videoinfo/Videoinfo";
import Videogrid from "../../components/videogrid/Videogrid";
import { Route, Routes } from "react-router-dom";

const Trending = () => {
  return (
    <div className="trending">
      {/* Header Section */}
      <div className="header">
        <div className="date-section">
          <div className="label">Date</div>
          <div className="value">April 9, 2023</div>
        </div>
        <div className="bar-chart">
          <Bar />
        </div>
        <div className="category-section">
          <Pie />
        </div>
      </div>
      {/* Stats Section */}
      <div className="stats">
        <div className="label">Total Videos</div>
        <div className="value">145 Videos</div>
      </div>
      <hr className="divider" />
      {/* Recommended Videos Section */}
      <div>
        <Routes>
          <Route path="/app/videoinfo/:videoId" element={<Videoinfo />} />
        </Routes>
        <Videogrid />
      </div>
    </div>
  );
};

export default Trending;
