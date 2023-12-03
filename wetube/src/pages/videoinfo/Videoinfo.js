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
  // TODO: Remove this. Just conneciton test.
  // const [message, setMessage] = useState("");

  useEffect(() => {
    try {
      fetch(`http://localhost:8080/video/${id}`)
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
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
  }, [id]);

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

  return (
    <div className="video-info">
      <h2 className="video-title">{video.videoTitle}</h2>
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
  );
};

export default Videoinfo;
