import React from 'react';
import ReactDOM from 'react-dom';
import OrderRow from './OrderRow';

it('should render without crashing', () => {
  const realFetch = window.fetch;
  window.fetch = () => new Promise(function (resolve, reject) {
    setTimeout(() => resolve(), 500);
  });
  const root = document.createElement('div');
  const rowInfo = {
    original: {
      '_links': {
        pictures: {
          href: 'http://localhost/api/pictures'
        }
      }
    }
  };

  ReactDOM.render(<OrderRow rowInfo={rowInfo} />, root);
  ReactDOM.unmountComponentAtNode(root);
  window.fetch = realFetch;
})
