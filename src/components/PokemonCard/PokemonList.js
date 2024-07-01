import React from 'react';
import PokemonCard from './PokemonCard';

const PokemonList = ({ pokemons }) => {
  return (
    <div className="pokemon-list">
      {pokemons.map((pokemon, index) => (
        <PokemonCard key={pokemon.id || index} pokemon={pokemon} />
      ))}
    </div>
  );
};

export default PokemonList;