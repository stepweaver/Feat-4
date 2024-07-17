import Parse from "parse";

export const getAllComments = async () => {
  const Comment = Parse.Object.extend("Comment");
  const query = new Parse.Query(Comment);
  query.include("user"); // Include the user details in the query
  query.descending("createdAt"); // Sort comments by creation date in descending order

  try {
    const results = await query.find();
    console.log("Comment results from Parse:", results); // Logging the raw results
    return results.map((comment) => ({
      id: comment.id,
      text: comment.get("comment"),
      user: comment.get("user")?.get("username"), // Fetch the username directly
      createdAt: comment.get("createdAt"), // Include creation date
    }));
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
};

export const addComment = async (commentText) => {
  const Comment = new Parse.Object("Comment"); // Create a new Parse Object for 'Comment'
  Comment.set("comment", commentText); // Set the comment text
  Comment.set("user", Parse.User.current()); // Set the current user

  try {
    await Comment.save(); // Save the comment object to the Parse server
    return true; // Return true if save is successful
  } catch (error) {
    console.error("Error while creating comment: ", error); // Log any errors
    return false; // Return false if there is an error
  }
};
