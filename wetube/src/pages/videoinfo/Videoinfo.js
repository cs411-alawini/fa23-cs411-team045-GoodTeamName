import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./videoinfo.css";
import YouTubeEmbed from "../../components/thumbnail/Thumbnail";
import getCategoryName from "../../GetCategory";
/* Video object structure
{
  "videoID": string,
  "videoTitle": string,
  "videoCategory": string (I think),
  "videoView":int,
  "videoLikes":int,
  "channel": string
}

*/

const Videoinfo = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  // Are we currently adding the video to a playlist?
  const [addingTo, setAddingTo] = useState(false);
  const storedUser = sessionStorage.getItem("currentUser");
  const data = JSON.parse(storedUser);
  const user = data.user;

  useEffect(() => {
    try {
      fetch(`http://localhost:8080/video/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          if (data.length === 0) {
            // Video not found
            setFailed(true);
          } else {
            setVideo(data[0]);
          }
        });
    } catch (err) {
      console.error(err);
      setLoading(false);
      setFailed(true);
    }
  }, [id, addingTo]);

  // TODO: Replace with standardized loading graphic
  if (loading) {
    return (
      <div>
        <h2>Video loading...</h2>
      </div>
    );
  }

  // TODO: replace with standardized failure page
  if (failed) {
    return (
      <div>
        <h2>Video not found :(</h2>
      </div>
    );
  }

  function openModal() {
    setAddingTo(true);
  }

  function closeModal() {
    setAddingTo(false);
  }

  return (
    <div>
      <div className="video-info">
        <div className="video-header">
          <h2 className="video-title">{video.videoTitle}</h2>
          <button onClick={() => openModal()} className="btn add-to-playlist">+ Add to playlist</button>
        </div>
        <div className="video-card no-side-margin">
          <YouTubeEmbed videoId={id} />
        </div>
        <ul className="video-details">
          <li className="video-detail">Channel:<div className="detail-value">{video.channel}</div></li>
          <li className="video-detail">Views:<div className="detail-value">{video.videoView.toLocaleString("en-US")}</div></li>
          <li className="video-detail">Likes:<div className="detail-value">{video.videoLikes.toLocaleString("en-US")}</div></li>
          <li className="video-detail">Category:<div className="detail-value">{getCategoryName(video.videoCategory)}</div></li>
        </ul>
      </div>
      {addingTo ? <PlaylistModal videoID={id} user={user} toClose={closeModal} /> : null}
    </div>
  );
};

function PlaylistModal(props) {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState([]);

  useEffect(() => {
    try {
      async function fetchPlaylists() {
        let res = await fetch(`http://localhost:8080/playlist?userID=${props.user.id}`);
        return await res.json();
      }
      
      async function fetchAdded(tempPlaylists) {
        let res = await fetch(`http://localhost:8080/video/${props.videoID}/p`);
        let existingData = await res.json();
        existingData = existingData.map((playlistObj) => playlistObj.playListID)
        let buttons = [];
        // Update buttons to reflect which playlists the video is already in
        if (existingData.length > 0) {
          buttons = tempPlaylists.map(() => false);
          for (let i = 0; i < tempPlaylists.length; i++) {
            if (existingData.includes(tempPlaylists[i].playlistID)) {
              buttons[i] = true;
            }
          }
        }
        return buttons;
      }

      const fetchBoth = async () => {
        const tempPlaylists = await fetchPlaylists();
        const tempAdded = await fetchAdded(tempPlaylists);
        setPlaylists(tempPlaylists)
        setAdded(tempAdded);
        setLoading(false);
      };

      fetchBoth();
    } catch (err) {
      console.error(err);
    }
    
  }, [props.user.id]);

  if (loading) {
    return (
      <div className="modal">
        <div className="modal-window">
          <h3>Select a Playlist</h3>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (playlists.length === 0) {
    return (
      <div className="modal">
        <div className="modal-window">
          <h3>Select a Playlist</h3>
          <p>No playlists found</p>
        </div>
      </div>
    );
  }

  async function addToPlaylist(e, idx) {
    let newAdded = [...added];
    newAdded[idx] = true;
    setAdded(newAdded);

    try {
      await fetch(`http://localhost:8080/playlist/${e.target.value}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({videoID: props.videoID})
      })
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="modal">
      <div className="modal-window">
        <button className='close-button' onClick={() => props.toClose()}><p>&#10005;</p></button>
        <div className="modal-content">
          <h3>Select a Playlist</h3>
          <ul className="playlists-to-pick">
            {playlists.map((playlist, idx) => {
              return( 
                <li key={playlist.playlistID}>
                  <span>{playlist.playlistName}</span>
                  { added[idx] ?
                    <span className="btn added">Added</span>
                    :
                    <button className="btn" onClick={(e) => addToPlaylist(e, idx)} value={playlist.playlistID}>+ Add</button>
                  }
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Videoinfo;
