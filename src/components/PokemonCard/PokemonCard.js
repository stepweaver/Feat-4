import React, { useState } from 'react';
import { catchPokemon, releasePokemon } from '../../services/catchPokemonService';
import './PokemonCard.css';

const PokemonCard = ({ pokemon }) => {
  const [isCaught, setIsCaught] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCatchChange = async () => {
    setIsCaught(!isCaught);
    if (!isCaught) {
      await catchPokemon(pokemon);
    } else {
      await releasePokemon(pokemon);
    }
  };

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={`pokemon-card ${isFlipped ? 'flipped' : ''}`} onClick={flipCard}>
      <div className='pokemon-card-front'>
        <img src={pokemon.image} alt={pokemon.name} />
        <h2>{pokemon.name}</h2>
        <div className='pokemon-types-container'>
          {pokemon.types.map((type, index) => (
            <span key={index} className={`pokemon-types ${type.toLowerCase().trim()}`}>
              {type}
            </span>
          ))}
        </div>
      </div>
      <div className='pokemon-card-back'>
        <p>hp - {pokemon.hp}</p>
        <p>Attack - {pokemon.attack}</p>
        <p>Defense - {pokemon.defense}</p>
        <input type='checkbox' checked={isCaught} onChange={handleCatchChange} id={`catch-${pokemon.name}`} />
        <label htmlFor={`catch-${pokemon.name}`}>{isCaught ? 'Caught' : 'Catch'}</label>
      </div>
    </div>
  );
};

export default PokemonCard;