import Parse from 'parse';

const login = async (email, password) => {
  try {
    const user = await Parse.User.logIn(email, password);
    return { success: true, user };
  } catch (error) {
    console.error('Error while logging in:', error);
    return { success: false, error };
  }
};

export default login;