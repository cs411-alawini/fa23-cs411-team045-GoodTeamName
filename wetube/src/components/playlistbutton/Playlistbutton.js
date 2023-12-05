import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getThumbnail } from "../../pages/playlistinfo/Playlistinfo";
import "./playlistbutton.css"; // Import the CSS for styling

//`http://localhost:8080/playlistbt/${playlistId}`

const PlaylistButton = ({ playlistId }) => {
  const navigate = useNavigate();
  const [thumbnailUrl, setThumbnailUrl] = useState("");

  useEffect(() => {
    const fetchVideoID = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/playlistbt/${playlistId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.length > 0) {
          const videoID = data[0].videoID; // Assuming the backend returns an array
          const thumbnail = getThumbnail(videoID);
          setThumbnailUrl(thumbnail);
          console.log(thumbnail);
        }
      } catch (error) {
        console.error("There was an error fetching the video ID", error);
      }
    };

    fetchVideoID();
  }, [playlistId]);

  const handleClick = () => {
    navigate(`/app/playlistinfo/${playlistId}`);
  };

  return (
    <button onClick={handleClick} className="playlist-button">
      <div className="playlist-label">Your Playlist</div>
      {thumbnailUrl ? (
        <img
          src={thumbnailUrl}
          alt="Playlist Thumbnail"
          className="playlist-thumbnail"
        />
      ) : (
        <div>Loading thumbnail...</div> // Placeholder while loading
      )}
    </button>
  );
};

export default PlaylistButton;
