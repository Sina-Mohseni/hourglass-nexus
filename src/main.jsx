import React from 'react';
import ReactDOM from 'react-dom/client';
import { GameProvider } from './hooks/useGame';
import App from './App';
import './styles/global.css';
import './styles/components.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <GameProvider>
    <App />
  </GameProvider>
);
