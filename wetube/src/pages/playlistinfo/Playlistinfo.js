import React, {useState, useEffect, useReducer} from "react";
import { useParams, Link } from 'react-router-dom';
import "./playlistinfo.css";
import pencil from "../../imgs/pencil.svg";
import YouTubeEmbed from "../../components/thumbnail/Thumbnail";
import RandomVid from "../../components/randomvid/RandomVid";

export const getThumbnail = (videoId) => {
  return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
};

const Playlistinfo = () => {
  const { id } = useParams();
  const [playListID, setPlayListID] = useState(id);
  const [ownerID, setOwnerID] = useState(-1);
  const [ownerName, setOwnerName] = useState("unknown");
  const [videos, setVideos] = useState([]);
  const [title, setTitle] = useState("Playlist");
  const [rename, setRename] = useState("");
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [editable, setEditable] = useState(false);
  const [deleted, setDeleted] = useState(0);
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const storedUser = sessionStorage.getItem("currentUser");
  const data = JSON.parse(storedUser);
  const user = data.user;

  useEffect(() => {
    try {
      fetch(`http://localhost:8080/playlist/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          if (data.length === 0) {
            // Playlist not found
            setFailed(true);
          } else {
            setTitle(data[0].playlistName);
            setOwnerID(data[0].userID);
          }
        });
    } catch (err) {
      console.log("error");
      console.error(err);
      setLoading(false);
      setFailed(true);
    }
  }, [id, deleted]);

  // Get the owner of a playlist if you're viewing one that isn't yours
  useEffect(() => {
    if (ownerID !== -1 && user.id != ownerID) {
      try {
        fetch(`http://localhost:8080/user/${ownerID}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.length === 0) {
              setOwnerName("Unknown :/");
            } else {
              setOwnerName(data[0].userName);
            }
          });
      } catch (err) {
        // console.log("error");
        console.error(err);
        setLoading(false);
        setFailed(true);
      }
    }
  }, [ownerID])

  // Get the videos from a playlist
  useEffect(() => {
    try {
      fetch(`http://localhost:8080/playlist/${playListID}/v`)
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          if (data.length > 0) {
            // Playlist not empty
            setVideos(data);
          }
        });
    } catch (err) {
      console.error(err);
      setLoading(false);
      setFailed(true);
    }
  }, [playListID, removeVideo, deleted]);

  // Removes video from playlist
  async function removeVideo(videoID) {
    try {
      await fetch(`http://localhost:8080/playlist/${playListID}/${videoID}`, {
          method: "DELETE"
      });
      let vidRemoved = [];
      for (let i = 0; i < videos.length; i++) {
        if (videos[i].videoID !== videoID) {
          vidRemoved.push(videos[i]);
        }
      }
      setVideos(vidRemoved);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async function deletePlaylist() {
    console.log("Deleting playlist");
    try {
      fetch(`http://localhost:8080/playlist/${playListID}`, {
          method: "DELETE"
      }).then(() => {
        setDeleted(deleted + 1);
        return true;
      })
    } catch (err) {
      console.error(err);
      console.log("error");
      return false;
    }
  }

  const updateRename = async (event) => {
    setRename(event.target.value);
  }

  async function submitRename() {
    setEditable(false);
    try {
      fetch(`http://localhost:8080/playlist/${playListID}`, {
          method: "PUT",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({"playlistName": rename})
      }).then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === "Error") {
          alert(`Error: ${data.message}`);
        } else {
          setTitle(rename);
        }
      })
    } catch (err) {
      console.error(err);
      if (err)
      return false;
    }
  }

  // TODO: Replace with standardized loading graphic
  if (loading) {
    return (
      <div>
        <h2>Playlist loading...</h2>
      </div>
    );
  }

  // TODO: replace with standardized failure page
  if (failed) {
    return (
      <div>
        <h2>Playlist not found :(</h2>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="empty-container">
          <h2>This playlist has no videos</h2>
          <p>Want to add this one?</p>
          <RandomVid playlistID={playListID} rerenderCallback={forceUpdate} />
      </div>
    )
  }
  
  return (
    <div>
      <div className="playlist-header">
        <img className="playlist-pic" alt="playlist preview" src={getThumbnail(videos[0].videoID)}/>
        {ownerID == user.id ? 
          (editable ? 
            <div className="playlist-overview">
              <form onSubmit={() => submitRename()}className="playlist-title">
                <input onChange={updateRename}  className="editable-title" type="text" defaultValue={title}/>
                <button type="submit" onClick={() => submitRename()}><img src={pencil}/></button>
              </form>
            </div>
              :
            <div className="playlist-overview">
              <div className="playlist-title">
                  <h2>{title}</h2> 
                  <button onClick={() => setEditable(true)}><img src={pencil}/></button>
              </div>
              <button className="btn" onClick={() => {
                if(window.confirm('Are you sure you want to delte this playlist?')){deletePlaylist()};}
              }>DELETE</button>
            </div>
          ) : 
          <div className="playlist-overview">
            <div>
              <div className="playlist-title">
                  <h2>{title}</h2>
              </div>
                <span>Owner: {ownerName}</span> 
            </div>
          </div>
        }
      </div>
      <ul className="playlist-formatted">
        <li key="column-names" className="playlist-row">
          <span/>
          <span><b>Title</b></span>
          <span><b>Channel</b></span>
          <span><b>Views</b></span>
          <span/>
        </li>
        {videos.map((video) => {
          return <li key={video.videoID} className="playlist-row">
            <Link to={`../videoinfo/${video.videoID}`}>
              <img src={getThumbnail(video.videoID)} alt="video thumbnail" className="thumbnail"/>
            </Link>
            <Link to={`../videoinfo/${video.videoID}`}>
              <span className="title">{video.videoTitle}</span>
            </Link>
            <span>{video.channel}</span>
            <span>{video.videoView.toLocaleString("en-US")}</span>
            {ownerID === user.id ?
              <span><button className="btn" onClick={() => removeVideo(video.videoID)}>REMOVE</button></span>
              :
              <span/>
            }
          </li>;
        })}
      </ul>
    </div>
  );
};

export default Playlistinfo;
