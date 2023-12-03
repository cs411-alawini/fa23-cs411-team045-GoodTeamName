import React, { useEffect, useState } from 'react';
import './friends.css';

// Mock data
const mockFriendsList = [
  { name: 'Friend 1', image: 'https://via.placeholder.com/50' },
  { name: 'Friend 2', image: 'https://via.placeholder.com/50' },
  // Add more friends...
];

const mockRecommendations = [
  { name: 'User 1', image: 'https://via.placeholder.com/50', commonInterest: 'Music' },
  { name: 'User 2', image: 'https://via.placeholder.com/50', commonInterest: 'Sports' },
  // Add more recommendations...
];

const Friend = ({ friend }) => (
  <div className="friend">
    <img src={friend.image} alt={friend.name} />
    <div className="name">{friend.name}</div>
  </div>
);

const Recommendation = ({ recommendation }) => (
  <div className="recommendation">
    <img src={recommendation.image} alt={recommendation.name} />
    <div className="name">{recommendation.name}</div>
    <div className="common-interest">She also likes {recommendation.commonInterest}</div>
  </div>
);

const FriendPage = () => {
  const [friendsList, setFriendsList] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    // Mock fetching friends list and recommendations
    setFriendsList(mockFriendsList);
    setRecommendations(mockRecommendations);
  }, []);

  return (
    <div id="content">
      <div id="recommendations">
        {recommendations.map((recommendation, i) => (
          <Recommendation key={i} recommendation={recommendation} />
        ))}
      </div>
      <div id="friends-list">
        {friendsList.map((friend, i) => (
          <Friend key={i} friend={friend} />
        ))}
      </div>
    </div>
  );
};

export default FriendPage;
