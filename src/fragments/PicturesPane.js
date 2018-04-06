import React from 'react';
import { Row, Col, Image, Button } from 'react-bootstrap';
import './Picture.css';

/*
 * Renders pane of pictures properly layouted.
 * @props images: list of files
 * @props removePicture: function which take file index as parameter and remove
 *  that file.
 */
const PicturesPane = (props) => {
  let rows = [];
  let layout = [];

  props.images.forEach((image, index) => {
    let rowNum = Math.floor(index / 2);
    if (rows[rowNum] === undefined) {
      rows[rowNum] = [
        <Picture
          key={index}
          columnOffset={2}
          image={image} removePicture={() => props.removePicture(index)} />
      ];
    } else {
      rows[rowNum].push(
        <Picture
          key={index}
          columnOffset={0}
          image={image} removePicture={() => props.removePicture(index)}
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
      <Button bsSize="small" bsStyle="danger" onClick={props.removePicture}>x</Button>
    </Col>
  );
}

export default PicturesPane;
