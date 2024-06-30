import Parse from 'parse';

const registerUser = (username, email, password, repeatPassword) => {
  return new Promise((resolve, reject) => {
    if (password !== repeatPassword) {
      reject('Passwords do not match.');
      return;
    }

    const user = new Parse.User();
    user.set('username', username);
    user.set('email', email);
    user.set('password', password);

    user.signUp().then((user) => {
      resolve(user);
    }).catch((error) => {
      reject(error);
    });
  });
};

export { registerUser };