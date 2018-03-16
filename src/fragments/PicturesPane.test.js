import React from 'react';
import ReactDOM from 'react-dom';
import PicturesPane from './PicturesPane';

// mock global function createObjectURL
window.URL.createObjectURL = (file) => {
  return 'http:\\\\example.com\\' + file.name;
}

it('Pictures pane should renders without crashes', () => {
  const root = document.createElement('div');
  const files = [ new File(["foo"], "foo.jpg", {
    type: "image/jpeg"
  }) ];
  ReactDOM.render(<PicturesPane images={files} />, root);
  ReactDOM.unmountComponentAtNode(root);
})
