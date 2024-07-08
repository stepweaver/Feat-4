import Parse from 'parse';

// used in register component
export const createUser = (newUser) => {
  const user = new Parse.User();

  user.set('firstName', newUser.firstName);
  user.set('lastName', newUser.lastName);
  user.set('email', newUser.email);
  user.set('username', newUser.email);
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
  return Parse.User.logIn(currUser.email, currUser.password)
    .then((user) => {
      console.log('Logged in user: ', user);
      return user;
    })
    .catch((error) => {
      alert(`Error: ${error.message}`);
    });
};

// used in logout component
export const logoutUser = () => {
  return new Promise((resolve, reject) => {
    Parse.User.logOut()
      .then(() => {
        localStorage.clear();
        resolve(); 
      })
      .catch((error) => {
        alert(`Error during logout: ${error.message}`);
        reject(error); 
      });
  });
};

export const checkUser = () => {
  const currentUser = Parse.User.current();
  return currentUser ? currentUser.authenticated() : false;
};