import React from 'react';
import ReactDOM from 'react-dom';
import OrderForm from './OrderForm';

it('Order form fragment should renders without crashing', () => {
  const root = document.createElement('div');
  ReactDOM.render(<OrderForm sendFormData={() => {}}/>, root);
  ReactDOM.unmountComponentAtNode(root);
})
