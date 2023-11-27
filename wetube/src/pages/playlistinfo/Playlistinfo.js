import React from "react";
import { useParams } from 'react-router-dom';
import "./playlistinfo.css";

function getThumbnail(videoId) { 
  return `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`
}

// Placeholder playlist of videos approximating the data stored by our database
const placeholderPlaylist = [
  {
    video_id: "Wdjh81uH6FU",
    title: "Happy Cat",
    channel: "bob123",
    views: 1000000
  },
  {
    video_id: "Wdjh81uH6FU",
    title: "Unhappy Cat",
    channel: "jim345",
    views: 123456
  },
  {
    video_id: "Wdjh81uH6FU",
    title: "I am already out of fake video ideas",
    channel: "John's Channel",
    views: 2
  }
];

const Playlistinfo = () => {
  const { id } = useParams();
  return (
    <div>
      <h2>
        Playlist {id}
      </h2>
      <img className="playlist-pic" alt="playlist preview" src={getThumbnail(placeholderPlaylist[0].video_id)}/>
      <PlaylistVideos playlistId={id}/>
    </div>
  );
};

const PlaylistVideos = (props) => {
  // TODO: Replace placeholderPlaylist with parsed array from API call
  return (
    <div>
      <ul className="playlist-formatted">
        {placeholderPlaylist.map((video) => {
          return <li>
            <img src={getThumbnail(video.video_id)} alt="video thumbnail" className="thumbnail"/>
            <span>Title: {video.title}</span>
            <span>Channel: {video.channel}</span>
            <span>Views: {video.views}</span>
            <button className="btn">REMOVE</button>
          </li>;
        })}
      </ul>
    </div>
  );
}

export default Playlistinfo;
