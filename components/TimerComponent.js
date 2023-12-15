import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView } from 'react-native';
import RingBellSound from './RingBellSound';
import { Button } from 'react-native-paper';
import { Alert } from 'react-native';
import { Audio } from 'expo-av';
import { StatusBar } from 'expo-status-bar';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';


const playRingBellSound = async () => {
    const soundObject = new Audio.Sound();

    try {
        await soundObject.loadAsync(require('../assets/sounds/bipbip.wav'));
        await soundObject.playAsync();
    } catch (error) {
        console.error('Erreur lors de la lecture du son :', error);
    }
};


const TimerComponent = () => {
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [timer, setTimer] = useState(0);
    const [roundTime, setRoundTime] = useState('3');
    const [restTime, setRestTime] = useState('1');
    const [roundNumber, setRoundNumber] = useState('3');
    const [currentRound, setCurrentRound] = useState(0);
    const intervalRef = useRef(null);
    let currRound = 0;
    let isRestTime = true;

    const startRoundTimer = () => {
        isRestTime = false;
        currRound++;
        setCurrentRound(currRound);
        playRingBellSound();

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
        if (newValue > 1) {
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
        if (newValue > 1) {
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
        <SafeAreaView
            name='container'
            style={{ paddingTop: 0 }}
            className='gap-y-2 flex-1'>
            <View
                className='bg-blue-800/90 rounded-b-lg'
                style={{ flex: 5, maxHeight: 180, height: '15%', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontFamily: 'Capsmall', color: 'white', fontSize: 100, letterSpacing: 2 }}>RING</Text>
            </View>
            <Text
                style={{ flex: 1, fontFamily: 'Capsmall', fontSize: RFPercentage(1.6) }}
                className='text-red-500 text-xl uppercase ml-2'>Durée des rounds</Text>
            <View className='flex flex-row bg-red-600 py-3 pr-4 pl-4 rounded-3xl w-[100%]'
                style={{ flex: 2, maxHeight: 70, fontFamily: 'Capsmall' }}>
                <Text
                    style={{ fontFamily: 'Capsmall' }}
                    className='p-2 rounded-3xl w-[50%] flex items-center justify-center text-blue-800 text-center text-lg uppercase bg-white/90'> {roundTime} min</Text>
                <View
                    className='flex flex-row pl-4'>
                    <Button
                        className='bg-white/90 rounded-3xl'
                        onPress={decrementRoundTime}
                    >
                        <Text className='text-blue-800 text-xl'>
                            -
                        </Text>
                    </Button>
                    <Button
                        className='bg-blue-800/90 rounded-3xl'
                        onPress={incrementRoundTime}
                    >
                        <Text className='text-white text-xl'>
                            +
                        </Text>
                    </Button>
                </View>
            </View>
            <Text
                style={{ flex: 1, fontFamily: 'Capsmall', fontSize: RFPercentage(1.6) }}
                className='text-red-500 text-xl uppercase ml-2'>Temps de repos</Text>
            <View className='flex flex-row bg-red-600 py-3 pr-4 pl-4 rounded-3xl w-[100%]'
                style={{ flex: 2, maxHeight: 70, fontFamily: 'Capsmall' }}>
                <Text
                    style={{ fontFamily: 'Capsmall' }}
                    className='p-2 rounded-3xl w-[50%] flex items-center justify-center text-blue-800 text-center text-lg uppercase bg-white/90'> {restTime} min</Text>
                <View
                    className='flex flex-row pl-4'>
                    <Button
                        className='bg-white/90 rounded-3xl'
                        onPress={decrementRestTime}
                    >
                        <Text className='text-blue-800 text-xl'>
                            -
                        </Text>
                    </Button>
                    <Button
                        className='bg-blue-800/90 rounded-3xl'
                        title="-" onPress={incrementRestTime}
                    >
                        <Text className='text-white text-xl'>
                            +
                        </Text>
                    </Button>
                </View>
            </View>
            <Text
                style={{ flex: 1, fontFamily: 'Capsmall', fontSize: RFPercentage(1.6) }}
                className='text-red-500 text-xl uppercase ml-2' >Nombre de Rounds</Text>
            <View className='flex flex-row bg-red-600 py-3 pr-4 pl-4 rounded-3xl w-[100%]'
                style={{ flex: 2, maxHeight: 70, fontFamily: 'Capsmall' }}>
                <Text
                    style={{ fontFamily: 'Capsmall' }}
                    className='p-2 rounded-3xl w-[50%] flex items-center justify-center text-blue-800 text-center text-lg uppercase bg-white/90'> {roundNumber}</Text>
                <View
                    className='flex flex-row pl-4'>
                    <Button
                        className='bg-white/90 rounded-3xl'
                        onPress={decrementRoundNumber}
                    >
                        <Text className='text-blue-800 text-xl'>
                            -
                        </Text>
                    </Button>
                    <Button
                        className='bg-blue-800/90 rounded-3xl'
                        title="-" onPress={incrementRoundNumber}
                    >
                        <Text className='text-white text-xl'>
                            +
                        </Text>
                    </Button>
                </View>
            </View>
            <Text
                style={{ flex: 1, maxHeight: 40, fontFamily: 'Capsmall', fontSize: RFPercentage(1.6) }}
                className='p-2 flex align-center rounded-xl text-white text-xl uppercase bg-blue-800/90'>Chronomètre: {timer} Secondes</Text>
            <Text
                style={{ flex: 1, maxHeight: 40, fontFamily: 'Capsmall', fontSize: RFPercentage(1.6) }}
                className='p-2 rounded-xl mb-2 text-white text-xl uppercase bg-blue-800/90'>ROUND: {getStatusText()}</Text>
            <Button
                style={{
                    flex: 5,
                    marginBottom: 20,
                    borderRadius: 50, // Assurez un bord arrondi élevé pour un effet circulaire
                    maxHeight: 120, // Hauteur du bouton
                    width: 120, // Largeur du bouton
                }}

                className='flex justify-center mx-auto bg-red-600'
                mode="contained"
                onPress={handleStartStop}
            >
                <Text
                    style={{ fontFamily: 'Capsmall' }}
                    className='text-2xl'>
                    {isTimerActive ? 'STOP' : 'FIGHT'}
                </Text>
            </Button>
        </SafeAreaView>
    );
};

export default TimerComponent;
