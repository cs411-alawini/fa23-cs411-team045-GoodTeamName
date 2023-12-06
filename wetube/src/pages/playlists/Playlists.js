import React from "react";
import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "./playlists.css";
import { getThumbnail } from "../playlistinfo/Playlistinfo";
import getCategoryName from "../../GetCategory";

const Playlists = () => {
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [playlistStats, setPlaylistStats] = useState([]);
  const [renderTrigger, setRenderTrigger] = useState(false);
  const [failed, setFailed] = useState(false);
  const [toDelete, setToDelete] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [playlistName, setPlaylistName] = useState("");

  const storedUser = sessionStorage.getItem("currentUser");
  const data = JSON.parse(storedUser);
  const user = data.user;
  // console.log(user);

  async function fetchPlaylists() {
    try {
      const userID = user.id;
      const response = await fetch(
        `http://35.239.242.245:8080/playlist?userID=${userID}`,
        {
          method: "GET",
        }
      );
      setRenderTrigger(!renderTrigger);
      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err);
      setLoading(false);
      setFailed(true);
    }
  }

  async function fetchPlaylistStats(tempPlaylists) {
    try {
      if (tempPlaylists.length > 0) {
        const stats = tempPlaylists.map(() => null);
        for (let i = 0; i < stats.length; i++) {
          const res = await fetch(`http://35.239.242.245:8080/playlist/${tempPlaylists[i].playlistID}/stats`);
          const data = await res.json();
          stats[i] = data[0];
        }
        return stats;
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      setFailed(true);
    }
  }

  useEffect(() => {
    async function fetchAll() {
      try {
        const tempPlaylists = await fetchPlaylists();
        console.log(tempPlaylists)
        const tempStats = await fetchPlaylistStats(tempPlaylists);
        setLoading(false);
        setPlaylist(tempPlaylists);
        setPlaylistStats(tempStats);
        console.log(tempStats);
      } catch (err) {
        console.error(err);
        setLoading(false);
        setFailed(true);
      }
    }
    fetchAll();
  }, [user.id, showForm]);

  useEffect(() => {
    if (toDelete !== "") {
      const newPlaylist = playlist.filter(
        (playlist) => playlist.playlistID !== toDelete
      );
      setPlaylist(newPlaylist);
      toast.success("Playlist deleted successfully");
      setToDelete("");
    }
  }, [toDelete, playlist]);


  // TODO: Replace with standardized loading graphic
  if (loading) {
    return (
      <div>
        <h2>Playlists loading...</h2>
      </div>
    );
  }

  // Delete playlist
  // Delete playlist
  // Delete playlist

  const handleDelete = (playlistID) => {
    // to Delete the playlist
    handleDeleteButtonClick(playlistID);
  };

  const handleDeleteButtonClick = async (playlistID) => {
    try {
      const response = await fetch(
        `http://35.239.242.245:8080/playlist/${playlistID}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        console.log("Playlist deleted successfully");
        setToDelete(playlistID);
      } else {
        // Handle error response
        console.error(`Failed to delete playlist. Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error deleting playlist:", error);
    }
  };

  // Create playlist
  // Create playlist
  // Create playlist

  const handleAddPlaylist = () => {
    setShowForm(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Add your API call to create a new playlist here
    try {
      const response = await fetch("http://35.239.242.245:8080/playlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          playlistName: playlistName,
          userID: user.id, // Replace with the actual user ID
        }),
      });

      if (response.ok) {
        setShowForm(false);
        setPlaylistName("");
      } else {
        console.error("Failed to create playlist");
      }
    } catch (error) {
      console.error("Error creating playlist:", error);
    }
  };

  // return
  // return
  // return

  return (
    <div className="playlist-container">
      <div className="playlist-detail">
        <div className="playlist-title-container">
          <h2 className="playlist-title">Playlists</h2>
          <button
            className="btn"
            onClick={() => {
              handleAddPlaylist();
            }}
          >
            Create New Playlist
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleFormSubmit}>
            <label>
              Playlist Name:
              <input
                className="playlist-input"
                type="text"
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
              />
            </label>
            <button className="created-btn" type="submit">
              Create Playlist
            </button>
          </form>
        )}

        {!playlist && (
          <div>
            <h2>No playlists found</h2>
          </div>
        )}

        {playlist && (
          <ul className="contained-videos">
            <li className="playlist-video-desc playlist-video">
              <span></span>
              <span className="playlist-video-idv"><b>Playlist Name</b></span>
              <span className="playlist-video-idv">
                <b>
                  Number of Videos
                </b>
              </span>
              <span className="playlist-video-idv"><b>Top Category</b></span>
              <span className="playlist-video-idv"></span>
            </li>
            {playlist.map((playlist, idx) => {
              return (
                <li className="playlist-video" key={playlist.playlistID}>
                  <Link to={`../playlistinfo/${playlist.playlistID}`}>
                    <img className="thumbnail" src={getThumbnail(playlistStats[idx].firstID)} />
                  </Link>
                  <Link to={`../playlistinfo/${playlist.playlistID}`}>
                    <span className="playlist-video-idv">
                      {playlist.playlistName}
                    </span>
                  </Link>
                  <span className="playlist-video-idv">
                    {playlistStats[idx].numVideos.toLocaleString("en-US")}
                  </span>
                  <span className="playlist-video-idv">{getCategoryName(playlistStats[idx].topCategory)}</span>
                  <span>
                    <button
                      className="btn"
                      onClick={() => {if(window.confirm('Are you sure you want to delte this playlist?'))handleDelete(playlist.playlistID)}}
                    >
                      DELETE
                    </button>
                  </span>
                  <ToastContainer />
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Playlists;
