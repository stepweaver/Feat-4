import Parse from 'parse';

export const getAllPokemon = () => {
  const Pokemon = Parse.Object.extend('Pokemon');
  const query = new Parse.Query(Pokemon);
  return query.find().then((results) => {
    return results.map((pokemon) => ({
      // For each pokemon object, create a new object with the desired field name.
      objectId: pokemon.id,
      name: pokemon.get('name'),
      types: pokemon.get('types'),
      hp: pokemon.get('hp'),
      attack: pokemon.get('attack'),
      defense: pokemon.get('defense'),
      image: pokemon.get('imageURL'),
    }));
  });
};
