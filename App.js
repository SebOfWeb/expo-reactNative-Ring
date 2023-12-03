import { StatusBar } from 'expo-status-bar';
import { ImageBackground, Text, View } from 'react-native';
import backgroundImage from '../Ring/assets/bg-ring.png';
import TimerComponent from './components/TimerComponent';

export default function App() {
  return (
    <ImageBackground
      className='flex-1'
      source={backgroundImage} >

      <View style={{ height: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <Text style={{ color: 'white', fontSize: 50, letterSpacing: 15 }}>RING</Text>
      </View>

      <View
        style={{ height: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
        className='flex-1 items-center justify-center bg-transparent'>
        <View>
          <TimerComponent />
        </View>
        <StatusBar style="auto" />
      </View>

    </ImageBackground>
  );
}