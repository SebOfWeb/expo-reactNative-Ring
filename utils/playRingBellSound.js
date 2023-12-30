import { Audio } from 'expo-av';

const playRingBellSound = async () => {
    const soundObject = new Audio.Sound();
    try {
        await soundObject.loadAsync(require('../assets/sounds/bipbip.wav'));
        await soundObject.playAsync();
    } catch (error) {
        console.error('Erreur lors de la lecture du son :', error);
    }
};

export default playRingBellSound;