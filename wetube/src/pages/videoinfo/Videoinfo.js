import React from "react";
import { useParams } from 'react-router-dom';
import "./videoinfo.css";


const Videoinfo = () => {
  const { id } = useParams();

  // TODO: Replace this with API call to get SQL data
  const video_id = "8Go6dHuylyM?si=a0ReF-8x9-PxVL6k";

  return (
    <div>
      <h2>
        Video {id}
      </h2>
      <iframe 
        width="560" height="315"
        src={`https://www.youtube-nocookie.com/embed/${video_id}`}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen>
      </iframe>
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
