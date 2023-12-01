import React from "react";
import VideoButton from "../videobutton/Videobutton";
import "./videogrid.css"; // Make sure to create this CSS file

const VideoGrid = () => {
  return (
    <div className="video-grid">
      <VideoButton videoId="-XFBVAAzXjc" />
      <VideoButton videoId="--hjHKgm67g" />
    </div>
  );
};

export default VideoGrid;
