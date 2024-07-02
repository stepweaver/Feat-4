import React from "react";  // Importing React

// Component to render a dropdown for selecting a Pokémon
const PokemonSelect = ({ pokemon, onPokemonSelect }) => {
  
  // Function to handle change event on the select element
  const handleChange = (event) => {
    const selectedId = event.target.value;  // Get the selected Pokémon ID
    const selectedPokemon = pokemon.find((p) => p.objectId === selectedId);  // Find the selected Pokémon in the list
    onPokemonSelect(selectedPokemon);  // Call the onPokemonSelect callback with the selected Pokémon
  };

  return (
    <div className="pokemon-select">
      <select onChange={handleChange}>  
        <option value="">Select a pokémon</option>  
        {pokemon.map((p) => (
          <option key={p.objectId} value={p.objectId}>  
            {p.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PokemonSelect;  // Exporting PokemonSelect component as default export
