import * as Font from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground, Text, View } from 'react-native';
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
    <View
      className='flex-1 bg-white'
    >
      <View
        className='bg-blue-800/90 rounded-b-lg'
        style={{ height: 120, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontFamily: 'Capsmall', color: 'white', fontSize: 100, letterSpacing: 2 }}>RING</Text>
      </View>

      <View
        style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
        className='flex-1 items-center justify-center bg-transparent'>
        <View>
          <TimerComponent />
        </View>
        <StatusBar style="auto" />
      </View>

    </View>
  );
}