import React from 'react';
import {
  Alert,
  Grid, Row, Col,
  Button, ListGroup, ListGroupItem, Navbar
} from 'react-bootstrap';
import OrderForm from './fragments/OrderForm';
import { Link } from "react-router-dom";

const initialState = 'initial-state';
const successState = 'success-state';
const failedState = 'failed-state';
const warningState = 'warning-state';

class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      control: initialState
    };
  }

  processOrderData = (order, files) => {
    console.log(JSON.stringify(order));
    console.log(files.reduce(
      (result, curr) => result += curr.name + ', '
      , '').slice(0, -2));

    this.setState({ control: warningState, files: files });
  }

  render() {
    let funcBlock = null;
    switch (this.state.control) {
      case successState:
        funcBlock = <SuccessfulOrderSubmission />;
        break;
      case failedState:
        funcBlock = <FailedOrderSubmission
          returnToForm={() => this.setState({ control: initialState })} />;
        break;
      case warningState:
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
          <Col sm={8} smOffset={2}>
            <h2>Sign up order</h2>
            <p>
              Give your contacts for us to make order. Also you can describe
              your order details and upload some pictures of elements which you
              want to repair.
            </p>
          </Col>
        </Row>
        {funcBlock}
      </Grid>
    );
  }
}

const FailedOrderSubmission = (props) => {
  return(
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
        <Link to="/">Go Home</Link>
      </p>
    </Alert>
  );
};

const SuccessfulOrderSubmission = () => {
  return(
    <Alert bsStyle="success">
      <h2>Submittied!</h2>
      <p>Order has been successfully submit. We contact you soon for details.</p>
      <Link to="/">Go Home</Link>
    </Alert>
  );
};

const OrderSubmissionWithWarnings = (props) => {
  let listItems = props.files.map((file) => <ListGroupItem bsStyle="warning">{file.name}</ListGroupItem>);
  return(
    <Alert bsStyle="warning">
      <h2>Order submitted but some problems occurred</h2>
      <p>These files not been sended:</p>
      <ListGroup>{listItems}</ListGroup>
      <Link to="/">Go Home</Link>
    </Alert>
  );
};

export default Order;
