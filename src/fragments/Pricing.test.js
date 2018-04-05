import React from 'react';
import ReactDOM from 'react-dom';
import Pricing from './Pricing';
import { MemoryRouter } from "react-router-dom";

it('Pricing should renders without crashing', () => {
  const div = document.createElement('div');
  let component = <MemoryRouter><Pricing /></MemoryRouter>
  ReactDOM.render(component, div);
  ReactDOM.unmountComponentAtNode(div);
})
