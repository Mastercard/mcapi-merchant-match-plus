var http = require('http');
var express = require('express');

require('dotenv').config()

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Mock data
app.get('/account', require('./apis/account').getAccount);
app.get('/transaction/:id', require('./apis/transaction').getTransaction);

// Merchant Information (identifier, places)
app.get('/merchant/:merchantRef', require('./apis/merchant').getMerchant);

// configure express to serve http requests
var port = process.env.PORT || '3000';
// app.set('port', port);

var server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function onError (error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      console.error('Unexpected error', error)
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening () {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}
