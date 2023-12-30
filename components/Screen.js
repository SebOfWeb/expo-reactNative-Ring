import React from 'react';
import { SafeAreaView } from 'react-native';
import useTimer from '../hooks/useTimer';
import { TimerDisplay } from './TimerDisplay';
import { TimeControl } from './TimeControl';
import { StartStopButton } from './StartStopButton';
import { RingHeader } from './RingHeader';

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

    return (
        <SafeAreaView className='flex-1'>
            <RingHeader title='RING' />
            <TimeControl title="Durée des rounds" value={roundTime} onIncrement={() => incrementRoundTime()} onDecrement={() => decrementRoundTime()} />
            <TimeControl title="Temps de repos" value={restTime} onIncrement={() => incrementRestTime()} onDecrement={() => decrementRestTime()} />
            <TimeControl title="Nombre de Rounds" value={roundNumber} onIncrement={() => incrementRoundNumber()} onDecrement={() => decrementRoundNumber()} />
            <TimerDisplay timer={timer} currentRound={currentRound} />
            <StartStopButton isTimerActive={isTimerActive} onStartStop={handleStartStop} />
        </SafeAreaView>
    );
};

export default Screen;
