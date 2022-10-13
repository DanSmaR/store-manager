const { resultTypes } = require('./errorResults');

function errorDatabase(error) {
  console.error({ error: error.message });
  return { type: resultTypes.databaseError, message: error.message };
}

const asyncWrapper = (fn) => async (...args) => {
  try {
    const { type, message } = await fn(...args);
    return { type, message };
  } catch (err) {
    return errorDatabase(err);
  }
};

module.exports = asyncWrapper;
