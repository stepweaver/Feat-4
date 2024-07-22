import Parse from "parse";

// Utilize async/await with fetch for cleaner syntax
const fetchPokemon = async (id) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  return response.json();
};

// Refactor to use map and Promise.all for fetching data in parallel
export const fetchAndSavePokemonData = async () => {
  try {
    const pokemonIds = Array.from({ length: 400 }, (_, i) => i + 1);
    const pokemonData = await Promise.all(pokemonIds.map(fetchPokemon));

    const pokemonInfo = pokemonData.map((pokemon) => {
      const stats = pokemon.stats.reduce((acc, stat) => {
        acc[stat.stat.name] = stat.base_stat.toString();
        return acc;
      }, {});

      return {
        number: pokemon.id.toString(),
        name: pokemon.name,
        imageURL: pokemon.sprites.front_default,
        types: pokemon.types.map((typeInfo) => typeInfo.type.name),
        ...stats,
      };
    });

    const Pokemon = Parse.Object.extend("Pokemon");
    for (let info of pokemonInfo) {
      const query = new Parse.Query(Pokemon);
      query.equalTo("number", info.number);
      const existingPokemon = await query.first();
      if (!existingPokemon) {
        const newPokemon = new Pokemon();
        Object.entries(info).forEach(([key, value]) => newPokemon.set(key, value));
        await newPokemon.save();
      }
    }
  } catch (error) {
    console.error("Error fetching and saving Pokemon data:", error);
  }
};

export const getAllPokemon = async () => {
  const Pokemon = Parse.Object.extend("Pokemon");
  const query = new Parse.Query(Pokemon);
  query.limit(1000); // Set the limit to fetch all Pokemon
  try {
    const results = await query.find();
    return results.map((pokemon) => ({
      id: pokemon.id,
      number: pokemon.get("number"),
      name: pokemon.get("name"),
      image: pokemon.get("imageURL"),
      types: pokemon.get("types"),
      hp: pokemon.get("hp"),
      attack: pokemon.get("attack"),
      defense: pokemon.get("defense"),
      specialAttack: pokemon.get("specialAttack"),
      specialDefense: pokemon.get("specialDefense"),
      speed: pokemon.get("speed"),
    }));
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
    return [];
  }
};