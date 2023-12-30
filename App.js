// App.js
import React from 'react';
import TimerComponent from './components/TimerComponent';
import useFonts from './hooks/useFonts';
import LoadingScreen from './components/LoadingScreen';
import { useKeepAwake } from 'expo-keep-awake';

const App = () => {
  const fontsLoaded = useFonts();
  useKeepAwake();

  return fontsLoaded ? <TimerComponent /> : <LoadingScreen />;
};

export default App;