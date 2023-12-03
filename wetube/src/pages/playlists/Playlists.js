import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "./playlists.css";
import userEvent from "@testing-library/user-event";

// const placeholderPlaylists = [
//   {
//     playlistName: "playlist1",
//     video_counts: 3,
//     category: "Cats",
//     id: 1,
//   },
//   {
//     playlistName: "playlist2",
//     video_counts: 3,
//     category: "Cats",
//     id: 1,
//   },
//   {
//     playlistName: "playlist2",
//     video_counts: 3,
//     category: "Cats",
//     id: 1,
//   },
// ];

const Playlists = () => {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [toDelete, setToDelete] = useState("");

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const userID = 1;
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

    fetchPlaylists();
  }, [id]);

  useEffect(() => {
    if (toDelete !== "") {
      const newPlaylist = playlist.filter(
        (playlist) => playlist.playlistID !== toDelete
      );
      setPlaylist(newPlaylist);
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

  // TODO: replace with standardized failure page
  if (failed) {
    return (
      <div>
        <h2>Playlists not found :(</h2>
      </div>
    );
  }

  // const { error, playlist } = useDocument("projects", id); // id is the playlist id

  // const { deleteDocument } = useFirestore("projects");
  // const { user } = useAuthContext();
  // const history = useHistory();

  const handleClicks = (playlistID) => {
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
        toast.success("Playlist deleted successfully");
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

  return (
    <div className="playlist-container">
      <div>
        <div className="playlist-detail">
          <h2 className="playlist-title">Playlists</h2>

          <div className="contained-videos">
            <div className="playlist-video-desc">
              <p className="playlist-video-idv">Playlist Name</p>
              <p className="playlist-video-idv">Number of Videos Contained </p>
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
                  <p className="playlist-video-idv">{playlist.video_counts} </p>
                  <p className="playlist-video-idv">{playlist.category}</p>
                  <button
                    className="btn"
                    onClick={() => handleClicks(playlist.playlistID)}
                  >
                    DELETE
                  </button>
                  <ToastContainer />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>

    // <div className="playlist-container">
    //   <div>
    //     <div className="playlist-detail">
    //       <h2 className="page-title">{playlist.playlistName}</h2>

    //       <h4>Playlist contains:</h4>
    //       <div className="contained videos">
    //         {/* {playlist.assignedUsersList.map((user) => (
    //           <div className="assignee" key={user.id}>
    //             <Avatar src={user.photoURL} />
    //             <span>{user.displayName} </span>
    //           </div>
    //         ))} */}
    //       </div>
    //     </div>
    //   </div>
    //   <button className="btn" onClick={handleClick}>
    //   Mark as Complete
    // </button>
    // </div>
  );
};

export default Playlists;
