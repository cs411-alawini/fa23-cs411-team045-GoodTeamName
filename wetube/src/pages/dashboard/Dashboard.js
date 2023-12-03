import React from "react";
import "./dashboard.css"; // Importing the CSS file
import Bar from "../../components/barchart/Barchart";
import Pie from "../../components/piechart/Piechart";
import Videoinfo from "../videoinfo/Videoinfo";
import Videogrid from "../../components/videogrid/Videogrid";
import { Route, Routes } from "react-router-dom";
import Playlists from "../playlists/Playlists";

const Dashboard = () => {
  return (
    <div className="dashboard">
      {/* Header Section */}
      <div className="header">
        <div className="left-section">
          <div className="videos-counts">
            <div className="label">Total videos</div>
            <div className="value">114514 videos</div>
          </div>
          <div className="playlists-counts">
            <div className="label">Total Playlists</div>
            <div className="value">23333 lists</div>
          </div>
        </div>
        <div className="right-section">
          <Bar />
          <Pie />
        </div>
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

export default Dashboard;
