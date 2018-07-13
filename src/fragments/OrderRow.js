import React from 'react';
import { Grid, Row, Col, Carousel, Image, Button } from 'react-bootstrap';
import moment from 'moment';

export default class OrderRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetched: false,
      pictures: []
    };
  }

  render() {
    const order = this.props.rowInfo.original;
    return(
      <Grid>
        <Row>
          <Col sm={6}>
            <strong>Client name</strong>
            <p>{order.clientName}</p>
          </Col>
          <Col sm={6}>
            <AcceptedComponent acceptedAt={order.acceptedAt} completedAt={order.completedAt} />
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <strong>Client phone</strong>
            <p>{order.clientPhone}</p>
          </Col>
          <Col sm={6}>
            {
              order.completedAt ? (<TemporalDescriptor prefix='Completed' ts={order.completedAt} />)
                : (<AttributeButton text='Complete' />)
            }
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <strong>Client email</strong>
            <p>{order.clientEmail}</p>
          </Col>
          <Col sm={6}>
            <StatusDescriptor status={order} />
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <h4>Order description</h4>
            <p>{order.description}</p>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <PictureCarousel pictures={[]} />
          </Col>
        </Row>
      </Grid>
    );
  }
}

const AcceptedComponent = (props) => {
  if (props.acceptedAt) {
    return(<TemporalDescriptor prefix='Accepted' ts={props.acceptedAt} />);
  } else if (!props.completedAt) {
    return(<AttributeButton text='Accept' />);
  } else {
    return(<span className="text-muted">Not accepted</span>);
  }
};

const AttributeButton = (props) => {
  return(
    <Button>{props.text}</Button>
  );
};

const PictureCarousel = (props) => {
  if (props.pictures.length) {
    return(
      <Carousel interval={null}>
        {
          props.pictures.map(
            picture => {
              return(
                <Carousel.Item>
                  <Image
                    className="center-block"
                    src={picture['_links'].imageFile.href}
                    responsive />
                </Carousel.Item>
              );
            })
        }
      </Carousel>
    );
  } else {
    return(<h4 className="text-center text-muted">No photos</h4>);
  }
};

const TemporalDescriptor = (props) => {
  return (
    <span>{`${props.prefix} on ${moment(props.ts).format('LLL')}`}</span>
  );
};

const StatusDescriptor = (props) => {
  if (props.status.acceptedAt) {
    return props.status.completedAt ? (<strong className="text-muted">Completed</strong>)
      : (<strong className="text-success">In progress</strong>);
  } else {
    return props.status.completedAt ? (<strong className="text-warning">Closed</strong>)
      : (<strong className="text-primary">New</strong>);
  }
};

const fetchPictures = (order) => {
  return fetch(order['_links'].pictures.href)
    .then(resp => resp.ok ? resp.json() : Promise.reject(resp.status))
    .then(page => page['_embedded'].pictures)
    .catch(err => { console.error('Fetching pictures failed with ', err); return []; });
}
