import React, { useEffect, useState } from 'react';
import { getFriends } from '../../Services/friendsService';

const FriendsList = () => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      const friendsList = await getFriends();
      setFriends(friendsList);
    };

    fetchFriends();
  }, []);

  return (
    <div>
      <h2>Friends List</h2>
      <ul>
        {friends.map(friend => (
          <li key={friend.id}>{friend.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default FriendsList;