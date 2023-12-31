import React, { useEffect } from 'react';
import { Audio } from 'expo-av';

const RingBellSound = () => {
    useEffect(() => {
        let soundObject;

        const playSound = async () => {
            soundObject = new Audio.Sound();

            try {
                await soundObject.loadAsync(require('../assets/sounds/Ding.wav'));
                await soundObject.playAsync();
            } catch (error) {
                console.error('Erreur lors de la lecture du son :', error);
            }
        };

        playSound();

        return () => {
            if (soundObject) {
                soundObject.unloadAsync();
            }
        };
    }, []);

    return null;
};

export default RingBellSound;
