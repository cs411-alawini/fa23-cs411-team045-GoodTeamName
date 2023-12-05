import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./videoinfo.css";
import YouTubeEmbed from "../../components/thumbnail/Thumbnail";
import getCategoryName from "../../GetCategory";
import PlaylistModal from "../../components/playlistmodal/Playlistmodal";
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
  // Are we currently adding the video to a playlist?
  const [addingTo, setAddingTo] = useState(false);
  const storedUser = sessionStorage.getItem("currentUser");
  const data = JSON.parse(storedUser);
  const user = data.user;

  useEffect(() => {
    try {
      fetch(`http://localhost:8080/video/${id}`)
        .then((res) => res.json())
        .then((data) => {
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
  }, [id, addingTo]);

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

  function openModal() {
    setAddingTo(true);
  }

  function closeModal() {
    setAddingTo(false);
  }

  return (
    <div>
      <div className="video-info">
        <div className="video-header">
          <h2 className="video-title">{video.videoTitle}</h2>
          <button onClick={() => openModal()} className="btn add-to-playlist">+ Add to playlist</button>
        </div>
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
      {addingTo ? <PlaylistModal videoID={id} user={user} toClose={closeModal} /> : null}
    </div>
  );
};

export default Videoinfo;
