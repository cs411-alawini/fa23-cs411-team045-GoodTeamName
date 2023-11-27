import React from "react";
import { useParams } from 'react-router-dom';
import "./playlistinfo.css";

// Placeholder playlist of videos approximating the data stored by our database
const placeholderPlaylist = [
  {
    title: "Happy Cat",
    channel: "bob123",
    views: 1000000
  },
  {
    title: "Unhappy Cat",
    channel: "jim345",
    views: 123456
  },
  {
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
            <span>Title: {video.title}</span>
            <span>Channel: {video.channel}</span>
            <span>Views: {video.views}</span>
          </li>;
        })}
      </ul>
    </div>
  );
}

export default Playlistinfo;
