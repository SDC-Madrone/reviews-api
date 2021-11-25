

const validators = {
  isValidRequest: function(body) {
    if (!body || !validators.isObjectLiteral(body)) {
      return false;
    }

    var requiredFields = [
      typeof body.product_id === 'number',
      typeof body.rating === 'number',
      typeof body.summary === 'string',
      typeof body.recommend === 'boolean',
      typeof body.name === 'string',
      typeof body.email === 'string',
      Array.isArray(body.photos),
      validators.isObjectLiteral(body.characteristics)
    ];

    return requiredFields.every(Boolean);
  },

  isObjectLiteral: function(obj) {
    return typeof obj === 'object' && obj !== null && !Array.isArray(obj);
  }
};

// in the future, it may help to validate types and collections

module.exports = validators;