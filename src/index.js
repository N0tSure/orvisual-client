import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import registerServiceWorker from './registerServiceWorker';
import Home from './Home';
import OrderEntry from './OrderEntry';

const App = () => {
  return(
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/order' component={OrderEntry} />
      </Switch>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
