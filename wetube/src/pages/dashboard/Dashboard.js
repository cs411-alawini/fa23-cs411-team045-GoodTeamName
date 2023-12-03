import React from "react";
import "./dashboard.css"; // Importing the CSS file
import Bar from "../../components/barchart/Barchart";
import Pie from "../../components/piechart/Piechart";
import Playlistbutton from "../../components/playlistbutton/Playlistbutton";
import { Route, Routes } from "react-router-dom";
import Playlistinfo from "../playlistinfo/Playlistinfo";

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
          <Route
            path="/app/playlistinfo/:playlistId"
            element={<Playlistinfo />}
          />
        </Routes>
        <div className="video-grid">
          <Playlistbutton playlistId="19" />
          <Playlistbutton playlistId="28" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
