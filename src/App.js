import React from "react";
import Components from "./Components/Components";
import * as ENV from "./environments";
import Parse from "parse";
import "./index.css";
import AuthProvider from "./Context/AuthContext";

Parse.initialize(ENV.APPLICATION_ID, ENV.JAVASCRIPT_KEY);
Parse.serverURL = ENV.SERVER_URL;

const App = () => {
  return (
    <AuthProvider>
      <Components />
    </AuthProvider>
  );
};

export default App;

