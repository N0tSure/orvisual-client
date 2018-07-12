import React from 'react';
import ReactDOM from 'react-dom';
import Table from './Table';
import jest from 'jest-mock';

it('should render without crashing', () => {
  window.URL = function URL(url, base) {
    this.base = base;
    this.url = url;
    this.searchParams = {
      append: (name, value) => `${name}=${value}`
    };
  };
  window.fetch = jest.fn(() => new Promise((resolve, reject) => resolve()));
  const root = document.createElement('div');
  ReactDOM.render(<Table />, root);
  ReactDOM.unmountComponentAtNode(root);
});
