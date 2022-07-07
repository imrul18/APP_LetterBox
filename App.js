import React from 'react';

import {LogBox} from 'react-native';
LogBox.ignoreAllLogs();

import Main from './app/Main.js';

const App = () => {
  return <Main />;
};

export default App;
