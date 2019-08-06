# Backend APIs

## Configure Mastercard API keys
Configure a Mastercard API key inside the `.env` file in the same `backend` folder

```
MASTERCARD_CONSUMER_KEY=<your own>
MASTERCARD_KEYSTORE_PATH=<path/to/.p12/file>
MASTERCARD_KEY_ALIAS=keyalias
MASTERCARD_KEY_PASSWORD=keystorepassword

```

Don't have one? Start [here](https://developer.mastercard.com/tutorial/how-to-create-a-project-on-mastercard-developers)

## Demo

```
node src/index.js
```


## /account
- Returns consumer's account information
- This implementation returns mock data from `mock-data/account.json`

## /transaction/:id
- Return details of transaction whose transaction ID matching `id` parameter
- This implementation returns mock data from `mock-data/account.json`

## /merchant/:ref
- Return details of merchant whose reference/id matching `ref` parameter
- This implementation first queries [Merchant Identifier](https://developer.mastercard.com/documentation/merchant-identifier/2) for merchant's general details and a `locationId`. It thens queries [Places](https://developer.mastercard.com/documentation/places/1#api_place_by_location_id) for more accurate location details including `latitude`, `longitude`, `streetAddr`
- There are many other fields giving extra information about a merchant in the responses of these APIs. They (e.g. "doing business as" - `merchantDbaName`, `merchantCategory`, `industry` or `cashback`, `payAtThePump` features) are certainly worth exploring