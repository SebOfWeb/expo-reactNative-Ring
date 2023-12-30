import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';

export const TimeControl = ({ title, value, onIncrement, onDecrement }) => (
    <View className='mb-1 mt-2'>
        <Text className='font-Capsmall text-red-500 text-xl uppercase ml-2'>{title}</Text>
        <View className='font-Capsmall max-h-[70px] flex flex-row bg-red-600 py-3 pr-4 pl-4 rounded-3xl w-[100%]'>
            <Text className='font-Capsmall p-2 rounded-3xl w-[50%] flex items-center justify-center text-blue-800 text-center text-lg uppercase bg-white/90'>
                {value} min
            </Text>
            <View className='flex flex-row pl-4'>
                <Button className='bg-white/90 rounded-3xl' onPress={onDecrement}>
                    <Text className='text-blue-800 text-xl'>-</Text>
                </Button>
                <Button className='bg-blue-800/90 rounded-3xl' onPress={onIncrement}>
                    <Text className='text-white text-xl'>+</Text>
                </Button>
            </View>
        </View>
    </View>
);
