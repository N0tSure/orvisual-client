const validationParams = [
  {'name': 'error-name', 'type': 'string'},
  {'name': 'error-description', 'type': 'string'},
  {'name': 'error-detector', 'type': 'function'}
];

class Validator {
  constructor(props) {
    this.fields = Object.keys(props);
    this.validations = {};
    this.fields.forEach((field) => {
      let constraint = props[field];
      validationParams.forEach((param) => {
        if (typeof(constraint[param['name']]) !== param['type']) {
          throw new TypeError(
            'property ' + param['name'] + ' must be ' + param['type']
          );
        }
      });
      this.validations[field] = props[field];
    });
  }

  checkConstraintProperties(constraint) {
    validationParams.forEach((param) => {
      if (typeof(constraint[param['name']]) !== param['type']) {
        throw new TypeError(
          'property ' + param['name'] + ' must be ' + param['type']
        );
      }
    });
  }

}

export default Validator;
