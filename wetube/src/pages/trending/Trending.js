import React, { useState, useEffect } from "react";
import "../dashboard/dashboard.css";
import Videoinfo from "../videoinfo/Videoinfo";
import VideoButton from "../../components/videobutton/Videobutton";
import Channelsbar from "../../components/channelbar/Channelbar";
import VideoCategoryPieChart from "../../components/categorypie/Pie";
import { Route, Routes } from "react-router-dom";

// Stateless functional component to display the current date
const DateDisplay = () => {
  // Function to get the current date
  const getCurrentDate = () => {
    const today = new Date();
    return today.toDateString(); // Format it to a more readable form
  };

  return <div className="value">{getCurrentDate()}</div>;
};

const Trending = () => {
  const storedUser = sessionStorage.getItem("currentUser");
  const data = JSON.parse(storedUser);
  const user = data.user;
  const [videoCount, setVideoCount] = useState(0);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    fetch(`http://35.239.242.245:8080/playlistbt/${user.id}/countRegionVideos`)
      .then((response) => response.json())
      .then((data) => {
        setVideoCount(data.videoCount);
      })
      .catch((error) => {
        console.error("Error fetching video count:", error);
      });
    fetch(`http://35.239.242.245:8080/recommend/${user.id}`)
      .then((response) => response.json())
      .then((data) => {
        setRecommendations(data);
      })
      .catch((error) => {
        console.error("Error fetching recommendations:", error);
      });
  }, [user.id]);

  // Function to render the recommended video
  const renderRecommendedVideo = () => {
    if (recommendations.length > 0) {
      // Assuming the first element is the recommended video
      const recommendedVideo = recommendations[0];
      return <VideoButton videoId={recommendedVideo.RecommendedVideoID} />;
    } else {
      return <div>No recommendations available at the moment.</div>;
    }
  };

  return (
    <div className="dashboard">
      {/* Header Section */}
      <div className="header">
        <div className="left-section">
          <div className="info">
            <div className="label">Date</div>
            <DateDisplay />
          </div>
          <div className="info">
            <div className="label">Total Videos in Your Region</div>
            <div className="value">{videoCount} Videos</div>
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
          {renderRecommendedVideo()}
        </div>
      </div>
    </div>
  );
};

export default Trending;
