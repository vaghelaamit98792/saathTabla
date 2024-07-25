import React, { createContext, useContext } from 'react';
import useAudioPlayer from '../hooks/useAudioPlayer';

const AudioPlayerContext = createContext();

export const AudioPlayerProvider = ({ children }) => {
    const audioPlayer = useAudioPlayer();
    return (
        <AudioPlayerContext.Provider value={audioPlayer}>
            {children}
        </AudioPlayerContext.Provider>
    );
};

export const useAudioPlayerContext = () => useContext(AudioPlayerContext);
