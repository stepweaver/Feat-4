import Parse from 'parse';

export const getAllFriends = () => {
  const User = Parse.Object.extend('User');
  const query = new Parse.Query(User);
  return query.find().then((results) => {
    return results.map((user) => ({
      id: user.id,
      username: user.get('username'),
    }));
  });
}