import React from 'react';
import ReactDOM from 'react-dom';
import Order from './Order';
import { MemoryRouter } from "react-router-dom";

it('Order page should renders without crashes', () => {
  const root = document.createElement('div');
  let component = <MemoryRouter><Order /></MemoryRouter>
  ReactDOM.render(component, root);
  ReactDOM.unmountComponentAtNode(root);
});
