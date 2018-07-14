import React from 'react';
import { Grid, Row, Col, Carousel, Image, Button } from 'react-bootstrap';
import moment from 'moment';

export default class OrderRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: props.rowInfo.original,
      pictures: []
    };
  }

  assignTemporalAttribute = (attr) => {
    console.log('assignTemporalAttribute:', attr);
    updateOrderAttribute(this.state.order, attr, moment().toISOString())
      .then(order => this.setState({ order: order }));
  };

  componentDidMount() {
    fetchPictures(this.state.order)
      .then(pictures => this.setState({ pictures: pictures }));
  }

  render() {
    const {
      clientName, clientPhone, clientEmail,
      description, acceptedAt, completedAt
    } = this.state.order;

    return(
      <Grid>
        <Row>
          <Col sm={6}>
            <strong>Client name</strong>
            <p>{clientName}</p>
          </Col>
          <Col sm={6}>
            <AcceptedComponent acceptedAt={acceptedAt} completedAt={completedAt}
              updateHandler={() => this.assignTemporalAttribute('acceptedAt')} />
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <strong>Client phone</strong>
            <p>{clientPhone}</p>
          </Col>
          <Col sm={6}>
            {
              completedAt ? (<TemporalDescriptor prefix='Completed' ts={completedAt} />)
                : (<AttributeButton text='Complete'
                  updateHandler={() => this.assignTemporalAttribute('completedAt')} />)
            }
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <strong>Client email</strong>
            <p>{clientEmail}</p>
          </Col>
          <Col sm={6}>
            <StatusDescriptor acceptedAt={acceptedAt} completedAt={completedAt} />
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <h4>Order description</h4>
            <p>{description}</p>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <PictureCarousel pictures={this.state.pictures} />
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
    return(<AttributeButton text='Accept' updateHandler={props.updateHandler} />);
  } else {
    return(<span className="text-muted">Not accepted</span>);
  }
};

const AttributeButton = (props) => {
  return(
    <Button onClick={props.updateHandler}>{props.text}</Button>
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
                <Carousel.Item key={picture['_links'].self.href}>
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
  if (props.acceptedAt) {
    return props.completedAt ? (<strong className="text-muted">Completed</strong>)
      : (<strong className="text-success">In progress</strong>);
  } else {
    return props.completedAt ? (<strong className="text-warning">Closed</strong>)
      : (<strong className="text-primary">New</strong>);
  }
};

const fetchPictures = (order) => {
  return fetch(order['_links'].pictures.href)
    .then(resp => resp.ok ? resp.json() : Promise.reject(resp.status))
    .then(page => page['_embedded'].pictures)
    .catch(err => { console.error('Fetching pictures failed with ', err); return []; });
};

const updateOrderAttribute = (order, attributeName, attributeValue) => {

  const patch = {};
  patch[attributeName] = attributeValue;

  return fetch(order['_links'].self.href, {
    method: 'PATCH',
    body: JSON.stringify(patch),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(resp => resp.ok ? resp.json() : Promise.reject(resp.status))
  .catch(err => { console.error('Order update failed: ', err); return order; });

};
