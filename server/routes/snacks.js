'use strict';

var Boom = require('boom');
var Joi = require('joi');
var findWhere = require('lodash.findwhere');



module.exports = function(server, CONFIG) {
  var snacks = CONFIG.snacks;
  var handleEntropy = require('./entropy').entropyHandler(CONFIG);

  server.route({
    method: 'GET',
    path: '/snacks',
    config: {
      cors: true,
      tags: ['api'],
      description: 'Responds with the list of snacks that can be voted on',
      pre: [
        handleEntropy
      ],
      validate: {
        query: {
          entropyChance: Joi.number().integer().default(0)
        }
      },
      response: {
        schema: Joi.array().items(
          Joi.object().keys({
            id: Joi.string().alphanum().description('Snack ID'),
            name: Joi.string().description('Snack name'),
            votes: Joi.number().integer().description('Current tally of votes for this month')
          })
        )
      }
    },
    handler: function (request, reply) {
        reply(snacks);
    }
  });

  server.route({
    method: 'POST',
    path: '/snacks/vote/{snackId}',
    config: {
      cors: true,
      tags: ['api'],
      description: 'Increments the vote count for the give snack',
      notes: 'Per-user vote count restriction is not implemented.  NAT candidates are resopnsible for handling this.',
      pre: [
        handleEntropy,
        function(request, next) {
          var id = request.params.snackId;
          var snack = findWhere(snacks, {id: id});
          if (!snack)
            return next(Boom.badData('Snack ID not recognized'));

          request.snack = snack;
          next();
        }
      ],
      validate: {
        query: {
          entropyChance: Joi.number().integer().default(0)
        },
        params: {
          snackId: Joi.string().alphanum().required().description('Snack ID to vote for')
        }
      }
    },
    handler: function (request, reply) {
        request.snack.votes++;
        reply();
    }
  });
};
