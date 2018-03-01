import React from 'react';
import {
  Grid, Row, Col, Glyphicon,
  Form,
  FormGroup, ControlLabel, FormControl, InputGroup,
  Button
} from 'react-bootstrap';

class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: false,
      order: {
        client: ''
      },
      files: []
    };
  }

  handleOrderSubmission = () => {
    if (this.state.isValid) {
      let orderData = this.state.order;
      console.log(
        'Client name:', orderData.client,
        'email:', orderData.email,
        'order description:', orderData.description
      );
    }
  }

  validateUsingPattern = (pattern) => {
    const value = this.state.order.client;
    let result = null;
    if (value) {
      if (value.match(pattern)) {
        result = 'success';
      } else {
        result = 'warning';
      }
    }

    return result;
  }

  handleNameInputChange = (e) => {
    this.setState({order: {client: e.target.value}});
    console.log(e.target.value);
  }

  render() {
    return(
      <Grid fluid>
        <Row>
          <Col sm={8} smOffset={2}>
            <Form>
              <FormGroup
                controlId="name"
                validationState={this.validateUsingPattern(/\w{2,}/)}>
                  <ControlLabel>Name</ControlLabel>
                  <FormControl
                   type="text"
                   value={this.state.order.clientName}
                   onChange={this.handleNameInputChange}
                   placeholder="Enter your name" />
                  <FormControl.Feedback />
              </FormGroup>
              <FormGroup controlId="phone">
                <ControlLabel>Phone number</ControlLabel>
                <InputGroup>
                  <InputGroup.Addon>
                    <Glyphicon glyph="phone" />
                  </InputGroup.Addon>
                  <FormControl type="text" placeholder="Enter your phone number" />
                  <FormControl.Feedback />
                </InputGroup>
              </FormGroup>
              <FormGroup controlId="email" validationState="success">
                <ControlLabel>Email address</ControlLabel>
                <InputGroup>
                  <InputGroup.Addon>
                    <Glyphicon glyph="envelope" />
                  </InputGroup.Addon>
                  <FormControl type="text" placeholder="Enter your email address" />
                  <FormControl.Feedback />
                </InputGroup>
              </FormGroup>
              <FormGroup controlId="description">
                <ControlLabel>Order description</ControlLabel>
                <FormControl componentClass="textarea" />
              </FormGroup>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col sm={8} smOffset={2} mdPush={7}>
            <Button bsSize="large" onClick={this.handleOrderSubmission}>
              Submit
            </Button>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Order;
