import React from 'react';
import Components from './Components/Components';
import * as ENV from './environments';
import Parse from 'parse';
import './index.css';

Parse.initialize(ENV.APPLICATION_ID, ENV.JAVASCRIPT_KEY);
Parse.serverURL = ENV.SERVER_URL;

const App = () => {
  return <Components />;
};

export default App;
