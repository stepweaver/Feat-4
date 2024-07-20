import Parse from "parse";

export const getAllComments = async () => {
  const Comment = Parse.Object.extend("Comment");
  const query = new Parse.Query(Comment);
  query.include("user"); // Include the user details in the query
  query.descending("createdAt"); // Sort comments by creation date in descending order
  query.limit(50);

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
  const Comment = new Parse.Object("Comment");
  Comment.set("comment", commentText);
  Comment.set("user", Parse.User.current());

  try {
    await Comment.save();

    // Check the total number of comments and delete the oldest one if there are more than 50
    const commentQuery = new Parse.Query(Comment);
    const count = await commentQuery.count();
    if (count > 50) {
      commentQuery.ascending("createdAt");
      const oldestComment = await commentQuery.first();
      if (oldestComment) {
        await oldestComment.destroy();
      }
    }

    return true;
  } catch (error) {
    console.error("Error while creating comment: ", error);
    return false;
  }
};
