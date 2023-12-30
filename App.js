// App.js
import React from 'react';
import Screen from './components/Screen';
import useFonts from './hooks/useFonts';
import LoadingScreen from './components/LoadingScreen';
import { useKeepAwake } from 'expo-keep-awake';

const App = () => {
  const fontsLoaded = useFonts();
  useKeepAwake();

  return fontsLoaded ? <Screen /> : <LoadingScreen />;
};

export default App;