import React from 'react';
import ReactDOM from 'react-dom';
import Order from './Order';

it('Order page should renders without crashes', () => {
  const root = document.createElement('div');
  ReactDOM.render(<Order />, root);
  ReactDOM.unmountComponentAtNode(root);
})
