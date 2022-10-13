const { resultTypes, resultMsg } = require("../../../src/utils/errorResults");

const databaseError = {
  type: resultTypes.databaseError, message: resultMsg.databaseError,
};

const getResponse = (type, message) => ({ type, message });

module.exports = {
  databaseError,
  getResponse,
};
