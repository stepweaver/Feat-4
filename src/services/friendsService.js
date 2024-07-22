import Parse from 'parse';

export const getFriends = async () => {
  const Profile = Parse.Object.extend('Profile');
  const query = new Parse.Query(Profile);
  query.equalTo('user', Parse.User.current());
  const profile = await query.first();
  if (!profile) {
    console.error('Profile not found');
    return [];
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
      console.error(`Error fetching friend details for friend ID ${friendPointer.id}:`, error);
      return { id: friendPointer.id, username: "User not found" }; // Placeholder for missing friends
    }
  });
  const friendDetails = await Promise.all(friendDetailsPromises);
  return friendDetails; // No need to filter out nulls if placeholders are used
};

export const addFriend = async (friendUserId) => {
  // Fetch the current user's profile
  const Profile = Parse.Object.extend('Profile');
  const currentUserQuery = new Parse.Query(Profile);
  currentUserQuery.equalTo('user', Parse.User.current());
  const currentUserProfile = await currentUserQuery.first();
  if (!currentUserProfile) {
    throw new Error('Current user profile not found');
  }

  // Fetch the friend's Profile using their user objectId
  const friendUserQuery = new Parse.Query(Parse.User);
  const friendUser = await friendUserQuery.get(friendUserId);
  const friendProfileQuery = new Parse.Query(Profile);
  friendProfileQuery.equalTo('user', friendUser);
  const friendProfile = await friendProfileQuery.first();
  if (!friendProfile) {
    throw new Error('Friend profile not found');
  }

  // Create a pointer to the friend's Profile object
  const friendProfilePointer = {
    __type: 'Pointer',
    className: 'Profile',
    objectId: friendProfile.id
  };

  // Add the friend's profile pointer to the current user's friends list
  currentUserProfile.addUnique('friendsList', friendProfilePointer);

  // Save the updated profile
  await currentUserProfile.save();

  // Alert the user that the friend has been added successfully
  alert(`You and ${friendUser.get('username')} are now friends! Yay!`);

  return true;
};

export const removeFriend = async (friendUserId) => {
  // Fetch the current user's profile
  const Profile = Parse.Object.extend('Profile');
  const currentUserQuery = new Parse.Query(Profile);
  currentUserQuery.equalTo('user', Parse.User.current());
  const currentUserProfile = await currentUserQuery.first();
  if (!currentUserProfile) {
    throw new Error('Current user profile not found');
  }

  // Fetch the friend's Profile using their user objectId
  const friendUserQuery = new Parse.Query(Parse.User);
  const friendUser = await friendUserQuery.get(friendUserId);
  const friendProfileQuery = new Parse.Query(Profile);
  friendProfileQuery.equalTo('user', friendUser);
  const friendProfile = await friendProfileQuery.first();
  if (!friendProfile) {
    throw new Error('Friend profile not found');
  }

  // Create a pointer to the friend's Profile object
  const friendProfilePointer = {
    __type: 'Pointer',
    className: 'Profile',
    objectId: friendProfile.id
  };

  // Remove the friend's profile pointer from the current user's friends list
  currentUserProfile.remove('friendsList', friendProfilePointer);

  // Save the updated profile
  await currentUserProfile.save();

  return true;
};

export const checkFriend = async (friendUserId) => {
  // Fetch the current user's profile
  const Profile = Parse.Object.extend('Profile');
  const currentUserQuery = new Parse.Query(Profile);
  currentUserQuery.equalTo('user', Parse.User.current());
  const currentUserProfile = await currentUserQuery.first();
  if (!currentUserProfile) {
    throw new Error('Current user profile not found');
  }

  // Fetch the friend's Profile using their user objectId
  const friendUserQuery = new Parse.Query(Parse.User);
  const friendUser = await friendUserQuery.get(friendUserId);
  const friendProfileQuery = new Parse.Query(Profile);
  friendProfileQuery.equalTo('user', friendUser);
  const friendProfile = await friendProfileQuery.first();
  if (!friendProfile) {
    throw new Error('Friend profile not found');
  }

  // Check if the friend's profile objectId is in the current user's friends list
  const friendsList = currentUserProfile.get('friendsList') || [];
  const isFriend = friendsList.some(friendPointer => friendPointer.objectId === friendProfile.id);

  return isFriend;
};
