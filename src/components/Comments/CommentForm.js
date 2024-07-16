import React, { useState } from 'react';

// Define a functional component CommentForm that takes onSubmitComment as a prop
const CommentForm = ({ onSubmitComment }) => {
  const [comment, setComment] = useState(''); // Initialize comment state

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    onSubmitComment(comment); // Call onSubmitComment with current comment
    setComment(''); // Reset comment state
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

export default CommentForm; // Export the CommentForm component
