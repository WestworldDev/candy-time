'use strict';

var Boom = require('boom');
var Joi = require('joi');

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports.entropyHandler = function(CONFIG) {
  return function handleEntropy(request, next) {
    if (!CONFIG.entropyAllowed) return next();

    var error = Boom.tooManyRequests('Service under load, or down for maintenance');

    if (CONFIG.entropyEnabled &&
        randomInt(0, 100) < CONFIG.entropyChance) {
      return next(error);
    }

    if (request.query.entropyChance > 0 &&
        randomInt(0, 100) < request.query.entropyChance) {
      return next(error);
    }

    next();
  };
};

module.exports.routes = function(server, CONFIG) {
  server.route({
    method: 'POST',
    path: '/entropy/chance/{amount}',
    config: {
      validate: {
        params: {
          amount: Joi.number().integer().min(0).max(100).description('Sets the global chance of request failure, if the entropyAllowed config value is set')
        }
      }
    },
    handler: function(request, reply) {
      CONFIG.entropyChance = request.params.amount;
      reply({globalEntropyChance: CONFIG.entropyChance});
    }
  });

  server.route({
    method: 'POST',
    path: '/entropy/enabled/{flag}',
    config: {
      validate: {
        params: {
          flag: Joi
            .boolean()
            .description(
              'Toggles the global chance of request failure.  This can still be overridden on a per-request basis')
        }
      }
    },
    handler: function(request, reply) {
      CONFIG.entropyEnabled = request.params.flag;
      reply({globalEntropy: CONFIG.entropyAllowed && CONFIG.entropyEnabled});
    }
  });
};
