import React from 'react';
import {
  Grid, Row, Col, Glyphicon,
  Form, HelpBlock,
  FormGroup, ControlLabel, FormControl, InputGroup,
  Button, ButtonToolbar
} from 'react-bootstrap';
import OrderForm from './fragments/OrderForm';

class Order extends React.Component {
  constructor(props) {
    super(props);

  }

  processOrderData = (order, files) => {
    console.log(JSON.stringify(order));
    console.log(files.reduce(
      (result, curr) => result += curr.name + ', '
      , '').slice(0, -2));
  }

  render() {
    return(

      <OrderForm sendFormData={(order, files) => {
        console.log(JSON.stringify(order));
        console.log(files.toString());
      }} />

    );
  }
}

export default Order;
