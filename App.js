import * as Font from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground, Text, View, SafeAreaView } from 'react-native';
import TimerComponent from './components/TimerComponent';
import { useKeepAwake } from 'expo-keep-awake';
import { useEffect, useState } from 'react';

async function loadFonts() {
  await Font.loadAsync({
    'Capsmall': require('./assets/fonts/Capsmall.ttf'),
  });
}


export default function App() {

  //Hook pour le chargement des polices
  const [fontsLoaded, setFontsLoaded] = useState(false);
  //Hook pour garder l'écran allumé
  useKeepAwake();

  useEffect(() => {
    loadFonts().then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) {
    return <View />; // Affichez un écran de chargement ici si vous le souhaitez
  }

  return (
    <TimerComponent />
  );
}