import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { Button } from 'react-native-paper';
import useTimer from '../hooks/useTimer';


const Screen = () => {

    const {
        isTimerActive,
        timer,
        roundTime,
        restTime,
        roundNumber,
        currentRound,
        handleStartStop,
        changeTime,
    } = useTimer();

    const incrementRoundTime = () => changeTime('roundTime', roundTime + 1);
    const decrementRoundTime = () => changeTime('roundTime', roundTime - 1);
    const incrementRestTime = () => changeTime('restTime', restTime + 1);
    const decrementRestTime = () => changeTime('restTime', restTime - 1);
    const incrementRoundNumber = () => changeTime('roundNumber', roundNumber + 1);
    const decrementRoundNumber = () => changeTime('roundNumber', roundNumber - 1);

    const getStatusText = () => {
        if (!isTimerActive) {
            return 'Arrêté';
        } else if (currentRound % 2 === 0) {
            return `${currentRound}`;
        } else {
            return `${currentRound}`;
        }
    };

    return (
        <SafeAreaView
            name='container'
            className='gap-y-2 flex-1 pt-0'>
            <View className="bg-blue-800/90 rounded-b-lg max-h-[180px] h-[15%] justify-center items-center">
                <Text className="font-Capsmall text-white text-[120px] tracking-wider">RING</Text>
            </View>
            <Text
                className='text-red-500 text-xl uppercase ml-2 font-Capsmall'>Durée des rounds</Text>
            <View className='flex flex-row bg-red-600 py-3 pr-4 pl-4 rounded-3xl w-[100%] font-Capsmall max-h-[70px]'>
                <Text
                    className='font-Capsmall p-2 rounded-3xl w-[50%] flex items-center justify-center text-blue-800 text-center text-lg uppercase bg-white/90'> {roundTime} min</Text>
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
                className='font-Capsmall text-red-500 text-xl uppercase ml-2'>Temps de repos</Text>
            <View className='font-Capsmall max-h-[70px] flex flex-row bg-red-600 py-3 pr-4 pl-4 rounded-3xl w-[100%]'>
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
                className='font-Capsmall text-red-500 text-xl uppercase ml-2' >Nombre de Rounds</Text>
            <View className='font-Capsmall max-h-[70px] flex flex-row bg-red-600 py-3 pr-4 pl-4 rounded-3xl w-[100%]'>
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
                className='font-Capsmall max-h-[40px] p-2 flex align-center rounded-xl text-white text-xl uppercase bg-blue-800/90'>Chronomètre: {timer} Secondes</Text>
            <Text
                className='font-Capsmall max-h-[40px] p-2 rounded-xl mb-2 text-white text-xl uppercase bg-blue-800/90'>ROUND: {getStatusText()}</Text>
            <Button
                className='flex mb-[20px] h-[120px] w-[120px] justify-center mx-auto rounded-full bg-red-600'
                mode="contained"
                onPress={handleStartStop}>
                <Text
                    className='font-Capsmall text-2xl'>
                    {isTimerActive ? 'STOP' : 'FIGHT'}
                </Text>
            </Button>
        </SafeAreaView >
    );
};

export default Screen;
