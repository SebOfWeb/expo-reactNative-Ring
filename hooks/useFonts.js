import { useState, useEffect } from 'react';
import * as Font from 'expo-font';

const useFonts = () => {
    const [fontsLoaded, setFontsLoaded] = useState(false);

    async function loadFonts() {
        try {
            await Font.loadAsync({
                Capsmall: require('../assets/fonts/Capsmall.ttf'), // Assurez-vous que le chemin est correct
            });
            setFontsLoaded(true);
        } catch (error) {
            console.error('Erreur lors du chargement des polices:', error);
        }
    }

    useEffect(() => {
        loadFonts();
    }, []);

    return fontsLoaded;
};

export default useFonts;
