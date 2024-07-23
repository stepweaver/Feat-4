import Parse from "parse";

export const createUser = async (newUser) => {
  const user = new Parse.User();

  // Function to generate a random 5-digit alphanumeric sequence
  const generateRandomSequence = (length) => {
    const characters = '0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  // Generate username with "Trainer #" prefix and a random 5-digit alphanumeric sequence
  const username = `Trainer #${generateRandomSequence(5)}`;

  user.set("firstName", newUser.firstName);
  user.set("lastName", newUser.lastName);
  user.set("email", newUser.email);
  user.set("username", username);
  user.set("password", newUser.password);

  console.log("User object before signUp:", user.toJSON());

  try {
    const newUserSaved = await user.signUp();
    console.log("User signed up successfully:", newUserSaved);

    // Create a new profile and link it to the newly created user
    const Profile = Parse.Object.extend("Profile");
    const profile = new Profile();
    profile.set("user", newUserSaved);
    profile.set("username", newUserSaved.get("username"));
    profile.set("caughtPokemon", []);
    await profile.save();

    console.log("Profile created successfully:", profile);
    return newUserSaved;
  } catch (error) {
    console.error("Error during sign up:", error);
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
export const logoutUser = (navigate, onLogoutSuccess) => {
  return Parse.User.logOut()
    .then(() => {
      localStorage.clear(); // Clear local storage
      onLogoutSuccess(); // Set the user as logged out in the global
      navigate("/"); // Navigate to the unauthorized page after logging out
    })
    .catch((error) => {
      alert(`Error: ${error.message}`);
    });
};

export const checkUser = () => {
  const currentUser = Parse.User.current();
  return !!currentUser; // Check if there is a current user logged in
};
