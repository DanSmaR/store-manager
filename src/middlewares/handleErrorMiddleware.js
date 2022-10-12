const errorHandlerMiddleware = async (err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: 'Something went wrong, please try again' });
};

module.exports = errorHandlerMiddleware;
