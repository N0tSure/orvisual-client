import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';

const PicturesPane = (props) => {
  let rows = [];
  let layout = [];

  props.images.forEach((image, index) => {
    let rowNum = Math.floor(index / 2);
    if (rows[rowNum] === undefined)
      rows[rowNum] = [];

      rows[rowNum].push(
        <Col key={index} sm={4} smOffset={2}>
          <Image
            key={image.name}
            src={window.URL.createObjectURL(image)} thumbnail />
        </Col>
      );

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

export default PicturesPane;
