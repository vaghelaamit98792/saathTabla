import { useState } from 'react';
import audioPlayer from '../utils/Audioplayer';

const useAudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingIndex, setPlayingIndex] = useState(null);

  const handlePlayPause = (path, index) => {
    if (playingIndex === index) {
      // If the same audio is clicked, toggle play/pause
      if (isPlaying) {
        audioPlayer.pause();
        setIsPlaying(false);
        setPlayingIndex(null)
      } else {
        audioPlayer.play(path);
        setIsPlaying(true);
        setPlayingIndex(index)

      }
    } else {
      // If different audio is clicked, stop the current and play the new one
      audioPlayer.play(path);
      setPlayingIndex(index);
      setIsPlaying(true);
    }
  };

  return {
    playingIndex,
    isPlaying,
    handlePlayPause,
  };
};

export default useAudioPlayer;
