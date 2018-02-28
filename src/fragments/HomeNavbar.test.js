import React from 'react';
import ReactDOM from 'react-dom';
import HomeNavbar from './HomeNavbar';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<HomeNavbar />, div);
  ReactDOM.unmountComponentAtNode(div);
});
