import React, { useState, useEffect } from 'react';
import { addFriend, removeFriend, checkFriend } from '../../Services/friendsService';

const AddRemoveFriend = ({ id }) => {
  const [isFriend, setIsFriend] = useState(false);

  useEffect(() => {
    const fetchFriendStatus = async () => {
      const status = await checkFriend(id);
      setIsFriend(status);
    };

    fetchFriendStatus();
  }, [id]);

  const handleAddFriend = async () => {
    const success = await addFriend(id);
    if (success) {
      console.log('Friend added successfully');
      setIsFriend(true); // Update friendship status
    }
  };

  const handleRemoveFriend = async () => {
    const success = await removeFriend(id);
    if (success) {
      console.log('Friend removed successfully');
      setIsFriend(false);
    }
  };

  return (
    <div>
      {isFriend ? (
        <button onClick={handleRemoveFriend}>Remove Friend</button>
      ) : (
        <button onClick={handleAddFriend}>Add Friend</button>
      )}
    </div>
  );
};

export default AddRemoveFriend;