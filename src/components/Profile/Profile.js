import React, { useEffect, useState } from 'react';
import Parse from 'parse';
import { useNavigate, useParams } from 'react-router-dom';
import PokemonCard from '../Pokemon/PokemonCard';
import CommentForm from '../Comments/CommentForm';
import PokemonList from '../Pokemon/PokemonList';
import FriendsList from '../Friends/FriendsList';
import { addComment, getAllComments } from '../../Services/commentService';
import './Profile.css';

// TODO: FriendsList component is not yet implemented. Not working as expected.

const Profile = () => {
  const { id } = useParams();
  const [username, setUsername] = useState('');
  const [caughtPokemons, setCaughtPokemons] = useState([]);
  const [trainerBio, setTrainerBio] = useState('');
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      let user;
      if (id) {
        const userQuery = new Parse.Query(Parse.User);
        user = await userQuery.get(id);
      } else {
        user = Parse.User.current();
        if (!user) {
          navigate('/login');
          return;
        }
      }

      const query = new Parse.Query('Profile');
      query.equalTo('user', user);
      const profile = await query.first();
      if (profile) {
        setUsername(user.get('username'));
        setCaughtPokemons(profile.get('caughtPokemon') || []);
        setTrainerBio(profile.get('trainerBio') || 'I am a Pokemon Trainer!');
      }
    };

    fetchProfileData();
  }, [id, navigate]);

  useEffect(() => {
    const fetchComments = async () => {
      if (!id) return;
      const comments = await getAllComments(id);
      setComments(comments);
    };

    fetchComments();
  }, [id]);

  const handleSubmitComment = async (commentText) => {
    const success = await addComment(commentText, id);
    if (success) {
      setComments([...comments, { comment: commentText, user: Parse.User.current() }]);
    }
  };

  return (
    <div className='profile'>
      <h1>{username}'s Profile</h1>
      <p>{trainerBio}</p>
      <FriendsList /> {/* Display FriendsList */}
      <h2>Caught Pokemon</h2>
      <PokemonList caughtPokemons={caughtPokemons} />
      <div className='pokemon-card'>
        {caughtPokemons.map((pokemon, index) => (
          <PokemonCard key={index} pokemon={pokemon} />
        ))}
      </div>
      <div className='comment-section'>
        <CommentForm onSubmitComment={handleSubmitComment} />
        <div className='comments'>
          {comments.map((comment, index) => (
            <div key={index} className='comment'>
              <strong>{comment.user.get('username')}: </strong>
              <span>{comment.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;

// TODO: Include update profile option.
// TODO: Include create a pokemon option. Write to Pokemon class.
// TODO: Add css for profile page.
// TODO: Need a way for registered users to view other user's profiles. Only registered users can leave comments.