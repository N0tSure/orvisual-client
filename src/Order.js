import React from 'react';
import {
  Alert,
  Grid, Row, Col, Glyphicon,
  Form, HelpBlock,
  FormGroup, ControlLabel, FormControl, InputGroup,
  Button, ButtonToolbar
} from 'react-bootstrap';
import OrderForm from './fragments/OrderForm';
import { Link } from "react-router-dom";

const initialState = 'initial-state';
const successState = 'success-state';
const failedState = 'failed-state';

class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      control: props.match.params.control
    };
  }

  processOrderData = (order, files) => {
    console.log(JSON.stringify(order));
    console.log(files.reduce(
      (result, curr) => result += curr.name + ', '
      , '').slice(0, -2));
  }

  render() {
    let funcBlock = null;
    switch (this.state.control) {
      case 'success':
        funcBlock = <SuccessfulOrderSubmission />;
        break;
      case 'failed':
        funcBlock = <FailedOrderSubmission url={this.props.match.url}/>
        break;
      default:
        funcBlock = <OrderForm sendFormData={this.processOrderData} />;
    }
    return(
      <Grid fluid>
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
        <Link to={`${props.url}/order`}>Try again</Link>
        <span> or </span>
        <Link to="/">Go Back</Link>
      </p>
    </Alert>
  );
};

const SuccessfulOrderSubmission = () => {
  return(
    <Alert bsStyle="success">
      <h2>Submittied!</h2>
      <p>Order has been successfully submit. We contact you soon for details.</p>
    </Alert>
  );
};

export default Order;
