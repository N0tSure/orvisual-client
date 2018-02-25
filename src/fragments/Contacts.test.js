import React from 'react';
import ReactDOM from 'react-dom';
import Contacts from './Contacts';

it('Contacts should render without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Contacts />, div);
  ReactDOM.unmountComponentAtNode(div);
})
