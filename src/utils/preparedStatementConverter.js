const snakeize = require('snakeize');

function convertToInsertPreparedStatements(dataObj) {
  const columns = Object.keys(snakeize(dataObj))
    .join(', ');
  const placeholders = Object.keys(dataObj)
    .map((_key) => '?')
    .join(', ');
  return [columns, placeholders];
}

function convertToUpdatePreparedStatements(dataObj) {
  const columns = Object.keys(snakeize(dataObj))
    .map((key) => `${key} = ?`)
    .join(', ');
  return columns;
}

module.exports = {
  convertToInsertPreparedStatements,
  convertToUpdatePreparedStatements,
};
