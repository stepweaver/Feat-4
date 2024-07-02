import React, { useEffect, useState } from 'react'; // Importing React, useEffect, and useState hooks
import { getAllPokemon } from '../../services/getPokemonService'; // Importing getAllPokemon function from getPokemonService
import PokemonList from '../PokemonCard/PokemonList'; // Importing PokemonList component
import './Main.css'; // Importing CSS for the Main component

const Main = () => {
  const [pokemons, setPokemons] = useState([]); // State for storing list of pokemons
  const [searchQuery, setSearchQuery] = useState(''); // State for storing search query

  useEffect(() => {
    // Fetch all Pokemon data when the component mounts
    getAllPokemon().then((pokemonData) => {
      setPokemons(pokemonData); // Update pokemons state with fetched data
    });
  }, []); // Empty dependency array ensures this runs only once after initial render

  // Filter pokemons based on search query
  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='main-container'>
      <h1>Choose Your Pokemon</h1>
      <input
        type='text'
        placeholder='Search Pokemon'
        value={searchQuery} // Value of searchQuery state
        onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery state on input change
      />
      <PokemonList pokemons={filteredPokemons.slice(0, 20)} /> 
    </div>
  );
};

export default Main; 
