import React from "react";
import { useNavigate } from "react-router-dom";
import YouTubeEmbed from "../thumbnail/Thumbnail";
import "./videobutton.css";

const VideoButton = ({ videoId }) => {
  const navigate = useNavigate();

  const handleOuterClick = (e) => {
    e.stopPropagation(); // This stops the click from reaching the YouTubeEmbed
    navigate(`/app/videoinfo/${videoId}`);
  };

  return (
    <div className="video-card" onClick={handleOuterClick}>
      <div className="label">Recommended Trending Video</div>
      <div
        className="youtube-embed-container"
        onClick={(e) => e.stopPropagation()}
      >
        <YouTubeEmbed videoId={videoId} />
      </div>
    </div>
  );
};

export default VideoButton;
