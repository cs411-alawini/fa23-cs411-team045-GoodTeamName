import React, {useState, useEffect} from "react";
import { useParams, Link } from 'react-router-dom';
import "./playlistinfo.css";
import pencil from "../../imgs/pencil.svg";

export const getThumbnail = (videoId) => {
  return `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
};


// Placeholder playlist of videos approximating the data stored by our database
export const placeholderPlaylist = [
  {
    video_id: "Wdjh81uH6FU",
    title: "Happy Cat",
    channel: "bob123",
    views: 1000000,
  },
  {
    video_id: "Wdjh81uH6FU",
    title: "Unhappy Cat",
    channel: "jim345",
    views: 123456,
  },
  {
    video_id: "Wdjh81uH6FU",
    title: "I am already out of fake video ideas",
    channel: "John's Channel",
    views: 2,
  },
];

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
  const [deleted, setDeleted] = useState(false);
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
            console.log("Empty response");
            setFailed(true);
          } else {
            setTitle(data[0].playlistName);
            setOwnerID(data[0].userID);
            console.log("resetting...");
          }
        });
    } catch (err) {
      console.log("error");
      console.error(err);
      setLoading(false);
      setFailed(true);
    }
  }, [id, setDeleted]);

  useEffect(() => {
    if (ownerID !== -1 && user.id != ownerID) {
      try {
        console.log("fetching owner name");
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
        console.log("error");
        console.error(err);
        setLoading(false);
        setFailed(true);
      }
    }
  }, [ownerID])

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
  }, [playListID, removeVideo]);

  // Removes video from playlist
  async function removeVideo(videoID) {
    console.log("Deleting...");
    try {
      fetch(`http://localhost:8080/playlist/${playListID}/${videoID}`, {
          method: "DELETE"
      }).then(() => {
        return true;
      })
    } catch (err) {
      console.error(err);
      console.log("error");
      return false;
    }
  }

  async function deletePlaylist() {
    console.log("Deleting playlist");
    try {
      fetch(`http://localhost:8080/playlist/${playListID}`, {
          method: "DELETE"
      }).then(() => {
        setDeleted(true);
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
      <div>
        <ul className="playlist-formatted">
          <li>
            <span>Playlist is empty</span>
          </li>
        </ul>
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
            <span><button className="btn" onClick={() => removeVideo(video.videoID)}>REMOVE</button></span>
          </li>;
        })}
      </ul>
    </div>
  );
};

export default Playlistinfo;
