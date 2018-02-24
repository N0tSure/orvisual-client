import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import registerServiceWorker from './registerServiceWorker';
import MainNavbar from './MainNavbar.js';

ReactDOM.render(<MainNavbar />, document.getElementById('root'));
registerServiceWorker();
