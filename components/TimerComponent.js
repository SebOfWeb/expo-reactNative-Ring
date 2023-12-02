import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import RingBellSound from './RingBellSound';


const TimerComponent = () => {
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [timer, setTimer] = useState(0);
    const [RoundTime, setRoundTime] = useState('');
    const [RestTime, setRestTime] = useState('');
    const [RoundNumber, setRoundNumber] = useState('');
    const intervalRef = useRef(null);

    const handleStartStop = () => {
        if (isTimerActive) {
            clearInterval(intervalRef.current);
            setIsTimerActive(false);
        } else {
            setTimer(0); // Réinitialise le chronomètre
            setIsTimerActive(true);
            intervalRef.current = setInterval(() => {
                setTimer(prevTimer => {
                    const newTime = prevTimer + 0.1;
                    if (newTime >= RoundTime * 60) {
                        clearInterval(intervalRef.current);
                        setIsTimerActive(false);
                        return RoundTime * 60;
                    }
                    return newTime;
                });
            }, 100); // Mise à jour toutes les 100 millisecondes
        }
    };

    useEffect(() => {
        return () => clearInterval(intervalRef.current);
    }, []);

    return (
        <View className='gap-y-4'>
            <Text className='text-white text-lg font-bold uppercase'>Durée des rounds</Text>
            <TextInput
                className='bg-white/50'
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                keyboardType="numeric"
                placeholder="Durée des rounds en minutes"
                value={RoundTime}
                onChangeText={setRoundTime}
            />
            <Text className='text-white text-lg font-bold uppercase'>Temps de repos</Text>
            <TextInput
                className='bg-white/50'
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                keyboardType="numeric"
                placeholder="Temps de repos en minutes"
                value={RestTime}
                onChangeText={setRestTime}
            />
            <Text className='text-white text-lg font-bold uppercase' >Nombres de Rounds</Text>
            <TextInput
                className='bg-white/50'
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                keyboardType="numeric"
                placeholder="Nombres de Rounds"
                value={RoundNumber}
                onChangeText={setRoundNumber}
            />
            <Text className='mb-4 text-black text-xl font-bold uppercase bg-white'>Chronomètre: {timer.toFixed(1)} Secondes</Text>
            <Button
                title={isTimerActive ? 'Arrêter' : 'Démarrer'}
                onPress={handleStartStop}
            />
            {/*isTimerActive && <RingBellSound />*/}
        </View>
    );
};

export default TimerComponent;
