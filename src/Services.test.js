import React from 'react';
import ReactDOM from 'react-dom';
import Services from './Services';

it('Services should render without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Services />, div);
  ReactDOM.unmountComponentAtNode(div);
})
