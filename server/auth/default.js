'use strict';

module.exports = function(server, CONFIG) {
  server.register(require('hapi-auth-bearer-token'), function(err) {
    server.auth.strategy('default', 'bearer-access-token', true, {
      allowQueryToken: false,
      validateFunc: function(token, callback) {
        if (token === CONFIG.token)
          return callback(null, true, {token: token});

        return callback(null, false, {token: token});
      }
    });
  });
};
