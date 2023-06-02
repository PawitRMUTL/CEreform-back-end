/** @format */

var mysql = require('mysql');
//const uuid = require('uuid/v4');
const { v4: uuidv4 } = require('uuid');
const uuid = uuidv4();

const env = require('../env.js');
const config = require('../dbconfig.js')[env];

async function setAgentStatus(agent_code, status_code) {
  var Query;
  var pool = mysql.createPool(config);

  return new Promise((resolve, reject) => {
    Query = `SELECT * FROM agents WHERE agent_code = '${agent_code}' ORDER BY agent_code LIMIT 1`;
    console.log('Query1 is: ', Query);

    pool.query(Query, function (error, results1, fields) {
      if (error) throw error;
      console.log('results1 is: ', results1);

      //return resolve('OK');

      if (results1.length > 0) {
        Query = `SELECT * FROM online_agents WHERE agent_code = '${agent_code}' ORDER BY agent_code LIMIT 1`;
        console.log('Query2 is: ', Query);

        pool.query(Query, function (error, results2, fields) {
          if (error) throw error;
          console.log('results2 is: ', results2);

          if (results2.length > 0) {
            pool.query(
              'UPDATE online_agents set status_code = ?, last_status_changed = ?, is_updated = ? WHERE agent_code = ?',
              [status_code, new Date(), '1', agent_code],
              function (error, results3, fields) {
                if (error) {
                  return resolve(reject(error));
                }
                pool.end();
                return resolve({
                  statusCode: 200,
                  returnCode: 1,
                  message:
                    'Agent status has been changed to [' + status_code + ']',
                });
              }
            );
          } else {
            pool.end();
            return resolve({
              statusCode: 200,
              returnCode: 2,
              message: 'Agent Code:' + agent_code + ' is already logged out',
            });
          }
        });
      } else {
        pool.end();
        return resolve({
          statusCode: 404,
          returnCode: 11,
          message: 'Agent not found',
        });
      }
    });
  });
}

async function getAgentByTeam(team_code) {
  var Query;
  var pool = mysql.createPool(config);

  return new Promise((resolve, reject) => {
    Query = `SELECT * FROM agents WHERE agtt_id = '${team_code}' ORDER BY agent_code`;
    console.log('Query1 is: ', Query);

    pool.query(Query, function (error, results1, fields) {
      if (error) throw error;
      //console.log('results1 is: ', results1);

      //return resolve('OK');

      if (results1.length > 0) {
        pool.end();
        return resolve({
          statusCode: 200,
          returnCode: 1,
          data: results1,
          message: 'Agents of [' + team_code + ']',
        });
      } else {
        pool.end();
        return resolve({
          statusCode: 404,
          returnCode: 11,
          message: 'Agent not found',
        });
      }
    });
  });
}

module.exports.AgentStatusRepo = {
  setAgentStatus: setAgentStatus,
  getAgentByTeam: getAgentByTeam,
};
