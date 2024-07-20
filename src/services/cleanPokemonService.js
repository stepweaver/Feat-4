import Parse from "parse";

// Function to clean duplicate Pokemon entries
export const cleanDuplicatePokemon = async () => {
  try {
    const Pokemon = Parse.Object.extend("Pokemon");
    const seen = new Set();
    let duplicates = [];
    let hasMore = true;
    let skip = 0;
    const limit = 500; // Adjust

    while (hasMore) {
      const query = new Parse.Query(Pokemon);
      query.ascending("number");
      query.skip(skip);
      query.limit(limit);

      const results = await query.find();
      if (results.length < limit) {
        hasMore = false;
      }

      results.forEach((pokemon) => {
        const number = pokemon.get("number");
        if (seen.has(number)) {
          duplicates.push(pokemon);
        } else {
          seen.add(number);
        }
      });

      skip += limit;
    }

    if (duplicates.length > 0) {
      await Parse.Object.destroyAll(duplicates);
      console.log(`Deleted ${duplicates.length} duplicate Pokémon`);
    } else {
      console.log("No duplicate Pokémon found");
    }
  } catch (error) {
    console.error("Error cleaning duplicate Pokémon:", error);
  }
};
