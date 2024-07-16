import React, { useEffect, useState } from 'react';
import { getAllPokemon } from '../../Services/getPokemonService';
import PokemonList from '../Pokemon/PokemonList';
import './Main.css';

const Main = () => {
  const [pokemons, setPokemons] = useState([]); // State to store all Pokemon
  const [searchQuery, setSearchQuery] = useState(''); // State to store the search query

  useEffect(() => {
    getAllPokemon().then((pokemonData) => {
      setPokemons(pokemonData); // Fetch all Pokemon and set the state
    });
  }, []);

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
  ); // Filter Pokemon based on the search query

  return (
    <div className='main-container'>
      <h1>Choose Your Pokemon</h1>
      <input
        type='text'
        placeholder='Search Pokemon'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <PokemonList pokemons={filteredPokemons.slice(0, 20)} />{' '}
      {/* Display filtered Pokemon list */}
    </div>
  );
};

export default Main; // Export the Main component
