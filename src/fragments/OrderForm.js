import React from 'react';
import {
  Grid, Row, Col, Glyphicon,
  Form, HelpBlock,
  FormGroup, ControlLabel, FormControl, InputGroup,
  Button, ButtonToolbar
} from 'react-bootstrap';

const defaultErrorState = {
  'client-name': 'Name must 2 character minimum',
  'client-phone': 'Invalid phone number',
  'client-email': 'Invalid email address'
};

const validationProperties = {
  'restricted-fields': ['client', 'phone', 'email'],
  'validations': {
    'client': {
      'error-name': 'client-name',
      'error-description': 'Name must 2 character minimum',
    }
  }
}

class OrderForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: defaultErrorState
    }
  }

  isValidPropertyByPattern(propName, pattern, target) {
    return target.hasOwnProperty(propName) && target[propName].match(pattern);
  }



  render() {
    return(<div></div>)
  }
}

export default OrderForm;
