import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AudioPlayerProvider } from './context/useAudioPlayerContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AudioPlayerProvider>
    <App />
    </AudioPlayerProvider>
  </React.StrictMode>
);

reportWebVitals();
