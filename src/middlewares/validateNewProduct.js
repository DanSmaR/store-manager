const { resultMsg } = require('../utils/errorResults');

module.exports = (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: resultMsg.nameRequired });
  return next();
};
