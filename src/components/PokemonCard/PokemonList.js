import React from "react"; // Importing React
import PokemonCard from "./PokemonCard"; // Importing PokemonCard component

const PokemonList = ({ pokemons }) => {
  // Defining PokemonList component which receives pokemons as props
  return (
    <div className="pokemon-list">
      {pokemons.map(
        (
          pokemon,
          index // Iterating over the list of pokemons
        ) => (
          <PokemonCard key={pokemon.id || index} pokemon={pokemon} /> // Rendering a PokemonCard for each pokemon, using id or index as key
        )
      )}
    </div>
  );
};

export default PokemonList; 