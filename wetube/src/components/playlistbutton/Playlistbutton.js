import React from "react";
import { useNavigate } from "react-router-dom";
import {
  getThumbnail,
  placeholderPlaylist,
} from "../../pages/playlistinfo/Playlistinfo";
import "./playlistbutton.css"; // Import the CSS for styling

const PlaylistButton = ({ playlistId }) => {
  const navigate = useNavigate();
  const thumbnailUrl = getThumbnail(placeholderPlaylist[0].video_id);

  const handleClick = () => {
    navigate(`/app/playlistinfo/${playlistId}`);
  };

  return (
    <button onClick={handleClick} className="playlist-button">
      <img
        src={thumbnailUrl}
        alt="Playlist Thumbnail"
        className="playlist-thumbnail"
      />
      <div className="playlist-label">Your Playlist</div>
    </button>
  );
};

export default PlaylistButton;
