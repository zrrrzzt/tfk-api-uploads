var Hapi = require('hapi');
var config = require('./config');
var handlers = require('./handlers');
var server = new Hapi.Server();

server.connection({
  port:config.SERVER_PORT,
  routes:{cors:{credentials:true}}
});

server.route({
  method: 'POST',
  path: '/submit',
  config: {

    payload: {
      output: 'stream',
      parse: true,
      allow: 'multipart/form-data'
    },

    handler: handlers.handleUpload
  }
});

server.start(function () {
  console.log('info', 'Server running at: ' + server.info.uri);
});