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

const Friend = ({ friend, onDeleteFriend }) => (
  <div className="friend">
    <img src={friend.image} alt={friend.name} />
    <div className="name">{friend.name}</div>
    <button onClick={() => onDeleteFriend(friend)}>Delete Friend</button>
  </div>
);

// ...

const Recommendation = ({ recommendation, onAddFriend }) => (
  <div className="recommendation">
    <img src={recommendation.image} alt={recommendation.name} />
    <div className="name">{recommendation.name}</div>
    <div className="common-interest">She also likes {recommendation.commonInterest}</div>
    <button onClick={() => onAddFriend(recommendation)}>Add Friend</button>
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

  const handleAddFriend = (friend) => {
    setFriendsList([...friendsList, friend]);
    setRecommendations(recommendations.filter((r) => r !== friend));
  };


  const handleDeleteFriend = (friend) => {
    setFriendsList(friendsList.filter((f) => f !== friend));
    setRecommendations([...recommendations, friend]);
  };


  return (
    <div id="content">
      <div id="recommendations">
        {recommendations.map((recommendation, i) => (
          <Recommendation
            key={i}
            recommendation={recommendation}
            onAddFriend={handleAddFriend}
          />
        ))}
      </div>
      <div id="friends-list">
        {friendsList.map((friend, i) => (
          <Friend
            key={i}
            friend={friend}
            onDeleteFriend={handleDeleteFriend}
          />
        ))}
      </div>
    </div>
  );
};

// ...

export default FriendPage;
