import React, { useEffect, useState } from 'react';
import Parse from 'parse';
import { useNavigate, useParams } from 'react-router-dom';
import PokemonCard from '../PokemonCard/PokemonCard';
import CommentForm from '../Comments/CommentForm';
import { addComment, getAllComments } from '../../Services/commentService';
import { checkUser } from '../../Services/authService';
import './Profile.css';

const Profile = () => {
  const { id } = useParams();
  const [username, setUsername] = useState(''); // State to store the username
  const [caughtPokemons, setCaughtPokemons] = useState([]); // State to store the caught Pokémon
  const [trainerBio, setTrainerBio] = useState(''); // State to store the trainer bio
  const [comments, setComments] = useState([]); // State to store the comments
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      let user;
      if (id) {
        // Fetch the user by ID
        const userQuery = new Parse.Query(Parse.User);
        user = await userQuery.get(id);
      } else {
        // Fallback to current user if no ID is provided
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
    }

    fetchProfile();
  }, [id, navigate]);

  useEffect(() => {
    const fetchComments = async () => {
      if (!id) return;
      const comments = await getAllComments(id);
      setComments(comments);
    }

    fetchComments();
  }, [id]);

  const handleSubmitComment = async (commentText) => {
    const success = await addComment(commentText, id);
    if (success) {
      setComments([...comments, { comment: commentText, user: Parse.User.current() }]);
    }
  }

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

//   useEffect(() => {
//     if (!checkUser()) {
//       navigate('/login');
//       return;
//     }

//     const fetchProfile = async () => {
//       const query = new Parse.Query('Profile');
//       query.equalTo('user', Parse.User.current());
//       const profile = await query.first();
//       if (profile) {
//         setUsername(Parse.User.current().get('username'));
//         setCaughtPokemons(profile.get('caughtPokemon') || []);
//         setTrainerBio(profile.get('trainerBio') || 'I am a Pokemon Trainer!');
//       }
//     };

//     fetchProfile();
//   }, [navigate]);

//   useEffect(() => {
//     if (!checkUser()) {
//       return;
//     }

//     const fetchComments = async () => {
//       const userId = Parse.User.current().id;
//       const comments = await getAllComments(userId);
//       setComments(comments);
//     };

//     fetchComments();
//   }, []);

//   const handleSubmitComment = async (commentText) => {
//     const success = await addComment(commentText);
//     if (success) {
//       setComments([
//         ...comments,
//         { comment: commentText, user: Parse.User.current() }
//       ]);
//     }
//   };

//   return (
//     <div className='profile'>
//       <h1>{username}'s Profile</h1>
//       <p>{trainerBio}</p>
//       <h2>Caught Pokemon</h2>
//       <div className='pokemon-card'>
//         {caughtPokemons.map((pokemon, index) => (
//           <PokemonCard key={index} pokemon={pokemon} />
//         ))}
//       </div>
//       <div className='comment-form'>
//         {/* Comment Form */}
//         <CommentForm onSubmitComment={handleSubmitComment} />
//         <div className='comment'>
//           {comments.map((comment, index) => (
//             <span key={index} className='comment'>
//               <strong>{comment.user.get('username')}: </strong>
//               <span>{comment.text}</span>
//             </span>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;

// TODO: Include update profile option.
// TODO: Include create a pokemon option. Write to Pokemon class.
// TODO: Add css for profile page.
// TODO: Need a way for registered users to view other user's profiles. Only registered users can leave comments.