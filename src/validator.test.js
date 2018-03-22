import Validator from './validator';
import assert from 'assert';


test('Should create new Validator', () => {
  const validator = new Validator({});
})

test('Should reject constraint without error-name', () => {
  const constraints = {
    'foo': {
      'error-description': 'foo bar',
      'error-detector': () => {}
    }
  };

  try {
    new Validator(constraints);
    assert.fail('Should trow error');
  } catch(err) {}

})
