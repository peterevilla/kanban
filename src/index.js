import React from 'react';
import ReactDOM from 'react-dom';
import './assets/main.css'
import App from './App';


import Amplify from 'aws-amplify'
import config from './aws-exports'
Amplify.configure(config)


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


