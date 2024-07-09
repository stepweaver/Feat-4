import Parse from "parse";

const catchPokemon = async (pokemon) => {
  try {
    const query = new Parse.Query("Profile");
    query.equalTo("user", Parse.User.current());
    const profile = await query.first();

    if (profile) {
      profile.addUnique("caughtPokemon", pokemon);
      await profile.save();

      // Update local storage
      const caughtPokemon = profile.get("caughtPokemon");
      localStorage.setItem("caughtPokemon", JSON.stringify(caughtPokemon));
      console.log(`Pokemon ${pokemon.name} caught successfully.`);
    } else {
      console.log("Profile not found.");
    }
  } catch (error) {
    console.error("Error catching pokemon:", error);
  }
};

const releasePokemon = async (pokemon) => {
  try {
    const query = new Parse.Query("Profile");
    query.equalTo("user", Parse.User.current());
    const profile = await query.first();

    if (profile) {
      profile.remove("caughtPokemon", pokemon);
      await profile.save();

      // Update local storage
      const caughtPokemon = profile.get("caughtPokemon");
      localStorage.setItem("caughtPokemon", JSON.stringify(caughtPokemon));
      console.log(`Pokemon ${pokemon.name} released successfully.`);
    } else {
      console.log("Profile not found.");
    }
  } catch (error) {
    console.error("Error releasing pokemon:", error);
  }
};

export { catchPokemon, releasePokemon };
