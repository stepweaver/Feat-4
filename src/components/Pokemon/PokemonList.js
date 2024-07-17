import React from 'react';
import Pokemon from './PokemonCard';

const PokemonList = ({ pokemons = [] }) => {
  if (!pokemons) {
    return <div>Loading...</div>;
  }

  return (
    <div className='pokemon-list'>
      {pokemons.map((pokemon, index) => (
        <Pokemon key={pokemon.id || index} pokemon={pokemon} />
      ))}
    </div>
  );
};

export default PokemonList;
