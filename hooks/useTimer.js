import { useState, useRef, useEffect } from 'react';
import playRingBellSound from '../utils/playRingBellSound';

const useTimer = () => {
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [timer, setTimer] = useState(0);
    const [roundTime, setRoundTime] = useState(3);
    const [restTime, setRestTime] = useState(1);
    const [roundNumber, setRoundNumber] = useState(3);
    const [currentRound, setCurrentRound] = useState(0);
    const intervalRef = useRef(null);

    const startTimer = (duration, callback) => {
        intervalRef.current = setInterval(() => {
            setTimer(prevTimer => {
                if (prevTimer < duration * 60 - 1) { // -1 to compensate for 0 index
                    return prevTimer + 1;
                }
                clearInterval(intervalRef.current);
                callback();
                return 0;
            });
        }, 1000);
    };

    const startRoundTimer = () => {
        setCurrentRound(prevRound => prevRound + 1);
        playRingBellSound();
        startTimer(roundTime, startRestTimer);
    };

    const startRestTimer = () => {
        if (currentRound < roundNumber) {
            playRingBellSound();
            startTimer(restTime, startRoundTimer);
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
            setCurrentRound(0);
            startRoundTimer();
        }
    };

    const changeTime = (type, value) => {
        const parsedValue = parseInt(value, 10);
        if (!isNaN(parsedValue) && parsedValue >= 0) {
            switch (type) {
                case 'roundTime':
                    setRoundTime(parsedValue);
                    break;
                case 'restTime':
                    setRestTime(parsedValue);
                    break;
                case 'roundNumber':
                    setRoundNumber(parsedValue);
                    break;
                default:
                    break;
            }
        }
    };

    useEffect(() => {
        return () => clearInterval(intervalRef.current);
    }, []);

    return {
        isTimerActive,
        timer,
        roundTime,
        restTime,
        roundNumber,
        currentRound,
        handleStartStop,
        changeTime, // This replaces all increment and decrement functions
    };
};

export default useTimer;
