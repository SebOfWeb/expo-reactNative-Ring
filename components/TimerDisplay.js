import React from 'react';
import { View, Text } from 'react-native';

export const TimerDisplay = ({ timer, currentRound }) => (
    <View className='flex flex-col gap-y-4 mb-1 mt-2'>
        <Text className='font-Capsmall max-h-[40px] p-2 flex align-center rounded-xl text-white text-xl uppercase bg-blue-800/90'>
            Chronomètre: {timer} Secondes
        </Text>
        <Text className='font-Capsmall max-h-[40px] p-2 rounded-xl mb-2 text-white text-xl uppercase bg-blue-800/90'>
            ROUND: {currentRound}
        </Text>
    </View>
);
