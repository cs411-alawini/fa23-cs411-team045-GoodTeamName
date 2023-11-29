import React from "react";
import { useParams } from 'react-router-dom';
import "./videoinfo.css";
import YouTubeEmbed from "../../components/thumbnail/Thumbnail";

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
  },[id]);

  // TODO: Replace with standardized loading graphic
  if (loading) {
    return (
      <div>
        <h2>
          Video loading...
        </h2>
      </div>
    )
  }

  // TODO: replace with standardized failure page
  if (failed) { 
    return (
      <div>
        <h2>
          Video not found :(
        </h2>
      </div>
    )
  }

  return (
    <div>
      <h2>
        {video.videoTitle}
      </h2>
      <div className="video-card">
        <YouTubeEmbed videoId={videoId}/>
      </div>
      <ul>
        <li>Channel: {video.channel}</li>
        <li>Views: {video.videoView}</li>
        <li>Likes: {video.videoLikes}</li>
        <li>Category: {video.videoCategory}</li>
      </ul>
    </div>
  );
};

export default Videoinfo;
