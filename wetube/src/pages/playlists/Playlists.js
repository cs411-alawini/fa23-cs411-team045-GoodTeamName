import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "./playlists.css";

const Playlists = () => {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [toDelete, setToDelete] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [playlistName, setPlaylistName] = useState("");

  const storedUser = sessionStorage.getItem("currentUser");
  const data = JSON.parse(storedUser);
  const user = data.user;
  console.log(user);

  const fetchPlaylists = async () => {
    try {
      const userID = user.id;
      const response = await fetch(
        `http://localhost:8080/playlist?userID=${userID}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();

      setLoading(false);

      if (data.length === 0) {
        // no playlists found
        setFailed(true);
      } else {
        setPlaylist(data);
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      setFailed(true);
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, [id]);

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

  useEffect(() => {
    fetchPlaylists();
  }, [playlist]);

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
        `http://localhost:8080/playlist/${playlistID}`,
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
      const response = await fetch("http://localhost:8080/playlist", {
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
      <div>
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
            <div className="contained-videos">
              <div className="playlist-video-desc">
                <p className="playlist-video-idv">Playlist Name</p>
                <p className="playlist-video-idv">
                  Number of Videos Contained{" "}
                </p>
                <p className="playlist-video-idv">Majority of the Category</p>
                <p className="playlist-video-idv">Delete</p>
              </div>
              {playlist.map((playlist) => {
                return (
                  <div className="playlist-video" key={playlist.playlistID}>
                    <Link to={`../playlistinfo/${playlist.id}`}>
                      <p className="playlist-video-idv">
                        {playlist.playlistName}
                      </p>
                    </Link>
                    <p className="playlist-video-idv">
                      {playlist.video_counts}{" "}
                    </p>
                    <p className="playlist-video-idv">{playlist.category}</p>
                    <button
                      className="btn"
                      onClick={() => handleDelete(playlist.playlistID)}
                    >
                      DELETE
                    </button>
                    <ToastContainer />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Playlists;
