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

const READY = 'initial';
const SUCCCESS = 'success';
const FAILURE = 'failed';
const WARNING = 'warning';
const ORDER_UPLOADING = 'uploading';
const FILE_UPLOADING = 'file-uploading';

/*
 * This component render form for order publishing, process form
 * data and upload user's pictures.
 */
class Order extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      control: READY,
      orderModel: null,
      files: [],
      processStatus: 0,
      statusStep: 0,
      failedUploadings: []
    };
  }

  /**
   * Check current state, for Order publishing process.
   * @return true if component in one of 'publishing' state
   */
  checkUplodingState = () => {
    return (this.state.control === ORDER_UPLOADING || this.state.control === FILE_UPLOADING);
  };

  /**
   * This function upload one user's file (if present), wait for
   * uploading and if it uploaded successfully associate picture
   * resource with early uploaded order. If state haven't any files
   * set 'WARNING' or 'SUCCCESS' status. In case of failure added
   * failed file to state.
   */
  fileUploading = async () => {
    const copiedState = Object.assign({}, this.state);
    if (copiedState.files.length) {

      const file = copiedState.files.pop();
      const form = new FormData();
      form.append('image', file);

      const uploadedPictureURL =
        await fetch(`${window.origin}/api/files`, {
          method: 'POST',
          body: form
        }).then(response => response.ok ? response.json() : Promise.reject(response.status))
        .then(picture => picture['_links']['self'])
        .catch(error => {
          copiedState.failedUploadings.push(file);
          copiedState.processStatus = copiedState.processStatus + copiedState.statusStep;
          this.setState(copiedState);
        });

      if (uploadedPictureURL) {
        fetch(copiedState.orderModel['_links'].pictures.href, {
          method: 'POST',
          body: uploadedPictureURL.href,
          headers: { 'Content-Type': 'text/uri-list' }
        }).then(response => response.ok ? response : Promise.reject(response.status))
        .then(response => {
          if (copiedState.files.length) {
            return FILE_UPLOADING;
          } else if (copiedState.failedUploadings.length) {
            return WARNING;
          } else {
            return SUCCCESS;
          }
        }).then(status => {
          copiedState.processStatus = copiedState.processStatus + copiedState.statusStep;
          copiedState.control = status;
          this.setState(copiedState);
        }).catch(error => {
          copiedState.failedUploadings.push(file);
          copiedState.processStatus = copiedState.processStatus + copiedState.statusStep;
          this.setState(copiedState);
        });
      }

    } else {
      copiedState.failedUploadings.length ?
        copiedState.control = WARNING : copiedState.control = SUCCCESS;

      this.setState(copiedState);
    }
  };

  /**
   * Switch component state to order posting state, set process
   * status step, drop previous state.
   * @param order: order model
   * @param files: picture file's list
   */
  processOrderData = (order, files) => {
    let copiedState = Object.assign({} , this.state);
    copiedState.statusStep = Math.ceil(100 / (files.length + 1));
    copiedState.processStatus = 0;
    copiedState.orderModel = order;
    copiedState.files = files;
    copiedState.failedUploadings = [];
    copiedState.control = ORDER_UPLOADING;
    this.setState(copiedState);
  };

  /**
   * Return central area content, regarding current component
   * state.
   * @return React JSX {@link React.Component}
   */
  renderCentralLayout = () => {
    switch (this.state.control) {
      case SUCCCESS:
        return (<SuccessfulOrderSubmission />);
      case FAILURE:
        return (<FailedOrderSubmission
          returnToForm={() => this.setState({ control: READY })} />);
      case WARNING:
        return (<OrderSubmissionWithWarnings files={this.state.failedUploadings} />);
      default:
        return (<OrderForm sendFormData={this.processOrderData} />);
    }
  };

  /**
   * Upload order model to server, if {@link Promise} resolve, set
   * order resource, returned from server to state. In other case
   * set component state failed.
   */
  uploadOrder = async () => {
    fetch(`${window.origin}/api/orders`, {
      method: 'POST',
      body: JSON.stringify(this.state.orderModel),
      headers: { 'Content-Type' : 'application/json' }
    }).then(response => response.ok ? response.json() : Promise.reject(response.status))
      .then(order => this.setState({
        processStatus: this.state.processStatus + this.state.statusStep,
        control: this.state.files.length ? FILE_UPLOADING : SUCCCESS,
        orderModel: order
      }))
      .catch(reason => this.setState({ control: FAILURE }));
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.control === ORDER_UPLOADING) {
      this.uploadOrder();
    } else if (this.state.control === FILE_UPLOADING) {
      this.fileUploading();
    }
  }

  render() {

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
          <Modal show={this.checkUplodingState()}>
            <Modal.Header>
              <Modal.Title>Publishing order details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ProgressBar active now={this.state.processStatus}/>
            </Modal.Body>
          </Modal>
        </Row>
        {this.renderCentralLayout()}
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
  let listItems = props.files
    .map((file) => (<ListGroupItem key={file.name} bsStyle="warning">{file.name}</ListGroupItem>));
  return(
    <Row>
      <Col sm={8} smOffset={2}>
        <Alert bsStyle="warning">
          <h2>Order submitted but some problems occurred</h2>
          <p>
            These files not been sended:
          </p>
          <div>
            <ListGroup className="upload-filed-list">{listItems}</ListGroup>
          </div>
          <p>
            <Link className="btn btn-default" to="/">Go Home</Link>
          </p>
        </Alert>
      </Col>
    </Row>
  );
};

export default Order;
