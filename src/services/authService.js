import Parse from "parse";

export const createUser = async (newUser) => {
  const user = new Parse.User();

  user.set("firstName", newUser.firstName);
  user.set("lastName", newUser.lastName);
  user.set("email", newUser.email);
  user.set("username", newUser.email); // Ensure the username is set to a valid value
  user.set("password", newUser.password);

  console.log("User object before signUp:", user.toJSON()); // Log the user object

  try {
    const newUserSaved = await user.signUp();
    console.log("User signed up successfully:", newUserSaved);

    // Create a new profile and link it to the newly created user
    const Profile = Parse.Object.extend("Profile");
    const profile = new Profile();
    profile.set("user", newUserSaved);
    profile.set("username", newUserSaved.get("username")); // Add username to profile
    profile.set("caughtPokemon", []);
    await profile.save();

    console.log("Profile created successfully:", profile);
    return newUserSaved;
  } catch (error) {
    console.error("Error during sign up:", error); // Log the error
    alert(`Error: ${error.message}`);
    return null;
  }
};

// Used in login component
export const loginUser = async (currUser) => {
  try {
    const user = await Parse.User.logIn(currUser.email, currUser.password);
    console.log("Logged in user: ", user);

    // Fetch the user's profile and caught Pokémon
    const query = new Parse.Query("Profile");
    query.equalTo("user", user);
    const profile = await query.first();
    const caughtPokemon = profile.get("caughtPokemon");

    // Save the caught Pokémon to local storage or some global state
    localStorage.setItem("caughtPokemon", JSON.stringify(caughtPokemon));
    return user;
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
};

// Used in logout component
export const logoutUser = (navigate) => {
  return Parse.User.logOut()
    .then(() => {
      navigate("/unauthorized"); // Navigate to the unauthorized page after logging out
    })
    .catch((error) => {
      alert(`Error: ${error.message}`); // Alert the user if there's an error
    });
};

export const checkUser = () => {
  const currentUser = Parse.User.current();
  return !!currentUser; // Check if there is a current user logged in
};
