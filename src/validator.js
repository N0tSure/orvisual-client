const constraintAttrs = [
  {'name': 'error-name', 'type': 'string', 'nonEmpty': true},
  {'name': 'error-description', 'type': 'string'},
  {'name': 'error-detector', 'type': 'function'}
];

class Validator {
  constructor(props) {
    this.fields = Object.keys(props);

    if (!this.fields.length) {
      throw new Error('Zero constraints was given');
    }

    this.constraints = {};
    this.fields.forEach((field) => {

      let constraint = props[field];

      constraintAttrs.forEach((param) => {
        if (typeof(constraint[param['name']]) !== param['type']) {
          throw new TypeError(
            'property ' + param['name'] + ' must be ' + param['type']
          );
        } else if (param['nonEmpty'] && !constraint[param['name']]) {
          throw new TypeError(
            'property ' + param['name'] + ' must be not empty string');
        }
      });

      this.constraints[field] = props[field];
    });
  }

  validate = (target) => {
    const errors = {};
    this.fields.forEach((field) => {
      if (!this.constraints[field]['error-detector'](target[field])) {
        errors[this.constraints[field]['error-name']] =
          this.constraints[field]['error-description'];
      }

    });

    errors.hasErrors = () => {
      return this.hasErrors(errors);
    };

    errors.findError = (name) => {
      return this.findError(name, errors);
    }

    return errors;
  }


  findError = (errorName, errors) => {
    return errors[errorName] ? errors[errorName] : null;
  }

  hasErrors = (errors) => {
    return Object.keys(errors)
      .some(attrName => typeof(errors[attrName]) != 'function');

  }

}

export default Validator;
