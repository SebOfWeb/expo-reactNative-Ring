import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import RingBellSound from './RingBellSound';

const TimerComponent = () => {
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [timer, setTimer] = useState(0);
    const [roundTime, setRoundTime] = useState('');
    const [restTime, setRestTime] = useState('');
    const [roundNumber, setRoundNumber] = useState('');
    const [currentRound, setCurrentRound] = useState(1);
    const intervalRef = useRef(null);

    const handleStartStop = () => {
        if (isTimerActive) {
            clearInterval(intervalRef.current);
            setIsTimerActive(false);
        } else {
            if (roundTime === '' || restTime === '' || roundNumber === '') {
                // Mettez en évidence les champs vides (vous pouvez personnaliser le style)
                if (roundTime === '') setRoundTimeStyle(styles.inputError);
                if (restTime === '') setRestTimeStyle(styles.inputError);
                if (roundNumber === '') setRoundNumberStyle(styles.inputError);
                return;
            }

            setRoundTimeStyle(null);
            setRestTimeStyle(null);
            setRoundNumberStyle(null);

            let currentRoundCount = 1;
            setCurrentRound(currentRoundCount); // Réinitialise le compteur de round
            setTimer(0); // Réinitialise le chronomètre
            setIsTimerActive(true);

            intervalRef.current = setInterval(() => {
                setTimer(prevTimer => {
                    const newTime = prevTimer + 0.1;

                    if (newTime >= roundTime * 60) {
                        // Fin du round, vérifiez le nombre de rounds
                        if (currentRoundCount < roundNumber * 2) {
                            // Début du temps de repos
                            currentRoundCount++;
                            setCurrentRound(currentRoundCount);
                            return 0; // Réinitialise le chronomètre
                        } else {
                            // Tous les rounds sont terminés
                            clearInterval(intervalRef.current);
                            setIsTimerActive(false);
                            return roundTime * 60;
                        }
                    }

                    return newTime;
                });
            }, 100); // Mise à jour toutes les 100 millisecondes
        }
    };

    useEffect(() => {
        return () => clearInterval(intervalRef.current);
    }, []);

    const [roundTimeStyle, setRoundTimeStyle] = useState(null);
    const [restTimeStyle, setRestTimeStyle] = useState(null);
    const [roundNumberStyle, setRoundNumberStyle] = useState(null);

    const getStatusText = () => {
        if (!isTimerActive) {
            return 'Arrêté';
        } else if (currentRound % 2 === 1) {
            return `Round ${Math.ceil(currentRound / 2)}`;
        } else {
            return 'Repos';
        }
    };

    return (
        <View className='gap-y-4'>
            <Text className='text-white text-lg font-bold uppercase'>Durée des rounds</Text>
            <TextInput
                className={`bg-white/50 ${roundTimeStyle}`}
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                keyboardType="numeric"
                placeholder="Durée des rounds en minutes"
                value={roundTime}
                onChangeText={setRoundTime}
            />
            <Text className='text-white text-lg font-bold uppercase'>Temps de repos</Text>
            <TextInput
                className={`bg-white/50 ${restTimeStyle}`}
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                keyboardType="numeric"
                placeholder="Temps de repos en minutes"
                value={restTime}
                onChangeText={setRestTime}
            />
            <Text className='text-white text-lg font-bold uppercase' >Nombre de Rounds</Text>
            <TextInput
                className={`bg-white/50 ${roundNumberStyle}`}
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                keyboardType="numeric"
                placeholder="Nombre de Rounds"
                value={roundNumber}
                onChangeText={setRoundNumber}
            />
            <Text className='mb-4 text-black text-xl font-bold uppercase bg-white'>Chronomètre: {timer.toFixed(1)} Secondes</Text>
            <Text className='mb-4 text-black text-xl font-bold uppercase bg-white'>Statut: {getStatusText()}</Text>
            <Button
                title={isTimerActive ? 'Arrêter' : 'Démarrer'}
                onPress={handleStartStop}
            />
            {/*isTimerActive && <RingBellSound />*/}
        </View>
    );
};

const styles = StyleSheet.create({
    inputError: {
        borderColor: 'red',
    },
});

export default TimerComponent;
