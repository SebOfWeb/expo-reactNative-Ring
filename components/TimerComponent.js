import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import RingBellSound from './RingBellSound';
import { Button } from 'react-native-paper';
import { Alert } from 'react-native';




const TimerComponent = () => {
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [timer, setTimer] = useState(0);
    const [roundTime, setRoundTime] = useState('0.1');
    const [restTime, setRestTime] = useState('0.05');
    const [roundNumber, setRoundNumber] = useState('2');
    const [currentRound, setCurrentRound] = useState(0);
    const intervalRef = useRef(null);
    let currRound = 0;
    let isRestTime = true;

    const startRoundTimer = () => {
        isRestTime = false;
        currRound++;
        setCurrentRound(currRound);
        intervalRef.current = setInterval(() => {
            setTimer(prevTimer => {
                if (prevTimer < roundTime * 60) {
                    return prevTimer + 1;
                } else {
                    clearInterval(intervalRef.current);
                    startRestTimer();
                    return 0;
                }
            });
        }, 1000);
    };

    const startRestTimer = () => {
        isRestTime = true;
        if (currRound < roundNumber) {
            intervalRef.current = setInterval(() => {
                setTimer(prevTimer => {
                    if (prevTimer < restTime * 60) {
                        return prevTimer + 1;
                    } else {
                        clearInterval(intervalRef.current);
                        startRoundTimer();
                        return 0;
                    }
                });
            }, 1000);
        } else {
            setIsTimerActive(false);
        }
    };

    const handleStartStop = () => {
        if (isTimerActive) {
            clearInterval(intervalRef.current);
            setIsTimerActive(false);
        } else {
            setIsTimerActive(true);
            setTimer(0);
            startRoundTimer();
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
        } else if (isRestTime) {
            return `Repos: ${currentRound}`;
        } else if (!isRestTime) {
            return `Round: ${currentRound}`;
        }
    };


    return (
        <View className='gap-y-4'>
            <Text className='text-white text-lg font-bold uppercase'>Durée des rounds</Text>
            <View className='flex flex-row gap-x-5'>
                <TextInput
                    className={`bg-white/50 ${restTimeStyle} text-sm p-2 w-1/3`}
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
                    <Button
                        className='bg-white/70'
                        onPress={decrementRoundTime}
                    >
                        -
                    </Button>
                    <Button
                        className='bg-black/70'
                        title="-" onPress={incrementRoundTime}
                    >
                        +
                    </Button>
                </View>
            </View>
            <Text className='text-white text-lg font-bold uppercase'>Temps de repos</Text>
            <View className='flex flex-row gap-x-5'>
                <TextInput
                    className={`bg-white/50 ${restTimeStyle} text-sm p-2 w-1/3`}
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
                    <Button
                        className='bg-white/70'
                        onPress={decrementRestTime}
                    >
                        -
                    </Button>
                    <Button
                        className='bg-black/70'
                        title="-" onPress={incrementRestTime}
                    >
                        +
                    </Button>
                </View>
            </View>
            <Text className='text-white text-lg font-bold uppercase border-corner' >Nombre de Rounds</Text>
            <View className='flex flex-row gap-x-5'>
                <TextInput
                    className={`bg-white/50 ${roundNumberStyle} text-sm p-2 w-1/3`}
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
                    <Button
                        className='bg-white/70'
                        onPress={decrementRoundNumber}
                    >
                        -
                    </Button>
                    <Button
                        className='bg-black/70'
                        title="-" onPress={incrementRoundNumber}
                    >
                        +
                    </Button>
                </View>
            </View>
            <Text className='p-1 mb-4 text-white text-xl font-bold uppercase bg-black/50'>Chronomètre: {timer.toFixed(1)} Secondes</Text>
            <Text className='p-1 mb-[10px] text-white text-xl font-bold uppercase bg-black/50'>Statut: {getStatusText()}</Text>
            <Button
                className='w-3/4 flex mx-auto bg-red-500'
                mode="contained"
                onPress={handleStartStop}
            >
                {isTimerActive ? 'Arrêter' : 'Démarrer'}
            </Button>
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
