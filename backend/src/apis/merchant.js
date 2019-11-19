const NodeCache = require( "node-cache" );
const { getMerchantIdentifierByMerchantId } = require('../services/mcapi/merchantIdentifier');
const { getMerchantByLocationId, getPrimaryChannelOfDistributionDesciption } = require('../services/mcapi/places');

const cache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

function midAddressToString(midAddress) {
  if (!midAddress) return '';
  return `${midAddress.line1} ${midAddress.line2} ${midAddress.city} ${midAddress.postalCode} ${midAddress.country.name}`;
}

function placeAddressToString(address){
  return `${address.cleansedStreetAddr} ${address.cleansedCityName} ${address.cleansedPostalCode} ${address.cleansedCountryCode}`;
}

const getMerchant = (req, res) => {
  const merchantRef = req.params.merchantRef;

  var merchant = cache.get(merchantRef);
  if (merchant){
    res.send(merchant);
    return;
  }

  // get merchant identifier:
  getMerchantIdentifierByMerchantId(merchantRef)
    .then(mid => {
      merchant = {
        ref: merchantRef,
        name: mid.merchantDbaName,
        category: (/\d+\s?-\s?(.+$)/g).exec(mid.merchantCategory)[1],
        phone: mid.phoneNumber,
        address: midAddressToString(mid.address),
        locationId: mid.locationId
      };
      cache.set(merchantRef, merchant);

      return mid.locationId;
    })
    .then(getMerchantByLocationId)
    .then(locationData => {
      const merchantLocationData = locationData.place;
      merchant = {
        ...merchant,
        channel: getPrimaryChannelOfDistributionDesciption(merchantLocationData.primaryChannelOfDistribution),
        phone: merchantLocationData.cleansedTelephoneNumber,
        address: placeAddressToString(merchantLocationData),
        lat: Number.parseFloat(merchantLocationData.latitude),
        lng: Number.parseFloat(merchantLocationData.longitude)
      };
      cache.set(merchantRef, merchant);
      res.send(merchant);
    })
    .catch(error => {
      console.error("Error", error)
      res.status(500);
      res.send(error);
      return;
    });

}

module.exports = { getMerchant };
