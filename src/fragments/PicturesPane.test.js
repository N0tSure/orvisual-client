import React from 'react';
import ReactDOM from 'react-dom';
import PicturesPane from './PicturesPane';

it('Pictures pane should renders without crashes', () => {
  const root = document.createElement('div');
  const files = [ new File() ];
  ReactDOM.render(<PicturesPane images={files} />, root);
  ReactDOM.unmountComponentAtNode(root);
})
