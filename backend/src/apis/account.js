const accountJson = require('../../mock-data/account.json');

function getAccount (req, res) {
  res.send(accountJson);
}

module.exports = { getAccount };
