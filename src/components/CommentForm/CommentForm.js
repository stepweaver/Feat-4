import React, { useState } from 'react';

const CommentForm = ({ onSubmitComment }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitComment(comment);
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder='Write a comment...'
      />
      <button type='submit'>Submit Comment</button>
    </form>
  );
};

export default CommentForm;