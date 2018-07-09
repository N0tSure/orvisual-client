import React from 'react';
import ReactDOM from 'react-dom';
import Table from './Table';

it('should render without crashing', () => {
  const root = document.createElement('div');
  ReactDOM.render(<Table />, root);
  ReactDOM.unmountComponentAtNode(root);
});
