import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import "./videoinfo.css";
import YouTubeEmbed from "../../components/thumbnail/Thumbnail";


const Videoinfo = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  // TODO: Remove this. Just conneciton test.
  // const [message, setMessage] = useState("");

  useEffect(() => {
    try {
      fetch(`http://localhost:8080/video/${id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setVideo(data);
        });
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <div>
      <h2>
        Video {id}
      </h2>
      <div>
        Video is {JSON.stringify(video)}
      </div>
      <div className="video-card">
        <YouTubeEmbed videoId={id}/>
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
