import React from "react";
import { View, Text } from "react-native";

export const RingHeader = ({ title }) => (
    <View className="bg-blue-800/90 rounded-b-lg max-h-[180px] h-[15%] justify-center items-center">
        <Text className="font-Capsmall text-white text-[120px] tracking-wider">{title}</Text>
    </View>
);
