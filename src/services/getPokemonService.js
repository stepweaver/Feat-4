import Parse from "parse";

export const fetchAndSavePokemonData = async () => {
  const promises = [];
  for (let i = 1; i <= 400; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url).then((res) => res.json()));
  }

  const pokemonData = await Promise.all(promises);

  const pokemonInfo = pokemonData.map((pokemon) => {
    const stats = pokemon.stats.reduce((acc, stat) => {
      acc[stat.stat.name] = stat.base_stat;
      return acc;
    }, {});

    return {
      number: pokemon.id.toString(),
      name: pokemon.name,
      imageURL: pokemon.sprites.front_default,
      types: pokemon.types.map((typeInfo) => typeInfo.type.name),
      hp: stats.hp.toString(),
      attack: stats.attack.toString(),
      defense: stats.defense.toString(),
      specialAttack: stats["special-attack"].toString(),
      specialDefense: stats["special-defense"].toString(),
      speed: stats.speed.toString(),
    };
  });

  try {
    for (let info of pokemonInfo) {
      const query = new Parse.Query("Pokemon");
      query.equalTo("number", info.number);
      const existingPokemon = await query.first();
      if (!existingPokemon) {
        const Pokemon = Parse.Object.extend("Pokemon");
        const newPokemon = new Pokemon();
        newPokemon.set("number", info.number);
        newPokemon.set("name", info.name);
        newPokemon.set("imageURL", info.imageURL);
        newPokemon.set("types", info.types);
        newPokemon.set("hp", info.hp);
        newPokemon.set("attack", info.attack);
        newPokemon.set("defense", info.defense);
        newPokemon.set("specialAttack", info.specialAttack);
        newPokemon.set("specialDefense", info.specialDefense);
        newPokemon.set("speed", info.speed);
        await newPokemon.save();
        console.log(`Pokemon ${info.name} saved successfully`);
      } else {
        console.log(`Pokemon ${info.name} already exists`);
      }
    }
    console.log("Pokemon data fetched and saved successfully");
  } catch (error) {
    console.error("Error saving Pokémon data:", error);
  }
};

export const getAllPokemon = async () => {
  const Pokemon = Parse.Object.extend("Pokemon");
  const query = new Parse.Query(Pokemon);
  query.limit(1000); // Set the limit to fetch all Pokemon
  //query.ascending("hp"); // sort the pokemon by anything
  try {
    const results = await query.find();
    return results.map((pokemon) => ({
      id: pokemon.id,
      number: pokemon.get("number"),
      name: pokemon.get("name"),
      imageURL: pokemon.get("imageURL"),
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
