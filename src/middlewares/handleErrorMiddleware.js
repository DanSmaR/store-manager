const { CustomAPIError } = require('../errors/customError');

const errorHandlerMiddleware = async (err, _req, res, _next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  res.status(500).json({ message: 'Something went wrong, please try again' });
};

module.exports = errorHandlerMiddleware;
