import React from 'react';
import ReactDOM from 'react-dom';
import MainNavbar from './MainNavbar';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MainNavbar />, div);
  ReactDOM.unmountComponentAtNode(div);
});
