import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./search.css";

const Search = () => {
  const [searchResults, setSearchResults] = useState([]);
  const { searchTerm } = useParams();

  console.log(searchTerm);

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

  return (
    <div>
      <h2>Search Results for: {searchTerm}</h2>
      <ul>
        {/* {searchResults.map((result) => (
          <li key={result.videoID}>{result.title}</li>
        ))} */}
      </ul>
    </div>
  );
};

export default Search;
