import Parse from 'parse';

const getAllComments = async (userId) => {
  const Comment = Parse.Object.extend('Comment');
  const query = new Parse.Query(Comment);

  query.equalTo('user', Parse.User.createWithoutData(userId));

  try {
    const results = await query.find();
    return results.map((comment) => ({
      id: comment.id,
      text: comment.get('comment'),
      user: comment.get('user'),
    }));
  } catch (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
};

export { getAllComments };