import React, { useEffect, useState } from 'react'; // Importing React, useEffect, and useState hooks
import Parse from 'parse'; // Importing Parse for interacting with Parse backend
import PokemonCard from '../PokemonCard/PokemonCard'; // Importing PokemonCard component
import CommentForm from '../CommentForm/CommentForm';
import { addComment } from '../../services/addCommentService';
import { getAllComments } from '../../services/getCommentService';
import './Profile.css';

const Profile = () => {
  const [username, setUsername] = useState(''); // State for storing the username
  const [caughtPokemons, setCaughtPokemons] = useState([]); // State for storing the list of caught Pokemon
  const [trainerBio, setTrainerBio] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Function to fetch profile data
    const fetchProfile = async () => {
      const query = new Parse.Query('Profile'); // Creating a new query for the 'Profile' class
      query.equalTo('user', Parse.User.current()); // Filtering the query to match the current user
      const profile = await query.first(); // Fetching the first matching profile
      if (profile) {
        setUsername(Parse.User.current().get('username')); // Setting the username state
        setCaughtPokemons(profile.get('caughtPokemon') || []); // Setting the caughtPokemons state
        setTrainerBio(profile.get('trainerBio') || 'I am a Pokemon Trainer!');
      }
    };

    fetchProfile(); // Calling the fetchProfile function
  }, []); // Empty dependency array ensures this runs only once after initial render

  useEffect(() => {
    const fetchComments = async (commentText) => {
      const userId = Parse.User.current().id;
      const comments = await getAllComments(userId);
      setComments(comments);
    };

    fetchComments();
  }, []);

  const handleSubmitComment = async (commentText) => {
    const success = await addComment(commentText);
    if (success) {
      setComments([
        ...comments,
        { comment: commentText, user: Parse.User.current() }
      ]); // Update comments state with new comment object containing text and user info (current user).
    }
  };

  return (
    <div className='profile'>
      <h1>{username}'s Profile</h1>
      <p>{trainerBio}</p>
      <h2>Caught Pokemon</h2>
      <div className='pokemon-card'>
        {caughtPokemons.map((pokemon, index) => (
          <PokemonCard key={index} pokemon={pokemon} /> // Rendering a PokemonCard for each caught Pokemon
        ))}
      </div>
      <div className='comment-form'>
        <CommentForm onSubmitComment={handleSubmitComment} />
        <div className='comment'>
          {comments.map((comment, index) => (
            <span key={index} className='comment'>
              <strong>{comment.user.get('username')}: </strong>
              <span>{comment.text}</span> 
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile; // Exporting Profile component as default export

// TODO: Include update profile option.
// TODO: Include create a pokemon option. Write to Pokemon class.
// TODO: Add css for profile page.
