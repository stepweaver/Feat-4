import React, { useEffect, useState } from 'react';
import Parse from 'parse';
import PokemonCard from '../PokemonCard/PokemonCard';

const Profile = () => {
  const [username, setUsername] = useState('');
  const [caughtPokemons, setCaughtPokemons] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      const query = new Parse.Query('Profile');
      query.equalTo('user', Parse.User.current());
      const profile = await query.first();
      if (profile) {
        setUsername(Parse.User.current().get('username'));
        setCaughtPokemons(profile.get('caughtPokemon') || []);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div>
      <h1>{username}'s Profile</h1>
      <div>
        {caughtPokemons.map((pokemon, index) => (
          <PokemonCard key={index} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
};

export default Profile;

// TODO: Include update profile option.
// TODO: Include create a pokemon option. Write to Pokemon class.