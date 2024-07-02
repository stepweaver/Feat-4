import React, { useState } from 'react'; // Importing React and useState hook
import {
  catchPokemon,
  releasePokemon,
} from '../../services/catchPokemonService'; // Importing catchPokemon and releasePokemon functions from catchPokemonService
import './PokemonCard.css'; // Importing CSS for the PokemonCard component

const PokemonCard = ({ pokemon }) => {
  const [isCaught, setIsCaught] = useState(false); // State for tracking if the Pokemon is caught
  const [isFlipped, setIsFlipped] = useState(false); // State for tracking if the card is flipped

  // Function to handle catching or releasing the Pokemon
  const handleCatchChange = async () => {
    setIsCaught(!isCaught); // Toggle the isCaught state
    if (!isCaught) {
      await catchPokemon(pokemon); // If not caught, catch the Pokemon
    } else {
      await releasePokemon(pokemon); // If caught, release the Pokemon
    }
  };

  // Function to handle flipping the card
  const flipCard = () => {
    setIsFlipped(!isFlipped); // Toggle the isFlipped state
  };

  return (
    <div
      className={`pokemon-card ${isFlipped ? 'flipped' : ''}`} // Apply flipped class if isFlipped is true
      onClick={flipCard} // Set flipCard as the click handler
    >
      <img src={pokemon.image} alt={pokemon.name} />
      <h2>{pokemon.name}</h2>
      <div className={isFlipped ? 'content flipped' : 'content'}>
        <div className='pokemon-card-front'>
          <div className='pokemon-types-container'>
            {pokemon.types.map((type, index) => (
              <span
                key={index}
                className={`pokemon-types ${type.toLowerCase().trim()}`} // Apply type-specific class
              >
                {type}
              </span>
            ))}
          </div>
        </div>
        <div className='pokemon-card-back'>
          <p>hp - {pokemon.hp}</p>
          <p>Attack - {pokemon.attack}</p>
          <p>Defense - {pokemon.defense}</p>
          <input
            type='checkbox' // TODO: Prevent card flip when checking the box.
            checked={isCaught} // Set checkbox state to isCaught
            onChange={handleCatchChange} // Set handleCatchChange as the change handler
            id={`catch-${pokemon.name}`} // Set unique id for the checkbox
          />
          <label htmlFor={`catch-${pokemon.name}`}>
            {isCaught ? 'Caught' : 'Catch'}
          </label>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard; 