import React from "react";
import { useParams } from "react-router-dom";
import "./playlists.css";

const Playlists = () => {
  const { id } = useParams();
  // const { error, playlist } = useDocument("projects", id); // id is the playlist id

  // const { deleteDocument } = useFirestore("projects");
  // const { user } = useAuthContext();
  // const history = useHistory();

  // const handleClick = (e) => {
  //   e.preventDefault();
  //   deleteDocument(project.id);
  //   history.push("/");
  // };

  return (
    <div className="playlist-container">
      <div>
        <div className="playlist-detail">
          <h2 className="playlist-title">PlaylistName</h2>

          <h4>Playlist contains:</h4>
          <div className="contained-videos">
            <div className="playlist-video">
              <p className="playlist-video-idv">VideoName</p>
              <p className="playlist-video-idv">VideoChannel</p>
              <p className="playlist-video-idv">VideoCategory</p>
            </div>
          </div>
        </div>
      </div>
      <button className="btn">DELETE</button>
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
