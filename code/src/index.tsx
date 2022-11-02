import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AppStateManager from './AppStateManager';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const stateManager = new AppStateManager();
root.render(
  <React.StrictMode>
    <App initialNavPath="races" />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
