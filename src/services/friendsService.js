import Parse from 'parse';

export const getFriendsList = async () => {
  const currentUser = Parse.User.current();
  if (!currentUser) {
    console.error('No user logged in');
    return [];
  }

  try {
    const profileQuery = new Parse.Query('Profile');
    profileQuery.equalTo('user', currentUser);
    const userProfile = await profileQuery.first();
    if (!userProfile) {
      console.error('User profile not found');
      return [];
    }

    const friendsList = userProfile.get('friendsList');
    const friendsQuery = new Parse.Query(Parse.User);
    friendsQuery.containedIn('objectId', friendsList);
    const friends = await friendsQuery.find();
    return friends.map(friend => ({
      id: friend.id,
      username: friend.get('username'),
    }))
  } catch (error) {
    console.error('Error fetching friends list:', error);
    return [];
  }
}