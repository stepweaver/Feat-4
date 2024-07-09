import Parse from "parse";

const catchPokemon = async (pokemon) => {
  try {
    const query = new Parse.Query('Profile');
    query.equalTo('user', Parse.User.current()); // Query for the current user's profile
    const profile = await query.first();

    if (profile) {
      profile.addUnique('caughtPokemon', pokemon); // Add the pokemon to the 'caughtPokemon' array
      await profile.save(); // Save the updated profile

      // Update local storage with the new caught Pokemon
      const caughtPokemon = profile.get('caughtPokemon');
      localStorage.setItem('caughtPokemon', JSON.stringify(caughtPokemon));
      console.log(`Pokemon ${pokemon.name} caught successfully.`);
    } else {
      console.log('Profile not found.'); // Log if profile is not found
    }
  } catch (error) {
    console.error('Error catching pokemon:', error); // Log any errors
  }
};

const releasePokemon = async (pokemon) => {
  try {
    const query = new Parse.Query('Profile');
    query.equalTo('user', Parse.User.current()); // Query for the current user's profile
    const profile = await query.first();

    if (profile) {
      profile.remove('caughtPokemon', pokemon); // Remove the pokemon from the 'caughtPokemon' array
      await profile.save(); // Save the updated profile

      // Update local storage with the new caught Pokemon
      const caughtPokemon = profile.get('caughtPokemon');
      localStorage.setItem('caughtPokemon', JSON.stringify(caughtPokemon));
      console.log(`Pokemon ${pokemon.name} released successfully.`);
    } else {
      console.log('Profile not found.'); // Log if profile is not found
    }
  } catch (error) {
    console.error('Error releasing pokemon:', error); // Log any errors
  }
};

export { catchPokemon, releasePokemon }; // Export the functions for catching and releasing Pokemon
