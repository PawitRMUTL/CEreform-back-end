//API: http://localhost:3000/getOnlineAgentByAgentCode?agentcode=08926
server.route({
    method: 'POST',
    path: '/api/v1/agentstatus',
    config: {
      payload: {
        multipart: true,
        //output: 'stream',
        //parse: true,
        //allow: ['application/json', 'multipart/form-data',  'application/x-www-form-urlencoded'],
        //timeout: false
      },
      // auth: {
      //     strategy: 'jwt-strict',
      //     mode: 'required'
      // },
      cors: {
        origin: ['*'],
        additionalHeaders: ['cache-control', 'x-requested-width'],
      },
    },
    handler: async function (request, reply) {
      try {
        const { agent_code, agent_status } = request.payload;

        const responsedata = await AgentStatus.AgentStatusRepo.setAgentStatus(
          agent_code,
          agent_status
        );
        if (responsedata.error) {
          return responsedata.errMessage;
        } else {
          return responsedata;
        }
      } catch (err) {
        server.log(['error', 'home'], err);
        return err;
      }
    },
  });

  //API: http://localhost:3000/getOnlineAgentByAgentCode?agentcode=08926
  server.route({
    method: 'GET',
    path: '/api/v1/agentbyteam',
    config: {
      // auth: {
      //     strategy: 'jwt-strict',
      //     mode: 'required'
      // },
      cors: {
        origin: ['*'],
        additionalHeaders: ['cache-control', 'x-requested-width'],
      },
    },
    handler: async function (request, reply) {
      var param = request.query;
      const team_code = param.team_code;

      try {
        const responsedata = await AgentStatus.AgentStatusRepo.getAgentByTeam(
          team_code
        );
        if (responsedata.error) {
          return responsedata.errMessage;
        } else {
          return responsedata;
        }
      } catch (err) {
        server.log(['error', 'home'], err);
        return err;
      }
    },
  });

  //API: http://localhost:3000/getOnlineAgentByAgentCode?agentcode=08926
  server.route({
    method: 'POST',
    path: '/api/v1/outbound',
    config: {
      payload: {
        multipart: true,
        //output: 'stream',
        //parse: true,
        //allow: ['application/json', 'multipart/form-data',  'application/x-www-form-urlencoded'],
        //timeout: false
      },
      // auth: {
      //     strategy: 'jwt-strict',
      //     mode: 'required'
      // },
      cors: {
        origin: ['*'],
        additionalHeaders: ['cache-control', 'x-requested-width'],
      },
    },
    handler: async function (request, reply) {
      try {
        const { agent_code, customer_number } = request.payload;

        const responsedata = await Outbound.OutboundRepo.setOutboundCall(
          agent_code,
          customer_number
        );
        if (responsedata.error) {
          return responsedata.errMessage;
        } else {
          return responsedata;
        }
      } catch (err) {
        server.log(['error', 'home'], err);
        return err;
      }
    },
  });

  //API: http://localhost:3000/getOnlineAgentByAgentCode?agentcode=08926
  server.route({
    method: 'GET',
    path: '/api/v1/getoutbound',
    config: {
      // auth: {
      //     strategy: 'jwt-strict',
      //     mode: 'required'
      // },
      cors: {
        origin: ['*'],
        additionalHeaders: ['cache-control', 'x-requested-width'],
      },
      // validate: {
      //   params: Joi.object({
      //     name: Joi.string().alphanum().required()
      //   })
      // }
    },
    handler: async function (request, reply) {
      var param = request.query;
      const uuid = param.uuid;

      try {
        const responsedata = await Outbound.OutboundRepo.getOutboundCall(uuid);
        if (responsedata.error) {
          return responsedata.errMessage;
        } else {
          return responsedata;
        }
      } catch (err) {
        server.log(['error', 'home'], err);
        return err;
      }
    },
  });

  //API: http://localhost:3000/getOnlineAgentByAgentCode?agentcode=08926
  server.route({
    method: 'GET',
    path: '/api/v1/inbound',
    config: {
      // auth: {
      //     strategy: 'jwt-strict',
      //     mode: 'required'
      // },
      cors: {
        origin: ['*'],
        additionalHeaders: ['cache-control', 'x-requested-width'],
      },
    },
    handler: async function (request, reply) {
      var param = request.query;
      const customer_number = param.customer_number;

      try {
        //const { agent_code, customer_number } = request.payload;

        console.log('customer_number : ', customer_number);

        const responsedata = await Inbound.InboundRepo.setInboundCall(
          customer_number
        );
        if (responsedata.error) {
          return responsedata.errMessage;
        } else {
          //return responsedata;

          console.log('responsedata: ', responsedata);

          //http://10.22.192.36:8080/buzz_power/backend/web/telephony/callin/get-call-history?
          //caller_id=0910941529&call_refer_id=1111&ivr_number=1

          const caller_id = responsedata.inbound_customer_number;
          const ivr_number = responsedata.ivr_number;
          const call_refer_id = responsedata.inbound_callref;

          if (env == 'development') {
            //-- For POC --
            return responsedata;
            //return reply.redirect('http://128.199.188.223:3200/agents?caller_id=' + caller_id + '&call_refer_id=' + call_refer_id + '&ivr_number=' + ivr_number);
          } else if (env == 'production') {
            //-- For PRODUCTION ---
            return reply.redirect(
              'http://10.22.192.36:8080/buzz_power/backend/web/telephony/callin/get-call-history?caller_id=' +
                caller_id +
                '&call_refer_id=' +
                call_refer_id +
                '&ivr_number=' +
                ivr_number
            );
          }
        }
      } catch (err) {
        server.log(['error', 'home'], err);
        return err;
      }
    },
  });

  //API: http://localhost:3000/getOnlineAgentByAgentCode?agentcode=08926
  server.route({
    method: 'POST',
    path: '/api/v1/setavgwaitingtime',
    config: {
      // auth: {
      //     strategy: 'jwt-strict',
      //     mode: 'required'
      // },
      cors: {
        origin: ['*'],
        additionalHeaders: ['cache-control', 'x-requested-width'],
      },
    },
    handler: async function (request, reply) {
      try {
        const responsedata = await Inbound.InboundRepo.setAvgWaitingTime();
        if (responsedata.error) {
          return responsedata.errMessage;
        } else {
          console.log('responsedata: ', responsedata);
          return responsedata;
        }
      } catch (err) {
        server.log(['error', 'home'], err);
        return err;
      }
    },
  });

  //API: http://localhost:3000/getOnlineAgentByAgentCode?agentcode=08926
  server.route({
    method: 'GET',
    path: '/api/v1/getsatisfactionscore',
    config: {
      // auth: {
      //     strategy: 'jwt-strict',
      //     mode: 'required'
      // },
      cors: {
        origin: ['*'],
        additionalHeaders: ['cache-control', 'x-requested-width'],
      },
    },
    handler: async function (request, reply) {
      try {
        const responsedata =
          await Satisfaction.SatisfactionRepo.getAverageSatisfactionScore();
        if (responsedata.error) {
          return responsedata.errMessage;
        } else {
          //return responsedata;

          console.log('responsedata: ', responsedata);

          return responsedata;
        }
      } catch (err) {
        server.log(['error', 'home'], err);
        return err;
      }
    },
  });

  //API: http://localhost:3000/getOnlineAgentByAgentCode?agentcode=08926
  server.route({
    method: 'GET',
    path: '/api/v1/getaveragewaitingtime',
    config: {
      // auth: {
      //     strategy: 'jwt-strict',
      //     mode: 'required'
      // },
      cors: {
        origin: ['*'],
        additionalHeaders: ['cache-control', 'x-requested-width'],
      },
    },
    handler: async function (request, reply) {
      try {
        const responsedata =
          await Satisfaction.SatisfactionRepo.getAverageWaitingTime();
        if (responsedata.error) {
          return responsedata.errMessage;
        } else {
          //return responsedata;

          console.log('responsedata: ', responsedata);

          return responsedata;
        }
      } catch (err) {
        server.log(['error', 'home'], err);
        return err;
      }
    },
  });