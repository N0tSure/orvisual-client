import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import registerServiceWorker from './registerServiceWorker';
import Home from './Home';
import Order from './Order';

const App = () => {
  return(
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/order/:control' component={Order} />
        <Route path='/order' component={Order} />
      </Switch>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
