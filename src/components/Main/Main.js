import React, { useEffect, useState } from "react";
import { getAllPokemon } from "../../services/getPokemonService";
import PokemonSelect from '../Selector/Selector';
import Pokemon from '../Pokemon/Pokemon';

const Main = () => {
  const [pokemon, setPokemon] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    getAllPokemon().then((pokemonData) => {
      console.log(pokemonData);
      setPokemon(pokemonData);
    });
  }, []);

  const handlePokemonSelect = (selected) => {
    setSelectedPokemon(selected);
  };

  return (
    <div className="main-container">
      <h1>Choose Your Pokemon</h1>
      <PokemonSelect
        pokemon={pokemon}
        onPokemonSelect={handlePokemonSelect}
      />
      {selectedPokemon && <Pokemon pokemon={selectedPokemon} />}
    </div>
  );
};

export default Main;