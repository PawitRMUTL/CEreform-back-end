var mysql = require('mysql');
//const uuid = require('uuid/v4');
const { v4: uuidv4 } = require('uuid');
const env = require('../env.js');
const config = require('../dbconfig.js')[env];

async function setInboundCall(customer_number){

    var Query;
    var pool  = mysql.createPool(config);
    const unique_id = uuidv4();

    //console.log('unique_id is: ', unique_id);

    return new Promise((resolve, reject) => {
        //return resolve('OK');

        var post  = {
            customer_number: customer_number,
            api_callout_at: new Date(),
            uuid: unique_id
        };
        console.log('post is: ', post); 

        //return resolve('OK');
        
        Query = `SELECT * FROM  inbound_details WHERE inbound_customer_number = '${customer_number}' ORDER BY idinbound_details DESC LIMIT 1;`;
        console.log('Query1 is: ', Query);

        pool.query(Query, function (error, results1, fields) {
            if (error) throw error;
            console.log('results1 is: ', results1);

            //return resolve('OK');

            if (results1.length > 0) {
                //pool.end();

                pool.query('UPDATE inbound_details set is_call_ext_api = ?, call_ext_api_at = ? WHERE idinbound_details = ?', ['1', new Date(), results1[0].idinbound_details], function (error, results2, fields) {

                    if (error) {
                        return resolve(reject(error));
                    }
                    pool.end();

                    // return resolve({
                    //     statusCode: 200,
                    //     returnCode: 1,
                    //     message: 'Agent status has been changed to ['+status_code+']',
                    // });   

                    return resolve({
                        statusCode: 200,
                        returnCode: 1,
                        uuid: unique_id,
                        idinbound_details: results1[0].idinbound_details,
                        inbound_datetime: results1[0].inbound_datetime,
                        ivr_number: results1[0].ivr_number,
                        inbound_callref: results1[0].inbound_callref,
                        inbound_customer_number: results1[0].inbound_customer_number,
                        message:'3CX received your Inbound call request : '+customer_number
                    }); 

                });

            } else {
                pool.end();
                return resolve({
                    statusCode: 404,
                    returnCode: 11,
                    message: 'inbound_customer_number not found !!',
                });
            }

        });




/*
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
*/

    });

}

async function setAvgWaitingTime(){

    var Query;
    var pool  = mysql.createPool(config);

    return new Promise((resolve, reject) => {
        //return resolve('OK');
        
        Query = `INSERT INTO average_waiting_time (average_time) 
                    SELECT SEC_TO_TIME(AVG(TIME_TO_SEC(total_waiting_time))) as average_time
                    FROM queue_calldetails 
                    WHERE (DATE_FORMAT(CONVERT_TZ(time_start,'+00:00','+07:00'), '%Y-%m-%d') = DATE_FORMAT(subdate(NOW(), 0), '%Y-%m-%d')) AND (is_counted = '1') 
                    group by DATE_FORMAT(CONVERT_TZ(time_start,'+00:00','+07:00'), '%Y-%m-%d');`;

        //console.log('Query1 is: ', Query);

        pool.query(Query, function (error, results, fields) {

            if (error) {
                return resolve(reject(error));
            }
            pool.end();
            return resolve({
                statusCode: 200,
                returnCode: 1,
                message:'Average Waiting Time was inserted.'
            });   

        });


    });

}


module.exports.InboundRepo = {
    setInboundCall: setInboundCall,
    setAvgWaitingTime: setAvgWaitingTime,
};


