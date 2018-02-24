import React from 'react';
import ReactDOM from 'react-dom';
import CompanyHeading from './About';
import About from './About';

it('CompanyHeading renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CompanyHeading />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('About renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<About />, div);
  ReactDOM.unmountComponentAtNode(div);
});
