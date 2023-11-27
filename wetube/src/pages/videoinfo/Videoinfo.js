import React from "react";
import { useParams } from 'react-router-dom';
import "./videoinfo.css";
import YouTubeEmbed from "../../components/thumbnail/Thumbnail";


const Videoinfo = () => {
  const { id } = useParams();

  // TODO: Replace this with API call to get SQL data
  const videoId = "8Go6dHuylyM";

  return (
    <div>
      <h2>
        Video {id}
      </h2>
      <div className="video-card">
        <YouTubeEmbed videoId={videoId}/>
      </div>
      <ul>
        <li>Channel: placeholder</li>
        <li>Views: Placeholder</li>
        <li>Likes: Placeholder</li>
        <li>Upload Date: Placeholder</li>
        <li>Category: Placeholder</li>
      </ul>
    </div>
  );
};

export default Videoinfo;
