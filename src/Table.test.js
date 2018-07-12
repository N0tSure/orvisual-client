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
  const dummy_response = {
    ok: true,
    json: function() {
      return {
        '_embedded': {
          'orders': []
        },
        'page': {
          'totalPages': 0
        }
      };
    }
  };

  const dummy_fetch = new Promise(function(resolve, reject) {
    setTimeout(() => resolve(dummy_response), 500);
  });

  window.fetch = jest.fn(() => dummy_fetch);
  const root = document.createElement('div');
  ReactDOM.render(<Table />, root);
  ReactDOM.unmountComponentAtNode(root);
  
});
