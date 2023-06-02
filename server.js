/** @format */

'use strict';

const OnlineAgent = require('./respository/OnlineAgent');

const Hapi = require('@hapi/hapi');
const mysql = require('mysql');
const Joi = require('joi');
// Create a server with a host and port
//const server = new Hapi.Server();

let connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '1q2w3e4rP@ssw0rd',
  database: '3cx-buzz',
});

const init = async () => {
  const server = Hapi.server({
    port: 3200,
    host: '0.0.0.0',
    routes: {
      cors: true,
    },
  });

  // server.route({
  //     method: 'GET',
  //     path: '/',
  //     handler: (request, h) => {

  //         return 'Hello World!';
  //     }
  // });

  // Add the route
  server.route({
    method: 'GET',
    path: '/agents',
    handler: async function (request, reply) {
      try {
        const responsedata =
          await OnlineAgent.OnlineAgentRepo.getOnlineAgentByAgentCode('08840');
        if (responsedata.error) {
          return responsedata.errMessage;
        } else {
          return responsedata;
        }
      } catch (err) {
        server.log(['error', 'home'], err);
        return err;
        //console.dir(err)
      }
    },
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
