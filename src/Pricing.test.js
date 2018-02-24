import React from 'react';
import ReactDOM from 'react-dom';
import Pricing from './Pricing';

it('Pricing should renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Pricing />, div);
  ReactDOM.unmountComponentAtNode(div);
})
