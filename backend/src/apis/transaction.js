const accountJson = require('../../mock-data/account.json');

function getTransaction (req, res) {
  res.send(accountJson.transactions.find(tran => tran.id == req.params.id));
}

module.exports = { getTransaction };
