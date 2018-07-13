import React from 'react';
import ReactDOM from 'react-dom';
import OrderRow from './OrderRow';

it('should render without crashing', () => {
  const root = document.createElement('div');
  ReactDOM.render(<OrderRow />, root);
  ReactDOM.unmountComponentAtNode(root);
})
