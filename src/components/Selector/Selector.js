import React from 'react';

const PokemonSelect = ({ pokemon, onPokemonSelect }) => {
  const handleChange = (event) => {
    const selectedId = event.target.value;
    const selectedPokemon = pokemon.find(
      (p) => p.objectId === selectedId
    );
    onPokemonSelect(selectedPokemon);
  };

  return (
    <div className='pokemon-select'>
      <select onChange={handleChange}>
        <option value=''>Select a pokémon</option>
        {pokemon.map((p) => (
          <option key={p.objectId} value={p.objectId}>
            {p.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PokemonSelect;
