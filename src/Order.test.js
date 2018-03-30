import React from 'react';
import ReactDOM from 'react-dom';
import Order from './Order';
import createHistory from "history/createBrowserHistory";
import { MemoryRouter, Route, Switch } from 'react-router-dom';

it('Order page should renders without crashes', () => {
  const root = document.createElement('div');
  ReactDOM.render(<Order match={ { params: { control: '' } }} />, root);
  ReactDOM.unmountComponentAtNode(root);
})

it('Should inform about successfull order submission', () => {
  const root = document.createElement('div');
  ReactDOM.render(<Order match={{ params: { control: 'success' } }} />, root);
  ReactDOM.unmountComponentAtNode(root);
})
