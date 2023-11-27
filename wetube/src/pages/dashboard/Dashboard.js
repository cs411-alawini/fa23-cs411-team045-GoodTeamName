import React from "react";
import './dashboard.css'; // Importing the CSS file
import Bar from "../../components/barchart/BarChart";
import Pie from "../../components/piechart/PieChart";

const Dashboard = () => {
  return (
    <div className="dashboard">
      {/* Header Section */}
      <div className="header">
        <div className="date-section">
          <div className="label">Date</div>
          <div className="value">April 9, 2023</div>
        </div>
        <div className="bar-chart">
          <Bar/>
        </div>
        <div className="category-section">
          <Pie/>
        </div>
      </div>
      {/* Stats Section */}
      <div className="stats">
        <div className="label">Total Videos</div>
        <div className="value">145 Videos</div>
      </div>
      <hr className="divider" />
      {/* Recommended Videos Section */}
      <div className="videos-grid">
        <div className="video-card">
          <div className="thumbnail-placeholder"></div>
          <div className="label">Recommended Trending Video 1</div>
          <div className="value">How to Cook the Perfect Steak</div>
        </div>
        <div className="video-card">
          <div className="thumbnail-placeholder"></div>
          <div className="label">Recommended Trending Video 2</div>
          <div className="value">Tips & Tricks for Outdoor Photography</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;



 