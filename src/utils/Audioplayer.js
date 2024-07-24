class AudioPlayer {
    constructor() {
      this.audio = null;
    }
  
    play(src) {
      if (this.audio && this.audio.src === src && !this.audio.paused) {
        return; // Already playing the same audio, do nothing
      }
  
      if (this.audio) {
        this.audio.pause();
        this.audio.currentTime = 0; // Reset time to start
      }
  
      this.audio = new Audio(src);
      this.audio.play();
    }
  
    pause() {
      if (this.audio) {
        this.audio.pause();
      }
    }
  
    stop() {
      if (this.audio) {
        this.audio.pause();
        this.audio.currentTime = 0;
        this.audio = null; // Clear the audio instance
      }
    }
  }
  
  const audioPlayer = new AudioPlayer();
  export default audioPlayer;
  