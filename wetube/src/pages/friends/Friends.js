// import React, { useState, useEffect } from "react";

// const FriendPage = () => {
//   const [friends, setFriends] = useState([]);
//   const [recommendations, setRecommendations] = useState([]);
//   const storedUser = sessionStorage.getItem("currentUser");
//   const data = JSON.parse(storedUser);
//   const user = data.user;
//   console.log(user);

//   useEffect(() => {
//     // Fetch friends list
//     fetch(`http://localhost:8080/friendslist/${user.id}/friends`)
//       .then((response) => response.json())
//       .then((data) => setFriends(data))
//       .catch((error) => console.log(error));

//     // Fetch friend recommendations
//     fetch(`http://localhost:8080/friendslist/${user.id}/recommendations`)
//       .then((response) => response.json())
//       .then((data) => setRecommendations(data))
//       .catch((error) => console.log(error));
//   }, []);

//   const handleAddFriend = (friendId) => {
//     // Add friend to the user's friends list
//     fetch(`http://localhost:8080/friendslist/${user.id}/friends`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ friendId }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         // Remove the added friend from recommendations
//         setRecommendations((prevRecommendations) =>
//           prevRecommendations.filter((r) => r.userId !== friendId)
//         );

//         // Add the friend to the friends list
//         setFriends((prevFriends) => [
//           ...prevFriends,
//           recommendations.find((r) => r.userId === friendId),
//         ]);
//       })
//       .catch((error) => console.log(error));
//   };

//   const handleDeleteFriend = (friendId) => {
//     // Remove friend from the user's friends list
//     fetch(`http://localhost:8080/friendslist/${user.id}/friends/${friendId}`, {
//       method: "DELETE",
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         // Remove the deleted friend from friends list
//         setFriends((prevFriends) =>
//           prevFriends.filter((f) => f.userId !== friendId)
//         );

//         // Add the friend back to recommendations
//         setRecommendations((prevRecommendations) => [
//           ...prevRecommendations,
//           friends.find((f) => f.userId === friendId),
//         ]);
//       })
//       .catch((error) => console.log(error));
//   };

//   return (
//     <div>
//       <h2>Friends</h2>
//       <ul>
//         {friends.map((friend) => (
//           <li key={friend.userId}>
//             {friend.username}
//             <button onClick={() => handleDeleteFriend(friend.userId)}>
//               Delete Friend
//             </button>
//           </li>
//         ))}
//       </ul>

//       <h2>Recommendations</h2>
//       <ul>
//         {recommendations.map((recommendation) => (
//           <li key={recommendation.userId}>
//             {recommendation.username}
//             <button onClick={() => handleAddFriend(recommendation.userId)}>
//               Add Friend
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default FriendPage;


import React, { useState, useEffect } from "react";
import './friends.css';
import logo from "../../imgs/logo.png";

const COUNTRY_CODES = {
  BR: "Brazil",
  CA: "Canada",
  DE: "Germany",
  FR: "France",
  GB: "United Kingdom",
  IND: "India",
  JP: "Japan",
  KR: "Korea",
  MX: "Mexico",
  RU: "Russia",
  US: "United States",
};


const Friend = ({ friend, onDeleteFriend }) => (
  <div className="friend">
    <div className="details">
      <img src={logo} alt={friend.username} />
      <div className="name">{friend.username}</div>
    </div>
    <button onClick={() => onDeleteFriend(friend.userId)}>Delete Friend</button>
  </div>
);

// const Recommendation = ({ recommendation, onAddFriend }) => (
//   <div className="recommendation">
//     <div className="details">
//       <img src={logo} alt={recommendation.username} />
//       <div className="name">{recommendation.username}</div>
//       <div className="common-interest">She also likes Music</div>
//     </div>
//     <button onClick={() => onAddFriend(recommendation.userId)}>Add Friend</button>
//   </div>
// );

const Recommendation = ({ recommendation, onAddFriend }) => (
  <div className="recommendation">
    <div className="details">
      <img src={logo} alt={recommendation.username} />
      <div className="name">{recommendation.username}</div>
      <div className="common-interest">
        {recommendation.userRegion
          ? `He's also from ${COUNTRY_CODES[recommendation.userRegion]}`
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

  // useEffect(() => {
  //   fetch(`http://localhost:8080/friendslist/${user.id}/friends`)
  //     .then((response) => response.json())
  //     .then((data) => setFriends(data))
  //     .catch((error) => console.log(error));

  //   fetch(`http://localhost:8080/friendslist/${user.id}/recommendations`)
  //     .then((response) => response.json())
  //     .then((data) => setRecommendations(data))
  //     .catch((error) => console.log(error));
  // }, []);

  useEffect(() => {
    fetch(`http://localhost:8080/friendslist/${user.id}/friends`)
      .then((response) => response.json())
      .then((data) => setFriends(data))
      .catch((error) => console.log(error));
  
    fetch(`http://localhost:8080/friendslist/${user.id}/recommendations`)
      .then((response) => response.json())
      .then((data) => {
        setRecommendations([...data.sameRegion, ...data.friendOfFriend]);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleAddFriend = (friendId) => {
    fetch(`http://localhost:8080/friendslist/${user.id}/friends`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ friendId }),
    })
      .then((response) => response.json())
      .then((data) => {
        setRecommendations((prevRecommendations) =>
          prevRecommendations.filter((r) => r.userId !== friendId)
        );
        setFriends((prevFriends) => [
          ...prevFriends,
          recommendations.find((r) => r.userId === friendId),
        ]);
      })
      .catch((error) => console.log(error));
  };

  const handleDeleteFriend = (friendId) => {
    fetch(`http://localhost:8080/friendslist/${user.id}/friends/${friendId}`, {
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
