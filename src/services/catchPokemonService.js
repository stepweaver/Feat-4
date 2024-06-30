import Parse from 'parse';

const catchPokemon = async (pokemon) => {
  try {
    const query = new Parse.Query('Profile');
    query.equalTo('user', Parse.User.current());
    const profile = await query.first();

    if (profile) {
      // Add the pokemon to the 'caughtPokemon' array
      profile.addUnique('caughtPokemon', pokemon);
      await profile.save();
      console.log(`Pokemon ${pokemon.name} caught successfully.`);
    } else {
      console.log('Profile not found.');
    }
  } catch (error) {
    console.error('Error catching pokemon:', error);
  }
};

const releasePokemon = async (pokemon) => {
  try {
    const query = new Parse.Query('Profile');
    query.equalTo('user', Parse.User.current());
    const profile = await query.first();

    if (profile) {
      // Remove the pokemon from the 'caughtPokemon' array
      profile.remove('caughtPokemon', pokemon);
      await profile.save();
      console.log(`Pokemon ${pokemon.name} released successfully.`);
    } else {
      console.log('Profile not found.');
    }
  } catch (error) {
    console.error('Error releasing pokemon:', error);
  }
};

export { catchPokemon, releasePokemon };