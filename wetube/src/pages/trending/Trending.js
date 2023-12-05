import React from "react";
import "../dashboard/dashboard.css"; // Importing the CSS file
// import Bar from "../../components/barchart/Barchart";
// import Pie from "../../components/piechart/Piechart";
import Videoinfo from "../videoinfo/Videoinfo";
import VideoButton from "../../components/videobutton/Videobutton";
import Channelsbar from "../../components/channelbar/Channelbar";
import VideoCategoryPieChart from "../../components/categorypie/Pie";
import { Route, Routes } from "react-router-dom";

const Trending = () => {
  return (
    <div className="dashboard">
      {/* Header Section */}
      <div className="header">
        <div className="left-section">
          <div className="info">
            <div className="label">Date</div>
            <div className="value">April 9, 2023</div>
          </div>
          <div className="info">
            <div className="label">Total Videos</div>
            <div className="value">145 Videos</div>
          </div>
        </div>
        <div className="right-section">
          <Channelsbar />
          <VideoCategoryPieChart />
        </div>
      </div>
      <hr className="divider" />
      {/* Recommended Videos Section */}
      <div>
        <Routes>
          <Route path="/app/videoinfo/:videoId" element={<Videoinfo />} />
        </Routes>
        <div className="video-grid">
          <VideoButton videoId="uQ6hAKR33lU" />
          <VideoButton videoId="4jlacaLPjRo" />
        </div>
      </div>
    </div>
  );
};

export default Trending;
