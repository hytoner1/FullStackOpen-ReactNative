import React from 'react';
import { StatusBar } from 'react-native';
import { NativeRouter } from 'react-router-native';

import Main from './src/components/Main'

const App = () => {
  console.log('Starting App');
  return (
    <>
      <NativeRouter>
        <Main />
      </NativeRouter>
      <StatusBar style='auto'/>
    </>
  );
}

export default App;