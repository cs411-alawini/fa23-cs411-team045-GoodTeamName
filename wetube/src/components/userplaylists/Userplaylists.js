import React, { useState, useEffect } from "react";
import PlaylistButton from "../playlistbutton/Playlistbutton";
import "./userplaylists.css";

const UserPlaylists = ({ userId }) => {
  const [playlists, setPlaylists] = useState([]);
  const storedUser = sessionStorage.getItem("currentUser");
  const data = JSON.parse(storedUser);
  const user = data.user;

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const url = `http://35.239.242.245:8080/playlistbt?userID=` + user.id;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPlaylists(data);
      } catch (error) {
        console.error("Could not fetch playlists", error);
      }
    };

    fetchPlaylists();
  }, [userId]); // Re-run the effect if userId changes

  if (playlists.length === 0) {
    return <p>Loading playlists...</p>;
  }

  return (
    <div className="button-container">
      {playlists.slice(0, 4).map((playlist, index) => (
        <PlaylistButton key={index} playlistId={playlist.playlistID} />
      ))}
    </div>
  );
};

export default UserPlaylists;
