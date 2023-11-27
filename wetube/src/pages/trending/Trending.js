import React from "react";
import "./trending.css"; // Importing the CSS file
import Bar from "../../components/barchart/barChart";
import Pie from "../../components/piechart/pieChart";
import YouTubeEmbed from "../../components/thumbnail/thumbNail";

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
      <div className="videos-grid">
        <div className="video-card">
          <YouTubeEmbed videoId="-XFBVAAzXjc" />
          <div className="label">Recommended Trending Video 1</div>
          <div className="value">New American Nazis</div>
        </div>
        <div className="video-card">
          <YouTubeEmbed videoId="dVihVavsYE4" />
          <div className="label">Recommended Trending Video 2</div>
          <div className="value">THIS IS HOW I CARRY ON DOOMFIST</div>
        </div>
      </div>
    </div>
  );
};

export default Trending;
