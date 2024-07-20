import Parse from 'parse';

export const fetchProfile = async (userId) => {
  const User = new Parse.User();
  const userQuery = new Parse.Query(User);
  userQuery.equalTo('objectId', userId);
  const user = await userQuery.first();
  if (!user) {
    console.error('User not found');
    return null;
  }

  const profileQuery = new Parse.Query('Profile');
  profileQuery.equalTo('user', user);
  const profile = await profileQuery.first();
  if (!profile) {
    console.error('Profile not found');
    return null;
  }

  return {
    id: profile.id,
    user: user.get('username'),
    caughtPokemon: profile.get('caughtPokemon')
  };
};