var mysql = require('mysql');
//const uuid = require('uuid/v4');
const {
    v4: uuidv4
} = require('uuid');
const env = require('../env.js');
const config = require('../dbconfig.js')[env];

async function getAverageSatisfactionScore() {

    var Query;
    var pool = mysql.createPool(config);

    return new Promise((resolve, reject) => {

        //return resolve('OK');

        //Query = `SELECT * FROM  inbound_details WHERE inbound_customer_number = '${customer_number}' ORDER BY idinbound_details DESC LIMIT 1;`;

        // Query_ORG = `SELECT DATE_FORMAT(Survey_DateTime, '%Y-%m-%d') as surveydate, avg (CSAT_Score) as avgscore
        //         FROM survey 
        //         WHERE DATE_FORMAT(Survey_DateTime, '%Y-%m-%d') = DATE_FORMAT(NOW(), '%Y-%m-%d')
        //         group by DATE_FORMAT(Survey_DateTime, '%Y-%m-%d');`;

        Query = `CALL sp_get_avg_score();`;

        console.log('Query1 is: ', Query);

        pool.query(Query, function (error, results1, fields) {
            if (error) throw error;
            console.log('results1 is: ', results1);

            //return resolve('OK');

            if (results1.length > 0) {
                //pool.end();

                return resolve({
                    statusCode: 200,
                    returnCode: 1,
                    data: results1[0]
                });

            } else {
                pool.end();
                return resolve({
                    statusCode: 404,
                    returnCode: 11,
                    message: 'Survey data not found for today !!',
                });
            }

        });



    });

}

async function getAverageWaitingTime() {

    var Query;
    var pool = mysql.createPool(config);

    return new Promise((resolve, reject) => {

        //return resolve('OK');

        Query = `SELECT DATE_FORMAT(average_at, "%H:%i") as average_at, DATE_FORMAT(average_time, "%i:%s") as average_time FROM average_waiting_time
                WHERE DATE_FORMAT(average_at, '%Y-%m-%d') = DATE_FORMAT(NOW(), '%Y-%m-%d');`;

        console.log('Query1 is: ', Query);

        pool.query(Query, function (error, results1, fields) {
            if (error) throw error;
            console.log('results1 is: ', results1);

            //return resolve('OK');

            if (results1.length > 0) {
                //pool.end();

                return resolve({
                    statusCode: 200,
                    returnCode: 1,
                    data: results1
                });

            } else {
                pool.end();
                return resolve({
                    statusCode: 404,
                    returnCode: 11,
                    message: 'Average waiting time records not found',
                });
            }

        });

    });

}

module.exports.SatisfactionRepo = {
    getAverageSatisfactionScore: getAverageSatisfactionScore,
    getAverageWaitingTime: getAverageWaitingTime
};