import Parse from 'parse';

// used in register component
export const createUser = (newUser) => {
  const user = new Parse.User();

  user.set('username', newUser.username);
  user.set('email', newUser.email);
  user.set('password', newUser.password);

  console.log('User: ', user);
  return user.signUp()
    .then((newUserSaved) => {
      return newUserSaved;
    })
    .catch((error) => {
      alert(`Error: ${error.message}`);
    });
};

// used in login component
export const loginUser = (currUser) => {
  return Parse.User.logIn(currUser.username, currUser.password)
    .then((user) => {
      console.log('Logged in user: ', user);
      return user;
    })
    .catch((error) => {
      alert(`Error: ${error.message}`);
    });
};

// used in logout component
export const logoutUser = (onLogout) => {
  Parse.User.logOut()
    .then(() => {
      localStorage.clear();
      if (typeof onLogout === 'function') {
        onLogout();
      }
    })
    .catch((error) => {
      alert(`Error during logout: ${error.message}`);
    });
};

export const checkUser = () => {
  const currentUser = Parse.User.current();
  return currentUser ? currentUser.authenticated() : false;
};