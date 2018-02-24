import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import registerServiceWorker from './registerServiceWorker';
import MainPage from './MainPage.js';

ReactDOM.render(<MainPage />, document.getElementById('root'));
registerServiceWorker();
