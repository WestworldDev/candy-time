var Hapi = require('hapi');
var Boom = require('boom');
var Joi = require('joi');

var CONFIG = require('./config');

var server = new Hapi.Server({
  connections: {
    routes: {
      cors: true
    }
  }
});
server.connection({
  port: CONFIG.port
});

require('./auth/default')(server, CONFIG);
require('./routes/entropy').routes(server, CONFIG);
require('./routes/snacks')(server, CONFIG);

server.start(function () {
    console.log('Server running at:', server.info.uri);
});
