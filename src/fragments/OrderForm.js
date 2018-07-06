import React from 'react';
import {
  Row, Col,
  Glyphicon,
  Form, HelpBlock, FormGroup, ControlLabel, FormControl, InputGroup,
  Button, ButtonToolbar
} from 'react-bootstrap';
import Validator from '../validator';
import PicturesPane from './PicturesPane';

/*
 * This component dislay order form control, pictures pane and validate form.
 */
class OrderForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      order: {
        clientName: '',
        clientPhone: '',
        clientEmail: '',
        description: ''
      },
      files: [],
      errors: Validator.defaultErrorState()
    };

    this.validator = new Validator({
      'clientName': {
        'error-name': 'client-name',
        'error-description': 'Name must 2 character minimum',
        'error-detector': (value) => value.match(/\w{2,}/)
      },
      'clientPhone': {
        'error-name': 'client-phone',
        'error-description': 'Invalid phone number',
        'error-detector': (value) => value.match(/\+?\d{4,}/)
      },
      'clientEmail': {
        'error-name': 'client-email',
        'error-description': 'Invalid email address',
        'error-detector': (value) => value.match(/(\w+@\w{1,})(.*)?/)
      }
    });

  }

  /*
   * Handles input change for given property
   * @param event: event object
   * @param prop: property name
   */
  handleInputChange = (event, prop) => {
    let order = this.state.order;
    order[prop] = event.target.value;
    let errors = this.validator.validate(order);
    this.setState({order: order, errors: errors});
  }

  /*
   * Handles file input and validate file size and type.
   * File size hardcoded as 5 Mb and type is all image.
   */
  handleFileInput = (e) => {
    let files = this.state.files;
    let acceptibleFiles = Array.from(e.target.files).filter(
      file => file.size <= 1e+7 && file.type.match(/image\/.*/)
    );
    files.push.apply(files, acceptibleFiles);
    this.setState({files: files});
  }

  handleOrderSubmission = () => {
    this.props.sendFormData(this.state.order, this.state.files);
  }

  /*
   * Removes file from file's array in compment state
   * @param fileIndex: index of file, which will removed
   */
  removeFileItem = (fileIndex) => {
    let files = this.state.files;
    files.splice(fileIndex, 1);
    this.setState({files: files});
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
                   value={this.state.order.clientName}
                   onChange={(e) => { this.handleInputChange(e, 'clientName')}}
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
                    value={this.state.order.clientPhone}
                    onChange={(e) => { this.handleInputChange(e, 'clientPhone')}}
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
                    value={this.state.order.clientEmail}
                    onChange={(e) => { this.handleInputChange(e, 'clientEmail')}}
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
                <FormControl
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={this.handleFileInput} />
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
        <PicturesPane images={this.state.files} removePicture={this.removeFileItem} />
      </React.Fragment>
    )
  }
}

export default OrderForm;
