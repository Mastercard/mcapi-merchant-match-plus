# About
This is the companion reference implementation for Mastercard API's [Merchant Match Plus solution](https://developer.mastercard.com/solution/merchant-match-plus)

The implementation demonstrates how an issuer can take advantage of Mastercard APIs such as [Merchant Identifier](https://developer.mastercard.com/documentation/merchant-identifier/2) for and [Places](https://developer.mastercard.com/documentation/places/1) to enrich her internet or mobile banking experience by showing merchant information when consumer examines his or her transaction details

# Demo

You will need to configure certain environment variables before starting the demo. Please refer to individual [`backend\README.md`](backend/README.md) and [`frontend\README.md`](frontend/README.md) for more details.

Start backend API server

```
cd backend
npm i
node src/index.js
```

Start frontend server

```
cd frontend
npm i
npm start
```

## Implementation Overview

This demo employs a simplied multi-tier secure architecture consisting of an API backend server and an internet-facing frontend server

With the API backend server normally resides behind a firewall, the frontend server dual as a reverse proxy. For demostration purpose, `webpack-dev-server` provides excellent proxy capability

The backend server makes use of caching in order to improve response time for repeated merchant querying.

## Sample screenshot

Home page

![Home page](/homepage.png)


Transaction details

![Transaction details](/transaction-details.png)
