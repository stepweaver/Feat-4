import Parse from 'parse';

export const getFriends = async () => {
  const Profile = Parse.Object.extend('Profile');
  const query = new Parse.Query(Profile);
  query.equalTo('user', Parse.User.current());
  const profile = await query.first();
  if (!profile) {
    console.error('Profile not found'); // Changed from throwing an error to logging
    return []; // Return an empty array to indicate no friends or profile not found
  }
  const friendsList = profile.get('friendsList') || [];
  const friendDetailsPromises = friendsList.map(async (friendPointer) => {
    try {
      const friend = await friendPointer.fetch();
      return {
        id: friend.id,
        username: friend.get('username')
      };
    } catch (error) {
      console.error('Error fetching friend details:', error);
      return null; // Return null or a placeholder object for failed fetches
    }
  });
  const friendDetails = await Promise.all(friendDetailsPromises);
  return friendDetails.filter(details => details !== null); // Filter out nulls or placeholders
};

export const addFriend = async (friendId) => {
  // Fetch the current user's profile
  const Profile = Parse.Object.extend('Profile');
  const query = new Parse.Query(Profile);
  query.equalTo('user', Parse.User.current());
  const profile = await query.first();
  if (!profile) {
    throw new Error('Profile not found');
  }

  // Create a pointer to the friend's profile
  const friendProfilePointer = {
    __type: 'Pointer',
    className: 'Profile',
    objectId: friendId
  };

  // Add the friend's profile pointer to the current user's friends list
  profile.addUnique('friendsList', friendProfilePointer);

  // Save the updated profile
  await profile.save();

  return true;
};

export const removeFriend = async (friendId) => {
  // Fetch the current user's profile
  const Profile = Parse.Object.extend('Profile');
  const query = new Parse.Query(Profile);
  query.equalTo('user', Parse.User.current());
  const profile = await query.first();
  if (!profile) {
    throw new Error('Profile not found');
  }

  // Create a pointer to the friend's profile
  const friendProfilePointer = {
    __type: 'Pointer',
    className: 'Profile',
    objectId: friendId
  };

  // Remove the friend's profile pointer from the current user's friends list
  profile.remove('friendsList', friendProfilePointer);

  // Save the updated profile
  await profile.save();

  return true;
};

export const checkFriend = async (friendId) => {
  // Fetch the current user's profile
  const Profile = Parse.Object.extend('Profile');
  const query = new Parse.Query(Profile);
  query.equalTo('user', Parse.User.current());
  const profile = await query.first();
  if (!profile) {
    throw new Error('Profile not found');
  }

  // Create a pointer to the friend's profile
  const friendProfilePointer = {
    __type: 'Pointer',
    className: 'Profile',
    objectId: friendId
  };

  // Check if the friend's profile pointer is in the current user's friends list
  const friendsList = profile.get('friendsList') || [];
  return friendsList.some(friend => friend.id === friendId);
}
