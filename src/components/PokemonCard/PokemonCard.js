import React, { useState } from 'react';
import { catchPokemon, releasePokemon } from '../../services/catchPokemonService';

const PokemonCard = ({ pokemon }) => {
  const [isCaught, setIsCaught] = useState(false);

  const handleCatchChange = async () => {
    setIsCaught(!isCaught);
    if (!isCaught) {
      await catchPokemon(pokemon);
    } else {
      await releasePokemon(pokemon);
    }
  };

  return (
    <div className="pokemon-card">
      <div className="pokemon-header">
        <img src={pokemon.image} alt={pokemon.name} />
        <h2>{pokemon.name}</h2>
        <input
          type="checkbox"
          checked={isCaught}
          onChange={handleCatchChange}
          id={`catch-${pokemon.name}`}
        />
        <label htmlFor={`catch-${pokemon.name}`}>{isCaught ? 'Caught' : 'Catch'}</label>
      </div>
      <div className="pokemon-details">
        <p>Types - {pokemon.types.join(", ")}</p>
        <p>hp - {pokemon.hp}</p>
        <p>Attack - {pokemon.attack}</p>
        <p>Defense - {pokemon.defense}</p>
      </div>
    </div>
  );
};

export default PokemonCard;