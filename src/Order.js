import React from 'react';
import {
  Alert,
  Grid, Row, Col,
  Button, ListGroup, ListGroupItem, Navbar, Modal,
  ProgressBar
} from 'react-bootstrap';
import OrderForm from './fragments/OrderForm';
import { Link } from "react-router-dom";
import './Order.css';

const READY = 'initial-state';
const SUCCCESS = 'success-state';
const FAILURE = 'failed-state';
const WARNING = 'warning-state';
const UPLOADING = 'uploading-state'

/*
 * This component render form for order signup, process form data and
 * upload user's pictures.
 */
class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      control: READY,
      orderModel: null,
      files: [],
      processStatus: 0,
      statusStep: 0
    };
  }

  processOrderData = (order, files) => {
    // console.log(JSON.stringify(order));
    // console.log(files.reduce((result, curr) => result += curr.name + ', ' , '').slice(0, -2));
    let copiedState = Object.assign({} , this.state);
    copiedState.statusStep = Math.ceil(100 / (files.length + 1));
    copiedState.processStatus = 0;
    copiedState.orderModel = order;
    copiedState.files = files;
    copiedState.control = UPLOADING;
    this.setState(copiedState);
  };

  uploadOrderDetails = () => {
    if (this.state.control === UPLOADING && this.state.orderModel) {
      this.createPromise(2000, "order uploaded").then(() => this.setState({orderModel: null}));
    }
  };

  uploadNextFile = () => {
    if (this.state.control === UPLOADING && !this.state.orderModel && this.state.files.length > 0) {
      let copiedState = Object.assign({}, this.state);
      this.createPromise(2000, `file `)
    }
  }

  createPromise = (timeout, message) => {
    return new Promise(function(resolve, reject) {
      setTimeout(function () {
        resolve(message);
        console.log(message);
      }, timeout);
    });
  };

  render() {
    this.uploadOrderDetails();
    let funcBlock = null;
    switch (this.state.control) {
      case SUCCCESS:
        funcBlock = <SuccessfulOrderSubmission />;
        break;
      case FAILURE:
        funcBlock = <FailedOrderSubmission
          returnToForm={() => this.setState({ control: READY })} />;
        break;
      case WARNING:
        funcBlock = <OrderSubmissionWithWarnings
          files={this.state['files'] ? this.state['files'] : []} />;
        break;
      default:
        funcBlock = <OrderForm sendFormData={this.processOrderData} />;
    }

    return(
      <Grid fluid>
        <Navbar fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Home</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
        </Navbar>
        <Row>
          <Modal show={this.state.control === UPLOADING}>
            <Modal.Header>
              <Modal.Title>Publishing order details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ProgressBar active now={45}/>
            </Modal.Body>
          </Modal>
        </Row>
        {funcBlock}
      </Grid>
    );
  }
}

/*
 * Informs user about form data submission failed.
 */
const FailedOrderSubmission = (props) => {
  return(
    <Row>
      <Col sm={8} smOffset={2}>
        <Alert bsStyle="danger">
          <h2>Oops! Something going wrong!</h2>
          <p>
            Looks like order submission failed. You can repeat form filling, or go
            back on home page.
          </p>
          <p>
            <Button
              bsStyle="danger"
              onClick={props.returnToForm}>Try again</Button>
            <span> or </span>
            <Link className="btn btn-default" to="/">Go Home</Link>
          </p>
        </Alert>
      </Col>
    </Row>
  );
};

/*
 * Informs user about successful form data was submitted, and all files
 * uploaded.
 */
const SuccessfulOrderSubmission = () => {
  return(
    <Row>
      <Col sm={8} smOffset={2}>
        <Alert bsStyle="success">
          <h2>Submittied!</h2>
          <p>Order has been successfully submit. We contact you soon for details.</p>
          <Link className="btn btn-default" to="/">Go Home</Link>
        </Alert>
      </Col>
    </Row>
  );
};

/*
 * Informs user about form data submitted, but few files uploading failed.
 * When render, list files, which upload has been failed.
 * @prop files: list files which upload failed
 */
const OrderSubmissionWithWarnings = (props) => {
  let listItems = props.files.map((file) => <ListGroupItem bsStyle="warning">{file.name}</ListGroupItem>);
  return(
    <Row>
      <Col sm={8} smOffset={2}>
        <Alert bsStyle="warning">
          <h2>Order submitted but some problems occurred</h2>
          <p>
            These files not been sended:
            <ListGroup className="upload-filed-list">{listItems}</ListGroup>
          </p>
          <p>
            <Link className="btn btn-default" to="/">Go Home</Link>
          </p>
        </Alert>
      </Col>
    </Row>
  );
};

export default Order;
