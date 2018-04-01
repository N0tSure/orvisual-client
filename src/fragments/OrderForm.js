import React from 'react';
import {
  Row, Col,
  Glyphicon,
  Form, HelpBlock, FormGroup, ControlLabel, FormControl, InputGroup,
  Button, ButtonToolbar
} from 'react-bootstrap';
import Validator from '../validator';
import PicturesPane from './PicturesPane';

class OrderForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      order: {
        client: '',
        phone: '',
        email: ''
      },
      files: [],
      errors: Validator.defaultErrorState()
    };

    this.validator = new Validator({
      'client': {
        'error-name': 'client-name',
        'error-description': 'Name must 2 character minimum',
        'error-detector': (name) => name.match(/\w{2,}/)
      },
      'phone': {
        'error-name': 'client-phone',
        'error-description': 'Invalid phone number',
        'error-detector': (name) => name.match(/\+?\d{4,}/)
      },
      'email': {
        'error-name': 'client-email',
        'error-description': 'Invalid email address',
        'error-detector': (name) => name.match(/(\w+@\w{1,})(.*)?/)
      }
    });

  }

  handleInputChange = (event, prop) => {
    let order = this.state.order;
    order[prop] = event.target.value;
    let errors = this.validator.validate(order);
    this.setState({order: order, errors: errors});
  }

  handleFileInput = (e) => {
    let files = [];
    files.push.apply(files, e.target.files);
    this.setState({files: files});
  }

  handleOrderSubmission = () => {
    this.props.sendFormData(this.state.order, this.state.files);
  }

  render() {
    return(
      <React.Fragment>
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
        <Row>
          <Col sm={8} smOffset={2}>
            <Form>
              <FormGroup controlId="name"
                validationState={this.state.errors.findError('client-name') ? 'warning' : 'success'}>
                  <ControlLabel>Name</ControlLabel>
                  <FormControl
                   type="text"
                   value={this.state.order.client}
                   onChange={(e) => { this.handleInputChange(e, 'client')}}
                   placeholder="Enter your name" />
                  <FormControl.Feedback />
                  <HelpBlock>{this.state.errors.findError('client-name')}</HelpBlock>
              </FormGroup>
              <FormGroup controlId="phone"
                validationState={this.state.errors.findError('client-phone') ? 'warning' : 'success'}>
                <ControlLabel>Phone number</ControlLabel>
                <InputGroup>
                  <InputGroup.Addon>
                    <Glyphicon glyph="phone" />
                  </InputGroup.Addon>
                  <FormControl
                    type="text"
                    value={this.state.order.phone}
                    onChange={(e) => { this.handleInputChange(e, 'phone')}}
                    placeholder="Enter your phone number" />
                </InputGroup>
                <FormControl.Feedback />
                <HelpBlock>{this.state.errors.findError('client-phone')}</HelpBlock>
              </FormGroup>
              <FormGroup controlId="email"
                validationState={this.state.errors.findError('client-email') ? 'warning' : 'success'}>
                <ControlLabel>Email address</ControlLabel>
                <InputGroup>
                  <InputGroup.Addon>
                    <Glyphicon glyph="envelope" />
                  </InputGroup.Addon>
                  <FormControl
                    type="text"
                    value={this.state.order.email}
                    onChange={(e) => { this.handleInputChange(e, 'email')}}
                    placeholder="Enter your email address" />
                </InputGroup>
                <FormControl.Feedback />
                <HelpBlock>{this.state.errors.findError('client-email')}</HelpBlock>
              </FormGroup>
              <FormGroup controlId="description">
                <ControlLabel>Order description</ControlLabel>
                <FormControl
                  placeholder="Enter additional order details"
                  value={this.state.order.description}
                  onChange={(e) => { this.handleInputChange(e, 'description')}}
                  componentClass="textarea" />
              </FormGroup>
              <FormGroup controlId="pictures" bsClass="hidden">
                <FormControl type="file" multiple onChange={this.handleFileInput} />
              </FormGroup>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col sm={8} smOffset={2} smPush={6}>
            <ButtonToolbar>
              <Button componentClass="label" htmlFor="pictures">Add picture</Button>
              <Button disabled={this.state.errors.hasErrors()} onClick={this.handleOrderSubmission}>
                Submit
              </Button>
            </ButtonToolbar>
          </Col>
        </Row>
        <PicturesPane images={this.state.files} />
      </React.Fragment>
    )
  }
}

export default OrderForm;
