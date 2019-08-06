const _ = require('lodash');
const ApiHelper = require('./mcapi.helper');
const Api = ApiHelper.MerchantIdentifier;

// core functions
function getMerchantIdentifierByMerchantId (merchantId) {
  const type = 'ExactMatch';
  const requestData = { "merchant_id": merchantId, type };

  return ApiHelper.doQuery(Api.MerchantIds, requestData)
    .then(response => {
      if (response && response.returnedMerchants) {
        return _.first(response.returnedMerchants);
      }
    })
}

// export
module.exports = { getMerchantIdentifierByMerchantId };
