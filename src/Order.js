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
      statusStep: 0,
      failedUploadings: []
    };
  }

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

  uploadOrder = async () => {
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.2) {
          console.log('Ordere accepted');
          resolve(Object.assign({}, this.state.orderModel));
        } else {
          console.log('Order rejected');
          reject('Failed');
        }
      }, 1000);
    }).then(response => this.setState({
      processStatus: this.state.processStatus + this.state.statusStep,
      control: this.state.files.length ? FILE_UPLOADING : SUCCCESS,
      orderModel: response
    })).catch(reason => this.setState({ control: FAILURE }));
  };


  checkUplodingState = () => {
    return (this.state.control === ORDER_UPLOADING || this.state.control === FILE_UPLOADING);
  };

  fileUploading = async () => {
    const copiedState = Object.assign({}, this.state);
    const file = copiedState.files.pop();
    if (file) {
      const uploadedFileURL =
        await new Promise((resolve, reject) => setTimeout(() => {
          if (Math.random() > 0.1) {
            console.log(`File ${file.name} resolved.`);
            resolve(`file ${file.name}`);
          } else {
            console.log(`File ${file.name} failed.`);
            reject('Failed');
          }
        }, 500))
        .then(pictureResource => file.name)
        .catch(error => {
          copiedState.failedUploadings.push(file);
          copiedState.processStatus = copiedState.processStatus + copiedState.statusStep;
          this.setState(copiedState);
        });

      if (uploadedFileURL) {
        new Promise((resolve, reject) => setTimeout(() => resolve(uploadedFileURL), 500))
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
            this.setState(copiedState)
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
    .map((file) => <ListGroupItem bsStyle="warning">{file.name}</ListGroupItem>);
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
