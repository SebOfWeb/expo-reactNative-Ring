import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

const LoadingScreen = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text>Chargement des polices...</Text>
    </View>
);

export default LoadingScreen;