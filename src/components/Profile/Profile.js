import React, { useEffect, useState } from 'react';
import Parse from 'parse';
import { useNavigate, useParams } from 'react-router-dom';
import PokemonCard from '../Pokemon/PokemonCard';
import CommentForm from '../Comments/CommentForm';
import FriendsList from '../Friends/FriendsList';
import AddRemoveFriend from '../Friends/AddRemoveFriend';
import { addComment, getAllComments } from '../../Services/commentService';
import './Profile.css';

const Profile = () => {
  const { id } = useParams();
  const [username, setUsername] = useState('');
  const [caughtPokemons, setCaughtPokemons] = useState([]);
  const [trainerBio, setTrainerBio] = useState('');
  const [comments, setComments] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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
  
      setIsAuthenticated(user.id === Parse.User.current().id);
  
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
      const comments = await getAllComments();
      setComments(comments);
    };

    fetchComments();
  }, []);

  const handleSubmitComment = async (commentText) => {
    const success = await addComment(commentText);
    if (success) {
      // Refresh comments after successful submission
      const comments = await getAllComments();
      setComments(comments);
    }
  };

  return (
    <div className='profile'>
      <h1>{username}</h1>
      <p>{trainerBio}</p>
      {isAuthenticated ? (
        <FriendsList />
      ) : (
        <AddRemoveFriend id={id} />
      )}
      <h2>Caught Pokemon</h2>
      <div className='pokemon-card'>
        {caughtPokemons.map((pokemon, index) => (
          <PokemonCard key={index} pokemon={pokemon} />
        ))}
      </div>
      <div className='comment-section'>
        <h2>Central Chat</h2>
        <CommentForm onSubmitComment={handleSubmitComment} />
        <div className='comments'>
          {comments.map((comment, index) => (
            <div key={index} className='comment'>
              <strong>{comment.user}: </strong>
              <span>{comment.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;