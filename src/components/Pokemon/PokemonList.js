import React from 'react';
import PokemonCard from './PokemonCard';

const PokemonList = ({ pokemons = [] }) => {
  
  if (!pokemons) {
    return <div>Loading...</div>;
  }

  return (
    <div className='pokemon-list'>
      {pokemons.map(
        (
          pokemon,
          index
        ) => (
          <PokemonCard key={pokemon.id || index} pokemon={pokemon} />
        )
      )}
    </div>
  );
};

export default PokemonList;