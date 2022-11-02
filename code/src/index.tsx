import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Student } from './common/models';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const defaultStudents: Student[] = [
  {name: 'Shu'}, {name: 'Jennie'}, {name: 'Benji'}, {name: 'Lukas'}
];
root.render(
  <React.StrictMode>
    <App initialNavState={ {navPath: 'races'} } initialAppModelState={ {races: [], students: defaultStudents} } />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
