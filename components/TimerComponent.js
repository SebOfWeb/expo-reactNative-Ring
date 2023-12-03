import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import RingBellSound from './RingBellSound';
import { Button } from 'react-native-paper';
import { Alert } from 'react-native';
import { Audio } from 'expo-av';

const playRingBellSound = async () => {
    const soundObject = new Audio.Sound();

    try {
        await soundObject.loadAsync(require('../assets/sounds/Ding.wav'));
        await soundObject.playAsync();
    } catch (error) {
        console.error('Erreur lors de la lecture du son :', error);
    }
};

const playRound1Sound = async () => {
    const soundObject = new Audio.Sound();

    try {
        await soundObject.loadAsync(require('../assets/sounds/Round-1.wav'));
        await soundObject.playAsync();
    } catch (error) {
        console.error('Erreur lors de la lecture du son :', error);
    }
};

const playRound2Sound = async () => {
    const soundObject = new Audio.Sound();

    try {
        await soundObject.loadAsync(require('../assets/sounds/Round-2.wav'));
        await soundObject.playAsync();
    } catch (error) {
        console.error('Erreur lors de la lecture du son :', error);
    }
};

const playRound3Sound = async () => {
    const soundObject = new Audio.Sound();

    try {
        await soundObject.loadAsync(require('../assets/sounds/Round-3.wav'));
        await soundObject.playAsync();
    } catch (error) {
        console.error('Erreur lors de la lecture du son :', error);
    }
};

const playRoundSound = async () => {
    const soundObject = new Audio.Sound();

    try {
        await soundObject.loadAsync(require('../assets/sounds/Round.wav'));
        await soundObject.playAsync();
    } catch (error) {
        console.error('Erreur lors de la lecture du son :', error);
    }
};




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
        switch (currRound) {
            case 1:
                playRound1Sound();
                break;

            case 2:
                playRound2Sound();
                break;

            case 3:
                playRound3Sound();
                break;

            default:
                playRoundSound();
                break;
        }

        intervalRef.current = setInterval(() => {
            setTimer(prevTimer => {
                if (prevTimer < roundTime * 60) {
                    return prevTimer + 1;
                } else {
                    clearInterval(intervalRef.current);
                    startRestTimer();
                    playRingBellSound();
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
            return `${currentRound}`;
        } else if (!isRestTime) {
            return `${currentRound}`;
        }
    };


    return (
        <View className='gap-y-4'>
            <Text className='text-white text-lg font-bold uppercase'>Durée des rounds</Text>
            <View className='flex flex-row gap-x-5'>
                <Text className='p-2 rounded-xl w-[130px] flex items-center justify-center text-white text-lg font-bold uppercase bg-black/50'> {roundTime} min</Text>
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
                <Text className='p-2 rounded-xl w-[130px] flex items-center justify-center text-white text-lg font-bold uppercase bg-black/50'> {restTime} min</Text>
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
                <Text className='p-2 rounded-xl w-[130px] flex items-center justify-center text-white text-lg font-bold uppercase bg-black/50'> {roundNumber}</Text>
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
            <Text className='p-2 rounded-xl mb-4 text-white text-xl font-bold uppercase bg-black/50'>Chronomètre: {timer.toFixed(1)} Secondes</Text>
            <Text className='p-2 rounded-xl mb-[100px] text-white text-xl font-bold uppercase bg-black/50'>ROUND: {getStatusText()}</Text>
            <Button
                className='w-3/4 flex mx-auto bg-red-500'
                mode="contained"
                onPress={handleStartStop}
            >
                {isTimerActive ? 'Arrêter' : 'Démarrer'}
            </Button>

        </View>
    );
};

const styles = StyleSheet.create({
    inputError: {
        borderColor: 'red',
    },
});

export default TimerComponent;
