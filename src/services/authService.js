import Parse from "parse";

export const createUser = async (newUser) => {
  const user = new Parse.User();

  user.set("firstName", newUser.firstName);
  user.set("lastName", newUser.lastName);
  user.set("email", newUser.email);
  user.set("username", newUser.email);
  user.set("password", newUser.password);

  console.log("User: ", user);
  try {
    const newUserSaved = await user.signUp();
    const Profile = Parse.Object.extend("Profile");
    const profile = new Profile();
    profile.set("user", newUserSaved);
    profile.set("caughtPokemon", []);
    await profile.save();
    return newUserSaved;
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
};

// used in login component
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

// used in logout component
export const logoutUser = (navigate) => {
  return Parse.User.logOut()
    .then(() => {
      navigate("/unauthorized");
    })
    .catch((error) => {
      alert(`Error: ${error.message}`);
    });
};

export const checkUser = () => {
  const currentUser = Parse.User.current();
  return !!currentUser;
};
