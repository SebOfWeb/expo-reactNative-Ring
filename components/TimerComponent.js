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

    const incrementRoundTime = () => {
        let newValue = parseInt(roundTime) || 0;
        newValue++;
        setRoundTime(newValue.toString());
    };

    const decrementRoundTime = () => {
        let newValue = parseInt(roundTime) || 0;
        if (newValue > 0) {
            newValue--;
            setRoundTime(newValue.toString());
        }
    };

    const incrementRestTime = () => {
        let newValue = parseInt(restTime) || 0;
        newValue++;
        setRestTime(newValue.toString());
    };

    const decrementRestTime = () => {
        let newValue = parseInt(restTime) || 0;
        if (newValue > 0) {
            newValue--;
            setRestTime(newValue.toString());
        }
    };

    const incrementRoundNumber = () => {
        let newValue = parseInt(roundNumber) || 0;
        newValue++;
        setRoundNumber(newValue.toString());
    };

    const decrementRoundNumber = () => {
        let newValue = parseInt(roundNumber) || 0;
        if (newValue > 0) {
            newValue--;
            setRoundNumber(newValue.toString());
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
            return `Repos ${Math.ceil(currentRound / 2)}`;
        }
    };

    return (
        <View className='gap-y-4'>
            <Text className='text-white text-lg font-bold uppercase'>Durée des rounds</Text>
            <View className='flex flex-row gap-x-5'>
                <TextInput
                    className={`bg-white/50 ${restTimeStyle} text-sm p-2 w-2/3`}
                    style={[
                        { height: 40, borderColor: 'black', borderWidth: 1 },
                        roundTime === '' ? { borderColor: 'red' } : null
                    ]}
                    keyboardType="numeric"
                    placeholder="En minutes"
                    value={roundTime}
                    onChangeText={setRoundTime}
                />
                <View
                    className='flex flex-row'>
                    <Button title="+" onPress={incrementRoundTime} />
                    <Button title="-" onPress={decrementRoundTime} />
                </View>
            </View>
            <Text className='text-white text-lg font-bold uppercase'>Temps de repos</Text>
            <View className='flex flex-row gap-x-5'>
                <TextInput
                    className={`bg-white/50 ${restTimeStyle} text-sm p-2 w-2/3`}
                    style={[
                        { height: 40, borderColor: 'black', borderWidth: 1 },
                        restTime === '' ? { borderColor: 'red' } : null
                    ]}
                    keyboardType="numeric"
                    placeholder="En minutes"
                    value={restTime}
                    onChangeText={setRestTime}
                />
                <View
                    className='flex flex-row'>
                    <Button title="+" onPress={incrementRestTime} />
                    <Button title="-" onPress={decrementRestTime} />
                </View>
            </View>
            <Text className='text-white text-lg font-bold uppercase border-corner' >Nombre de Rounds</Text>
            <View className='flex flex-row gap-x-5'>
                <TextInput
                    className={`bg-white/50 ${roundNumberStyle} text-sm p-2 w-2/3`}
                    style={[
                        { height: 40, borderColor: 'black', borderWidth: 1 },
                        roundNumber === '' ? { borderColor: 'red' } : null
                    ]}
                    keyboardType="numeric"
                    placeholder="En nombre"
                    value={roundNumber}
                    onChangeText={setRoundNumber}
                />
                <View
                    className='flex flex-row'>
                    <Button title="+" onPress={incrementRoundNumber} />
                    <Button title="-" onPress={decrementRoundNumber} />
                </View>
            </View>
            <Text className='p-1 mb-4 text-white text-xl font-bold uppercase bg-black/50'>Chronomètre: {timer.toFixed(1)} Secondes</Text>
            <Text className='p-1 mb-[10px] text-white text-xl font-bold uppercase bg-black/50'>Statut: {getStatusText()}</Text>
            <Button
                title={isTimerActive ? 'Arrêter' : 'Démarrer'}
                onPress={handleStartStop}
            />
            <RingBellSound />
        </View>
    );
};

const styles = StyleSheet.create({
    inputError: {
        borderColor: 'red',
    },
});

export default TimerComponent;
