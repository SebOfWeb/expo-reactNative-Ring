import { Audio } from 'expo-av';

const playRingBellSound = async () => {
    const soundObject = new Audio.Sound();
    try {
        await soundObject.loadAsync(require('../assets/sounds/bipbip.wav'));
        await soundObject.playAsync();
        // Assurez-vous de gérer l'arrêt du son plus tard ou ici selon votre logique.
    } catch (error) {
        console.error('Erreur lors de la lecture du son :', error);
    }
};

export default playRingBellSound;