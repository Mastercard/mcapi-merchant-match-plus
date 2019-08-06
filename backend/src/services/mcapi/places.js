const ApiHelper = require('./mcapi.helper');
const Api = ApiHelper.Places;

// core functions
function getMerchantByLocationId (locationId) {
  const requestData = { locationId };

  return ApiHelper.doQuery(Api.PlaceByLocationId, requestData);
}

function getPrimaryChannelOfDistributionDesciption(primaryChannelOfDistribution) {
  // O = Online / Ecommerce, B = Brick & Mortar, N = Non-Store Retail.
  switch (primaryChannelOfDistribution) {
    case 'O': return 'Online / Ecommerce';
    case 'B': return 'Brick & Mortar';
    case 'N': return 'Non-Store Retail';
  }
}

module.exports = { getMerchantByLocationId, getPrimaryChannelOfDistributionDesciption };
