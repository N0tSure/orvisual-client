import React from 'react';
import { Row, Col, Image, Button } from 'react-bootstrap';
import './Picture.css';

const PicturesPane = (props) => {
  let rows = [];
  let layout = [];

  props.images.forEach((image, index) => {
    let rowNum = Math.floor(index / 2);
    if (rows[rowNum] === undefined) {
      rows[rowNum] = [
        <Picture
          key={index}
          fileIndex={index}
          columnOffset={2}
          image={image} removePicture={props.removePicture} />
      ];
    } else {
      rows[rowNum].push(
        <Picture
          key={index}
          fileIndex={index}
          columnOffset={0} image={image}
          removePicture={props.removePicture}
         />
      );
    }
  });

  layout = rows.map((row, index) => {
    return(
      <Row className="picturesRow" key={index}>{row}</Row>
    );
  });

  return(
    <React.Fragment>
      {layout}
    </React.Fragment>
  );
}

const Picture = (props) => {
  return(
    <Col className="picture-block" sm={4} smOffset={props.columnOffset}>
      <Image
        key={props.image.name}
        alt={props.image.name}
        src={window.URL.createObjectURL(props.image)} responsive />
      <Button bsSize="small" bsStyle="danger" onClick={() => props.removePicture(props.fileIndex)}>x</Button>
    </Col>
  );
}

export default PicturesPane;
