var mysql = require('mysql');
//const uuid = require('uuid/v4');
const { v4: uuidv4 } = require('uuid');
const env = require('../env.js');
const config = require('../dbconfig.js')[env];

async function setOutboundCall(agent_code,customer_number){

    var Query;
    var pool  = mysql.createPool(config);
    const unique_id = uuidv4();

    //console.log('unique_id is: ', unique_id);

    return new Promise((resolve, reject) => {
        //return resolve('OK');

        var post  = {agent_code: agent_code, 
            //agent_name: results1[0].name, 
            customer_number: customer_number,
            api_callout_at: new Date(),
            uuid: unique_id
        };
        console.log('post is: ', post); 

        //return resolve('OK');
        
        pool.query('INSERT INTO outbound_calls SET ?', post, function (error, results3, fields) {

            if (error) {
                return resolve(reject(error));
            }
            pool.end();
            return resolve({
                statusCode: 200,
                returnCode: 1,
                uuid: unique_id,
                message:'3CX received your outbound call request : '+customer_number+ ' called by : '+agent_code
            });   

        });

    });

}
/*
function getOutboundCall_(uuid) {
    let connection;
    var pool  = mysql.createPool(config);

    try {

        connection = mysql.createConnection(config);

        return new Promise((resolve, reject) => {

            //const Query = `SELECT * FROM users WHERE username = '${username}' AND user_password = SHA('${password}')`
            
            const Query = `SELECT * FROM outbound_calls WHERE uuid = '${uuid}'`;
            //console.log('Query is: ', Query);

            connection.query(Query, (error, results) => {

                if (error) {
                    return resolve(reject(error));
                }
                if (!results || results.length === 0) {

                    connection.destroy();
                    return resolve({
                        statusCode: 200,
                        returnCode: 1,
                        message: 'No Outbound Call found',
                    });

                }
                else {
                    connection.destroy();
                    return resolve({
                        statusCode: 200,
                        returnCode: 1,
                        agent_code: results[0].agent_code,
                        customer_number: results[0].customer_number,
                        uuid: results[0].uuid,
                        call_ref: results[0].uuid,
                        calltime_at: results[0].calltime_at,
                        message:'3CX received your outbound call request : '+results[0].customer_number+ ' called by : '+results[0].agent_code
                    });
                }

            });

        });

    } finally {
        if (connection && connection.end) connection.end();
    }
}
*/

function getOutboundCall(uuid) {
    //let connection;

    var pool  = mysql.createPool(config);
    

        //connection = mysql.createConnection(config);

        return new Promise((resolve, reject) => {

            //const Query = `SELECT * FROM users WHERE username = '${username}' AND user_password = SHA('${password}')`
            
            const Query = `SELECT * FROM outbound_calls WHERE uuid = '${uuid}'`;
            //console.log('Query is: ', Query);
  
            pool.query(Query, function (error, results, fields) {

                if (error) {
                    return resolve(reject(error));
                }
                pool.end();
  
                if (!results || results.length === 0) {


                    return resolve({
                        statusCode: 404,
                        returnCode: 11,
                        message: 'No Outbound Call found',
                    });

                }
                else {

                    return resolve({
                        statusCode: 200,
                        returnCode: 1,
                        agent_code: results[0].agent_code,
                        customer_number: results[0].customer_number,
                        uuid: results[0].uuid,
                        call_ref: results[0].call_ref,
                        calltime_at: results[0].calltime_at,
                        message:'3CX received your outbound call request : '+results[0].customer_number+ ' called by : '+results[0].agent_code
                    });
                } 
    
            });

        });

}


module.exports.OutboundRepo = {
    setOutboundCall: setOutboundCall,
    getOutboundCall: getOutboundCall,
};


