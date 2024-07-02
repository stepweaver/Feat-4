import Parse from 'parse';

const addComment = async (commentText) => {
  const Comment = new Parse.Object('Comment');
  Comment.set('comment', commentText);
  Comment.set('user', Parse.User.current());
  try {
    await Comment.save();
    return true;
  } catch (error) {
    console.error('Error while creating comment: ', error);
    return false;
  }
};

export { addComment };