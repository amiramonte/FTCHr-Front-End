import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {userContext, UserContextProvider } from './components/context/UserContext'

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

