import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';
import { MemoryRouter } from "react-router-dom";

it('Home renders without crashing', () => {
  const div = document.createElement('div');
  let component = <MemoryRouter><Home /></MemoryRouter>;
  ReactDOM.render(component, div);
  ReactDOM.unmountComponentAtNode(div);
});
