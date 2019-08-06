const Places = require('mastercard-places');
const MerchantIdentifier = require('mastercard-merchant-identifier');

// mastercard credential
const { consumerKey, keyStorePath, keyAlias, keyPassword } = require('../../config/credentials').mastercard;

var initialized = false;

function init (api = Places) {
  // You only need to do initialize MasterCardAPI once
  if (initialized) return;

  var MasterCardAPI = api.MasterCardAPI;

  // For production, set sandbox: false
  var authentication = new MasterCardAPI.OAuth(consumerKey, keyStorePath, keyAlias, keyPassword);

  MasterCardAPI.init({
    sandbox: process.env.NODE_ENV !== 'production',
    authentication: authentication,
    debug: true
  });

  initialized = true;
}


function doQuery (api, requestData) {
  return new Promise(function (resolve, reject) {
    init();

    api.query(requestData, function (error, data) {
      if (error) {
        console.log('Error: ' + JSON.stringify(error));
        reject(error);
      } else {
        console.log('Success: ' + JSON.stringify(data));
        resolve(data);
      }
    });
  });
}

module.exports = {
  init,
  doQuery,
  Places,
  MerchantIdentifier
};
