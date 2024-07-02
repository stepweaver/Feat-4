import React, { useEffect, useState } from "react"; // Importing React, useEffect, and useState hooks
import Parse from "parse"; // Importing Parse for interacting with Parse backend
import PokemonCard from "../PokemonCard/PokemonCard"; // Importing PokemonCard component

const Profile = () => {
  const [username, setUsername] = useState(""); // State for storing the username
  const [caughtPokemons, setCaughtPokemons] = useState([]); // State for storing the list of caught Pokemon

  useEffect(() => {
    // Function to fetch profile data
    const fetchProfile = async () => {
      const query = new Parse.Query("Profile"); // Creating a new query for the "Profile" class
      query.equalTo("user", Parse.User.current()); // Filtering the query to match the current user
      const profile = await query.first(); // Fetching the first matching profile
      if (profile) {
        setUsername(Parse.User.current().get("username")); // Setting the username state
        setCaughtPokemons(profile.get("caughtPokemon") || []); // Setting the caughtPokemons state
      }
    };

    fetchProfile(); // Calling the fetchProfile function
  }, []); // Empty dependency array ensures this runs only once after initial render

  return (
    <div>
      <h1>{username}'s Profile</h1>
      <div>
        {caughtPokemons.map((pokemon, index) => (
          <PokemonCard key={index} pokemon={pokemon} /> // Rendering a PokemonCard for each caught Pokemon
        ))}
      </div>
    </div>
  );
};

export default Profile; // Exporting Profile component as default export

// TODO: Include update profile option.
// TODO: Include create a pokemon option. Write to Pokemon class.