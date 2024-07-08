import React, { useEffect, useState } from 'react';
import Parse from 'parse';
import PokemonCard from '../PokemonCard/PokemonCard';
import CommentForm from '../CommentForm/CommentForm';
import { addComment } from '../../Services/addCommentService';
import { getAllComments } from '../../Services/getCommentService';
import './Profile.css';

const Profile = () => {
  const [username, setUsername] = useState('');
  const [caughtPokemons, setCaughtPokemons] = useState([]);
  const [trainerBio, setTrainerBio] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      const query = new Parse.Query('Profile');
      query.equalTo('user', Parse.User.current());
      const profile = await query.first();
      if (profile) {
        setUsername(Parse.User.current().get('username'));
        setCaughtPokemons(profile.get('caughtPokemon') || []);
        setTrainerBio(profile.get('trainerBio') || 'I am a Pokemon Trainer!');
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchComments = async () => {
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
      ]);
    }
  };

  return (
    <div className='profile'>
      <h1>{username}'s Profile</h1>
      <p>{trainerBio}</p>
      <h2>Caught Pokemon</h2>
      <div className='pokemon-card'>
        {caughtPokemons.map((pokemon, index) => (
          <PokemonCard key={index} pokemon={pokemon} />
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

export default Profile;

// TODO: Include update profile option.
// TODO: Include create a pokemon option. Write to Pokemon class.
// TODO: Add css for profile page.
// TODO: Need a way for registered users to view other user's profiles. Only registered users can leave comments.
// TODO: Can't release pokemon from profile. 'Caught' status doesn't persist.
