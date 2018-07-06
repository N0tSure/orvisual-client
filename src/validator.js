const constraintAttrs = [
  {'name': 'error-name', 'type': 'string', 'nonEmpty': true},
  {'name': 'error-description', 'type': 'string'},
  {'name': 'error-detector', 'type': 'function'}
];

/**
 * This class provides basic functional for form model validations.
 * For creation instance you should take constraints object to constructor,
 * which must contain one constraint minimum. Keys presented as field name and
 * values are constraint for each of them.
 * Constraint should be created for all fields, which must be valid. It's must
 * have these attributes:
 *  1) error-name -- this is name of constraint
 *  2) error-description -- description of constraint violation for client
 *  3) error-detector -- this is function, which detect constraint violation
 *
 * Error detection function must take one parameter, which must interpret as
 * validating filed.
 */
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

  /**
   * Returns default errors object, which contain only functions,
   * which says that target object probably not valid yet.
   *
   * @return {@link Object} with permament error state
   */
  static defaultErrorState() {
    return {
      'hasErrors': () => true,
      'findError': (name) => true
      };
  }

 /**
  * Tackes target object and validate it. Returns errors object,
  * which contains violations and support functions:
  *  1) findError -- takes error name and return desctiption if
  *     error ocured or null
  *  2) hasErrors -- return true if any error occured
  *
  * @param target: target instance, which will be validated
  * @return instance with information about constraint violations
  */
  validate = (target) => {
    const errors = {};
    this.fields.forEach((field) => {
      if (!this.constraints[field]['error-detector'](target[field])) {
        errors[this.constraints[field]['error-name']] =
          this.constraints[field]['error-description'];
      }

    });

    errors.hasErrors = () => this.hasErrors(errors);
    errors.findError = (name) => this.findError(name, errors);
    return errors;
  }

  /**
   * Finds constraint violation description by name in given
   * constraint violation container.
   *
   * @param errorName: name of error
   * @param errors: constraint violation container
   * @return constraint violation description
   */
  findError = (errorName, errors) => {
    return errors[errorName] ? errors[errorName] : null;
  }

  /**
   * Check for constraint violation in given constraint
   * violation container.
   * @param errors: constraint violation container
   * @return {@code true} if present just one violation
   */
  hasErrors = (errors) => {
    return Object.keys(errors)
      .some(attrName => typeof(errors[attrName]) !== 'function');

  }

}

export default Validator;
