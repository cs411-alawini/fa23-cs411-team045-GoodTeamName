import React, {useState, useEffect} from "react";
import { useParams, Link } from 'react-router-dom';
import "./playlistinfo.css";

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
  const [videos, setVideos] = useState([]);
  const [title, setTitle] = useState("Playlist");
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

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
          }
        });
    } catch (err) {
      console.log("error");
      console.error(err);
      setLoading(false);
      setFailed(true);
    }
  }, [id, deletePlaylist]);

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
        return true;
      })
    } catch (err) {
      console.error(err);
      console.log("error");
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
        <div className="playlist-overview">
          <h2 className="playlist-title">{title}</h2>
          <button className="btn" onClick={() => {
            if(window.confirm('Are you sure you want to delte this playlist?')){deletePlaylist()};}
          }>DELETE</button>
        </div>
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
