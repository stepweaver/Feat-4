import React, { useState, useEffect } from "react";
import {
  catchPokemon,
  releasePokemon,
} from "../../Services/catchPokemonService";
import "./PokemonCard.css";

const PokemonCard = ({ pokemon }) => {
  const [isCaught, setIsCaught] = useState(false); // State to track if Pokemon is caught
  const [isFlipped, setIsFlipped] = useState(false); // State to track if card is flipped

  useEffect(() => {
    console.log(pokemon);
    const caughtPokemon =
      JSON.parse(localStorage.getItem("caughtPokemon")) || []; // Retrieve caught Pokemon from local storage
    const isPokemonCaught = caughtPokemon.some(
      (p) => p.objectId === pokemon.objectId
    ); // Check if the current Pokemon is caught
    setIsCaught(isPokemonCaught); // Set isCaught state based on local storage data
  }, [pokemon]);

  const handleCatchChange = async () => {
    setIsCaught(!isCaught); // Toggle the isCaught state
    if (!isCaught) {
      await catchPokemon(pokemon); // Catch the Pokemon if not caught
    } else {
      await releasePokemon(pokemon); // Release the Pokemon if caught
    }
  };

  const flipCard = () => {
    setIsFlipped(!isFlipped); // Toggle the isFlipped state
  };

  return (
    <div
      className={`pokemon-card ${isFlipped ? "flipped" : ""}`}
      onClick={flipCard}
    >
      <img src={pokemon.image} alt={pokemon.name} />
      <h2>{pokemon.name}</h2>
      <div className={isFlipped ? "content flipped" : "content"}>
        <div className="pokemon-card-front">
          <div className="pokemon-types-container">
            {pokemon.types.map((type, index) => (
              <span
                key={index}
                className={`pokemon-types ${type.toLowerCase().trim()}`}
              >
                {type}
              </span>
            ))}
          </div>
        </div>
        <div className="pokemon-card-back">
          <p>hp - {pokemon.hp}</p>
          <p>Attack - {pokemon.attack}</p>
          <p>Defense - {pokemon.defense}</p>
          <input
            type="checkbox"
            checked={isCaught}
            onChange={handleCatchChange}
            id={`catch-${pokemon.name}`}
          />
          <label htmlFor={`catch-${pokemon.name}`}>
            {isCaught ? "Caught" : "Catch"}
          </label>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard; // Export the PokemonCard component

