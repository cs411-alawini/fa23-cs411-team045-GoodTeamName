import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getThumbnail } from "../../pages/playlistinfo/Playlistinfo";
import { Link } from "react-router-dom";
import "./search.css";
import PlaylistModal from "../../components/playlistmodal/Playlistmodal";

const Search = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [modalID, setModalID] = useState("");
  const [addingTo, setAddingTo] = useState(false);

  const { searchTerm } = useParams();

  const storedUser = sessionStorage.getItem("currentUser");
  const data = JSON.parse(storedUser);
  const user = data.user;

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/video/search/${searchTerm}`
        );
        if (response.ok) {
          const data = await response.json();
          setSearchResults(data);
        } else {
          console.error("Failed to fetch search results");
        }
      } catch (error) {
        console.error("Error fetching search results", error);
      }
    };

    fetchSearchResults();
  }, [searchTerm]);

  function openModal(event) {
    setModalID(event.target.value); // Video id corresponding to button
    setAddingTo(true);
  }

  function closeModal() {
    setAddingTo(false);
  }

  return (
    <div>
      <h2 className="search-intro">Search Results for: {searchTerm}</h2>
      {searchTerm && searchResults.length === 0 && <h3>No results found</h3>}

      <ul className="playlist-formatted">
        <li key="column-names" className="playlist-row">
          <span />
          <span>
            <b>Title</b>
          </span>
          <span>
            <b>Channel</b>
          </span>
          <span>
            <b>Views</b>
          </span>
          <span />
        </li>
        {Array.isArray(searchResults)
          ? searchResults.map((video) => {
              return (
                <li key={video.videoID} className="playlist-row">
                  <Link to={`../videoinfo/${video.videoID}`}>
                    <img
                      src={getThumbnail(video.videoID)}
                      alt="video thumbnail"
                      className="thumbnail"
                    />
                  </Link>
                  <Link to={`../videoinfo/${video.videoID}`}>
                    <span className="title">{video.videoTitle}</span>
                  </Link>
                  <span>{video.channel}</span>
                  <span>{video.videoView.toLocaleString("en-US")}</span>
                  <span><button className="btn" value={video.videoID} onClick={(e) => {openModal(e)}}>+ Add to playlist</button></span>
                </li>
              );
            })
          : null}
      </ul>
      {addingTo ? <PlaylistModal videoID={modalID} user={user} toClose={closeModal} /> : null}
    </div>
  );
};

export default Search;
