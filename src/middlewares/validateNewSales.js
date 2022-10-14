const mapError = require('../utils/errorMap');
const { resultTypes } = require('../utils/errorResults');
const { newSaleSchema } = require('./schemas');

module.exports = (req, res, next) => {
  const { error } = newSaleSchema.validate(req.body);
  if (error) {
    return res.status(mapError(resultTypes.missingFields)).json({ message: error.message });
  }
  return next();
};
