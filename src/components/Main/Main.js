import React, { useEffect, useState } from 'react';
import { getAllPokemon } from '../../Services/getPokemonService';
import PokemonList from '../PokemonCard/PokemonList';
import './Main.css';

const Main = () => {
  const [pokemons, setPokemons] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getAllPokemon().then((pokemonData) => {
      setPokemons(pokemonData);
    });
  }, []);

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='main-container'>
      <h1>Choose Your Pokemon</h1>
      <input
        type='text'
        placeholder='Search Pokemon'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <PokemonList pokemons={filteredPokemons.slice(0, 20)} />
    </div>
  );
};

export default Main;