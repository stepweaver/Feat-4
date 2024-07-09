import Parse from "parse";

export const createUser = async (newUser) => {
  const user = new Parse.User();

  user.set("firstName", newUser.firstName);
  user.set("lastName", newUser.lastName);
  user.set("email", newUser.email);

  user.set("username", newUser.email); // Set username to email
  user.set("password", newUser.password);

  console.log("User: ", user);
  try {
    const newUserSaved = await user.signUp(); // Sign up the new user
    const Profile = Parse.Object.extend("Profile");
    const profile = new Profile();
    profile.set("user", newUserSaved); // Link profile to the new user
    profile.set("caughtPokemon", []); // Initialize caught Pokemon array
    await profile.save(); // Save the profile object to the Parse server
    return newUserSaved;
  } catch (error) {
    alert(`Error: ${error.message}`); // Alert the user if there's an error
  }
};

// Used in login component
export const loginUser = async (currUser) => {
  try {
    const user = await Parse.User.logIn(currUser.email, currUser.password); // Log in the user
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
    alert(`Error: ${error.message}`); // Alert the user if there's an error
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
