import React from 'react';
import { Grid, Row, Col, Carousel, Image, Button } from 'react-bootstrap';
import moment from 'moment';

/**
 * This component provides such features like update order
 * attributes, view order details and related pictures.
 * Component is Table's sub component and works with particular
 * row.
 */
export default class OrderRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: props.rowInfo.original,
      pictures: []
    };
  }

  /**
   * Assign timestamp string to particular Order and update data on
   * server side.
   * @param attr: attribute's name
   */
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

/**
 * This component creates an element related to accept
 * attribute of Order. If Order already accepted will returns
 * TemporalDescriptor of an attribute. In other cases, if
 * attribute's value not assigned, in case if Order not
 * completed yet, AttributeButton will return which can assign
 * value to attribute. If order completed, it's immutable
 * record and will return static message.
 *
 * @param props.acceptedAt: Order acception timestamp
 * @param props.completedAt: Order completion timestamp
 * @param props.updateHandler: function for handling model update
 * @return JSX component
 */
const AcceptedComponent = (props) => {
  if (props.acceptedAt) {
    return(<TemporalDescriptor prefix='Accepted' ts={props.acceptedAt} />);
  } else if (!props.completedAt) {
    return(<AttributeButton text='Accept' updateHandler={props.updateHandler} />);
  } else {
    return(<span className="text-muted">Not accepted</span>);
  }
};

/**
 * Render button which can update Order model on server.
 *
 * @param props.updateHandler: function for handling model update
 * @param props.test: button text
 * @return JSX component
 */
const AttributeButton = (props) => {
  return(
    <Button onClick={props.updateHandler}>{props.text}</Button>
  );
};

/**
 * Render carousel with pictures if just one present, in
 * another case return static span.
 *
 * @param props.pictures: list of pictures
 * @return JSX component
 */
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

/**
 * Render span which show date and time.
 *
 * @param props.prefix: text prefix
 * @param props.ts: moment.js object
 * @return JSX component
 */
const TemporalDescriptor = (props) => {
  return (
    <span>{`${props.prefix} on ${moment(props.ts).format('LLL')}`}</span>
  );
};

/**
 * Using Order's attributes renders it's status.
 *
 * @param props.acceptedAt: Order acception timestamp
 * @param props.completedAt: Order completion timestamp
 * @return JSX component
 */
const StatusDescriptor = (props) => {
  if (props.acceptedAt) {
    return props.completedAt ? (<strong className="text-muted">Completed</strong>)
      : (<strong className="text-success">In progress</strong>);
  } else {
    return props.completedAt ? (<strong className="text-warning">Closed</strong>)
      : (<strong className="text-primary">New</strong>);
  }
};

/**
 * Fetches picture from server, using order's self link.
 *
 * @param order: Order model
 * @return Promise, which will returns list of pictures
 */
const fetchPictures = (order) => {
  return fetch(order['_links'].pictures.href)
    .then(resp => resp.ok ? resp.json() : Promise.reject(resp.status))
    .then(page => page['_embedded'].pictures)
    .catch(err => { console.error('Fetching pictures failed with ', err); return []; });
};

/**
 * Update one attribute of given Order.
 *
 * @param order: Order model
 * @param attributeName: attribute's name
 * @param attributeValue: attribute's value
 * @return Promise, which will returns updated Order
 */
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
