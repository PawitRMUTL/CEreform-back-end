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


                    }
                    else{
                        pool.end();
                        return resolve({
                            statusCode: 404,
                            returnCode: 12,
                            message: 'Agent Code : '+agent_code+' not logged-in yet',
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


module.exports.OutboundRepo = {
    setOutboundCall: setOutboundCall,
};


