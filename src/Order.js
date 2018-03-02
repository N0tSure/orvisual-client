import React from 'react';
import {
  Grid, Row, Col, Glyphicon,
  Form, HelpBlock,
  FormGroup, ControlLabel, FormControl, InputGroup,
  Button
} from 'react-bootstrap';

const defaultErrorState = {
  'client-name': 'Name must 2 character minimum',
  'client-phone': 'Invalid phone number'
};

class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: defaultErrorState,
      order: {
        client: '',
        phone: ''
      },
      files: []
    };
  }

  handleOrderSubmission = () => {
    console.log('click');
  }


  handleNameInputChange = (e) => {
    let order = this.state.order;
    order['client'] = e.target.value;
    let errors = this.validateCurrentState(order);
    this.setState({order: order, errors: errors});
  }

  handlePhoneInputChange = (e) => {
    let order = this.state.order;
    order['phone'] = e.target.value;
    let errors = this.validateCurrentState(order);
    this.setState({order: order, errors: errors});
  }

  isValidPropertyByPattern(propName, pattern, target) {
    return target.hasOwnProperty(propName) && target[propName].match(pattern);
  }

  validateCurrentState(order) {
    let errors = {};

    if (!this.isValidPropertyByPattern('client', /\w{2,}/, order)) {
      errors['client-name'] = defaultErrorState['client-name'];
    }

    if(!this.isValidPropertyByPattern('phone', /\+?\d{4,}/, order)) {
      errors['client-phone'] = defaultErrorState['client-phone'];
    }

    return errors;
  }

  findErrors = (property) => {
    let errors = this.state.errors;
    if (errors.hasOwnProperty(property)) {
      return errors[property];
    }

    return null;
  }

  hasErrors = () => {
    return Object.keys(this.state.errors).length > 0;
  }

  render() {
    return(
      <Grid fluid>
        <Row>
          <Col sm={8} smOffset={2}>
            <Form>
              <FormGroup controlId="name"
                validationState={this.findErrors('client-name') ? 'warning' : 'success'}>
                  <ControlLabel>Name</ControlLabel>
                  <FormControl
                   type="text"
                   value={this.state.order.client}
                   onChange={this.handleNameInputChange}
                   placeholder="Enter your name" />
                  <FormControl.Feedback />
                  <HelpBlock>{this.findErrors('client-name')}</HelpBlock>
              </FormGroup>
              <FormGroup controlId="phone"
                validationState={this.findErrors('client-phone') ? 'warning' : 'success'}>
                <ControlLabel>Phone number</ControlLabel>
                <InputGroup>
                  <InputGroup.Addon>
                    <Glyphicon glyph="phone" />
                  </InputGroup.Addon>
                  <FormControl
                    type="text"
                    value={this.state.order.phone}
                    onChange={this.handlePhoneInputChange}
                    placeholder="Enter your phone number" />
                </InputGroup>
                <FormControl.Feedback />
                <HelpBlock>{this.findErrors('client-phone')}</HelpBlock>
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
          <Col sm={8} smOffset={2} smPush={7}>
            <Button disabled={this.hasErrors()} bsSize="large" onClick={this.handleOrderSubmission}>
              Submit
            </Button>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Order;
