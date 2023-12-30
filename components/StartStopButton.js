import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';

export const StartStopButton = ({ isTimerActive, onStartStop }) => (
    <Button
        className='flex mb-[20px] h-[120px] w-[120px] justify-center mx-auto rounded-full bg-red-600'
        mode="contained"
        onPress={onStartStop}>
        <Text className='font-Capsmall text-2xl'>
            {isTimerActive ? 'STOP' : 'FIGHT'}
        </Text>
    </Button>
);