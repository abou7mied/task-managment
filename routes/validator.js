const Ajv = require('ajv');
const ajv = new Ajv({coerceTypes: true});

ajv.addKeyword('isNotEmpty', {
  type: 'string',
  errors: true,
  validate: function validate(schema, data) {
    validate.errors = [];
    const isValid = typeof data === 'string' && data.trim() !== '';
    if (!isValid) {
      console.log('hello');
      validate.errors.push({
        keyword: "isNotEmpty",
        message: "should not be empty",
      });
    }
    return isValid;
  },
});

function validator(schema, fromBody) {
  const validate = ajv.compile(schema);
  return async (ctx, next) => {
    const data = fromBody ? ctx.request.body : ctx.request.query;
    const valid = validate(data);
    if (!valid) {
      ctx.status = 400;
      let error = validate.errors[0];
      ctx.body = {
        status: 'error',
        error: `${error.dataPath.replace('.', '')} ${error.message}`,
      };
    } else {
      return next();
    }
  }
}

module.exports = validator;
