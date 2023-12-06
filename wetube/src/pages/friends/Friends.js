import React, { useState, useEffect } from "react";
import './friends.css';
import logo from "../../imgs/logo.png";
import getCategoryName from "../../GetCategory";


const Friend = ({ friend, onDeleteFriend }) => (
  <div className="friend">
    <div className="details">
      <img src={logo} alt={friend.username} />
      <div className="name">{friend.username}</div>
    </div>
    <button onClick={() => onDeleteFriend(friend.userId)}>Delete Friend</button>
  </div>
);

const Recommendation = ({ recommendation, onAddFriend }) => (
  <div className="recommendation">
    <div className="details">
      <img src={logo} alt={recommendation.username} />
      <div className="name">{recommendation.username}</div>
      <div className="common-interest">
        {recommendation.videoCategories
          ? `Common interests: ${getCategoryName(parseInt(recommendation.videoCategories, 10))}`
          : `He is a friend of ${recommendation.friendOfName}`}
      </div>
    </div>
    <button onClick={() => onAddFriend(recommendation.userId)}>Add Friend</button>
  </div>
);

const FriendPage = () => {
  const [friends, setFriends] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  const storedUser = sessionStorage.getItem("currentUser");
  const data = JSON.parse(storedUser);
  const user = data.user;

  useEffect(() => {
    fetch(`http://35.239.242.245:8080/friendslist/${user.id}/friends`)
      .then((response) => response.json())
      .then((data) => setFriends(data))
      .catch((error) => console.log(error));
  
    fetch(`http://35.239.242.245:8080/friendslist/${user.id}/recommendations`)
      .then((response) => response.json())
      .then((data) => {
        setRecommendations([...data.sameInterest, ...data.friendOfFriend]);
      })
      .catch((error) => console.log(error));
  }, [user.id]);

  const handleAddFriend = (friendId) => {
    console.log("friendId:", friendId);
    console.log("recommendations:", recommendations);
  
    fetch(`http://35.239.242.245:8080/friendslist/${user.id}/friends`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ friendId }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data:", data);
  
        const addedFriend = recommendations.find((r) => r.userId === friendId);
        console.log("addedFriend:", addedFriend);
  
        setFriends((prevFriends) => [...prevFriends, addedFriend]);
        setRecommendations((prevRecommendations) =>
          prevRecommendations.filter((r) => r.userId !== friendId)
        );
      })
      .catch((error) => console.log(error));
  };
  
  
  
  

  const handleDeleteFriend = (friendId) => {
    fetch(`http://35.239.242.245:8080/friendslist/${user.id}/friends/${friendId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        setFriends((prevFriends) =>
          prevFriends.filter((f) => f.userId !== friendId)
        );
        setRecommendations((prevRecommendations) => [
          ...prevRecommendations,
          friends.find((f) => f.userId === friendId),
        ]);
      })
      .catch((error) => console.log(error));
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
        {friends.map((friend, i) => (
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

export default FriendPage;
