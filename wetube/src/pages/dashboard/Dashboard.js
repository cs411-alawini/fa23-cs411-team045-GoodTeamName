import React, { useState, useEffect } from "react";
import "./dashboard.css"; // Importing the CSS file
import { Route, Routes } from "react-router-dom";
import Playlistinfo from "../playlistinfo/Playlistinfo";
import ChannelsBar from "../../components/channelbar/Channelbar";
import VideoCategoryPieChart from "../../components/categorypie/Pie";
import UserPlaylists from "../../components/userplaylists/Userplaylists";

const Dashboard = () => {
  const storedUser = sessionStorage.getItem("currentUser");
  const data = JSON.parse(storedUser);
  const user = data.user;
  const [videoCount, setVideoCount] = useState(0);
  const [playlistCount, setPlaylistCount] = useState(0);

  useEffect(() => {
    // Function to fetch the video count
    const fetchPlaylistCount = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/playlistbt/${user.id}/countLists`
        );
        const data = await response.json();
        setPlaylistCount(data[0].playlistCount); // Update the state with the fetched count
        console.log("playlistCount", data.playlistCount);
      } catch (error) {
        console.error("Error fetching playlist count:", error);
      }
    };

    fetchPlaylistCount(); // Call the function to fetch video count
  }, [user.id]);

  useEffect(() => {
    // Function to fetch the video count
    const fetchVideoCount = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/playlistbt/${user.id}/countVideos`
        );
        const data = await response.json();
        setVideoCount(data[0].videoCount); // Update the state with the fetched count
        console.log("videoCount", data.videoCount);
      } catch (error) {
        console.error("Error fetching video count:", error);
      }
    };

    fetchVideoCount(); // Call the function to fetch video count
  }, [user.id]);

  return (
    <div className="dashboard">
      {/* Header Section */}
      <div className="header">
        <div className="left-section">
          <div className="info">
            <div className="label">Your videos</div>
            <div className="value">{videoCount} videos</div>
          </div>
          <div className="info">
            <div className="label">Your Playlists</div>
            <div className="value">{playlistCount} lists</div>
          </div>
        </div>
        <div className="right-section">
          <ChannelsBar />
          <VideoCategoryPieChart />
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
          <UserPlaylists />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
