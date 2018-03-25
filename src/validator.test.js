import Validator from './validator';
import assert from 'assert';


test('Should prevent creation Validator without constraints', () => {
  assert.throws(() => {
    new Validator({});
  }, Error, 'Should throw error');
})

test('Should reject constraint without [error-name]', () => {
  const constraints = {
    'foo': {
      'error-description': 'foo bar',
      'error-detector': () => {}
    }
  };

  assert.throws(() => {
    new Validator(constraints);
  }, TypeError, 'Should throw error');

})

test('Should reject constraint with invalid type of [error-name]', () => {
  const constraints = {
    'foo': {
      'error-name': null,
      'error-description': 'foo bar',
      'error-detector': () => {}
    }
  };

  assert.throws(() => {
    new Validator(constraints);
  }, TypeError, 'Should throw error');

})

test('Should reject constraint with empty string as [error-name]', () => {
  const constraints = {
    'foo': {
      'error-name': '',
      'error-description': 'foo bar',
      'error-detector': () => {}
    }
  };

  assert.throws(() => {
    new Validator(constraints);
  }, TypeError, 'Should throw error');

})

test('Should reject constraint without [error-description]', () => {
  const constraints = {
    'foo': {
      'error-name': 'bar',
      'error-detector': () => {}
    }
  };

  assert.throws(() => {
    new Validator(constraints);
  }, TypeError, 'Should throw error');

})

test('Should reject constraint with invalid type of [error-description]', () => {
  const constraints = {
    'foo': {
      'error-name': 'bar',
      'error-description': 5,
      'error-detector': () => {}
    }
  };

  assert.throws(() => {
    new Validator(constraints);
  }, TypeError, 'Should throw error');
})

test('Should reject constraint without [error-detector] attribute', () => {
  const constraints = {
    'foo': {
      'error-name': 'bar',
      'error-description': 'baz qux'
    }
  };

  assert.throws(() => {
    new Validator(constraints);
  }, TypeError, 'Should throw error');

})

test('Should reject constraint with invalid type of [error-detector]', () => {
  const constraints = {
    'foo': {
      'error-name': 'bar',
      'error-description': 'baz qux',
      'error-detector': 'quux'
    }
  };

  assert.throws(() => {
    new Validator(constraints);
  }, TypeError, 'Should throw error');

})

test('Should create validator successfully', () => {
  const constraints = {
    'foo': {
      'error-name': 'bar',
      'error-description': 'baz qux',
      'error-detector': () => {}
    }
  };

  new Validator(constraints);
})

test('Should accept valid object', () => {
  const constraints = {
    'foo': {
      'error-name': 'bar',
      'error-description': 'baz qux',
      'error-detector': (target) => {
        return typeof(target) === 'string';
      }
    },
    'quux': {
      'error-name': 'corge',
      'error-description': 'grault waldo',
      'error-detector': (target) => {
        return target === 5;
      }
    }
  };

  const validator = new Validator(constraints);
  const target = {
    'foo': 'fred',
    'quux': 5
  }

  const errors = validator.validate(target);
  assert.equal(Object.keys(errors).length, 2, 'Must be zero errors');
})

test('Should detect constraint violation', () => {
  const constraints = {
    'foo': {
      'error-name': 'bar',
      'error-description': 'baz qux',
      'error-detector': (target) => {
        return typeof(target) === 'string';
      }
    },
    'quux': {
      'error-name': 'corge',
      'error-description': 'grault waldo',
      'error-detector': (target) => {
        return target === 5;
      }
    }
  };

  const target = {
    'foo': 0,
    'quux': 5
  };

  const validator = new Validator(constraints);
  const errors = validator.validate(target);
  assert.equal(errors['bar'], 'baz qux', 'Must have violated field [bar]');

})

test('Shuold detect multiple violations', () => {
  const validator = new Validator({
    'foo': {
      'error-name': 'bar',
      'error-description': 'baz qux',
      'error-detector': (target) => {
        return typeof(target) === 'string';
      }
    },
    'quux': {
      'error-name': 'corge',
      'error-description': 'grault waldo',
      'error-detector': (target) => {
        return target === 5;
      }
    }
  });

  const target = {
    'foo': null,
    'quux': 3
  };

  const errors = validator.validate(target);
  assert.equal(errors['bar'], 'baz qux');
  assert.equal(errors['corge'], 'grault waldo');

})

test('Should detect lack of property', () => {
  const validator = new Validator({
    'foo': {
      'error-name': 'bar',
      'error-description': 'baz qux',
      'error-detector': (target) => {
        return target === 'foo';
      }
    },
    'quux': {
      'error-name': 'corge',
      'error-description': 'grault waldo',
      'error-detector': (target) => {
        return target === 5;
      }
    }
  });

  const target = {
    'quux': 5
  };

  const errors = validator.validate(target);
  assert.equal(errors['bar'], 'baz qux');
})

test('Should find an error', () => {
  const validator = new Validator({
    'foo': {
      'error-name': 'bar',
      'error-description': 'baz qux',
      'error-detector': (target) => {
        return target === 'foo';
      }
    },
    'quux': {
      'error-name': 'corge',
      'error-description': 'grault waldo',
      'error-detector': (target) => {
        return target === 5;
      }
    }
  });

  const target = {
    'quux': 5
  };

  assert.equal(validator.validate(target).findError('bar'), 'baz qux');
})

test('Should not find error', () => {
  const validator = new Validator({
    'foo': {
      'error-name': 'bar',
      'error-description': 'baz qux',
      'error-detector': (target) => {
        return target === 'foo';
      }
    },
    'quux': {
      'error-name': 'corge',
      'error-description': 'grault waldo',
      'error-detector': (target) => {
        return target === 5;
      }
    }
  });

  const target = {
    'quux': 5,
    'foo': 'foo'
  };

  assert.equal(validator.validate(target).findError('bar'), null);
})

test('Should report about error', () => {
  const validator = new Validator({
    'foo': {
      'error-name': 'bar',
      'error-description': 'baz qux',
      'error-detector': (target) => {
        return target === 'foo';
      }
    },
    'quux': {
      'error-name': 'corge',
      'error-description': 'grault waldo',
      'error-detector': (target) => {
        return target === 5;
      }
    }
  });

  const target = {
    'quux': 5,
    'foo': 'fred'
  };

  assert(validator.validate(target).hasErrors());
})

test('Should detect no errors', () => {
  const validator = new Validator({
    'foo': {
      'error-name': 'bar',
      'error-description': 'baz qux',
      'error-detector': (target) => {
        return target === 'foo';
      }
    },
    'quux': {
      'error-name': 'corge',
      'error-description': 'grault waldo',
      'error-detector': (target) => {
        return target === 5;
      }
    }
  });

  const target = {
    'quux': 5,
    'foo': 'foo'
  };

  assert(!validator.validate(target).hasErrors());
})
