var mysql = require('mysql');
//const uuid = require('uuid/v4');
const { v4: uuidv4 } = require('uuid')
const uuid = uuidv4()

const env = require('../env.js');
const config = require('../dbconfig.js')[env];

function getOnlineAgentByAgentCode(agentcode) {
    let connection;

    try {

        connection = mysql.createConnection(config); // createConnection สำหรับ ใช้ครั้งเดียว ถ้าอยากใช้หลายครั้งให้ไปใช้ createPool

        return new Promise((resolve, reject) => {

            //const Query = `SELECT * FROM users WHERE username = '${username}' AND user_password = SHA('${password}')`

            const Query = `SELECT * FROM agents WHERE agent_code = '${agentcode}'`;
            //console.log('Query is: ', Query);

            connection.query(Query, (error, results) => {

                if (error) {
                    return resolve(reject(error));
                }
                if (!results || results.length === 0) {

                    connection.destroy();
                    return resolve({
                        error: false,
                        message: 'No online agent found',
                        data: results,
                    });

                }
                else {
                    connection.destroy();

                    return resolve({
                        error: false,
                        message: 'Successfuly',
                        data: results,
                    });
                }

            });

        });

    } finally {
        if (connection && connection.end) connection.end();
    }
}

function setConnectToSoftphone(agent_code, is_login) {
    let connection;

    try {

        connection = mysql.createConnection(config);

        return new Promise((resolve, reject) => {

            /*
            INSERT INTO AggregatedData (datenum,Timestamp)
            VALUES ("734152.979166667","2010-01-14 23:30:00.000")
            ON DUPLICATE KEY UPDATE 
              Timestamp=VALUES(Timestamp)
            */

            /*
            connection.query("INSERT INTO users (nick,cldbid,clid,lastChannel) VALUES(?,?,?,?) ON DUPLICATE KEY UPDATE lastchannel=?;", 
              [event.client.nickname, event.client.getDBID(), event.client.getUID(), config.lastChannel, event.channel.cid],
                    function(err, results){
                        if(err){
                            log.clog("Blad SQL #clientmoved: " + err)
                        }else{
                            log.clog("Pomyslnie addded/updated record of "+event.client.nickname)
                        }
             })
            */

            //const Query = `SELECT * FROM users WHERE username = '${username}' AND user_password = SHA('${password}')`

            const Query = `SELECT * FROM agents WHERE agent_code = '${agent_code}'`;
            //console.log('Query is: ', Query);

            connection.query(Query, (error, results) => {

                if (error) {
                    return resolve(reject(error));
                }

                if (!results || results.length === 0) {

                    return resolve({
                        error: false,
                        message: 'No online agent found',
                        data: results,
                    });

                }
                else {
                    return resolve({
                        error: false,
                        message: 'Successfuly',
                        data: results,
                    });
                }

            });

        });

    } finally {
        if (connection && connection.end) connection.end();
    }
}

async function insertOnlineAgent(agent_code) {

    var Query;
    var pool = mysql.createPool(config); // ถ้าเป็น pool สามารถ เรียกใช้ซ้ำได้ (Re-use pool)


    return new Promise((resolve, reject) => {

        Query = `SELECT * FROM agents WHERE agent_code = '${agent_code}' ORDER BY agent_code LIMIT 1`;
        console.log('Query1 is: ', Query);

        pool.query(Query, function (error, results1, fields) {
            if (error) throw error;
            console.log('results1 is: ', results1);

            if (results1.length > 0) {

                Query = `SELECT * FROM online_agents WHERE agent_code = '${agent_code}' ORDER BY agent_code LIMIT 1`;
                console.log('Query2 is: ', Query);

                pool.query(Query, function (error, results2, fields) {
                    if (error) throw error;
                    console.log('results2 is: ', results2);

                    if (results2.length > 0) { //login_at: new Date() 

                        if (results2[0].is_login == '0') {

                            pool.query('UPDATE online_agents set is_login = ?, login_at = ?, status_code = ?, is_updated = ? WHERE agent_code = ?', ['1', new Date(), '0', '1', agent_code], function (error, results3, fields) {

                                if (error) {
                                    return resolve(reject(error));
                                }
                                pool.end();
                                return resolve({
                                    statusCode: 200,
                                    returnCode: 1,
                                    message: 'Agent Code:' + agent_code + ' is successfully logged in',
                                });

                            });

                        }
                        else {

                            pool.end();
                            return resolve({
                                statusCode: 200,
                                returnCode: 2,
                                message: 'Agent Code:' + agent_code + ' is already logged in',
                            });

                        }

                    }
                    else {

                        var post = { agent_code: agent_code, agent_name: results1[0].name, login_at: new Date() };
                        console.log('post is: ', post);

                        //return resolve('OK');

                        pool.query('INSERT INTO online_agents SET ?', post, function (error, results3, fields) {

                            if (error) {
                                return resolve(reject(error));
                            }
                            pool.end();
                            return resolve({
                                statusCode: 200,
                                returnCode: 1,
                                message: 'Agent Code:' + agent_code + ' is successfully logged in',
                            });

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

async function deleteOnlineAgent(agent_code) {

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

                        //pool.query(`DELETE FROM online_agents WHERE agent_code = '${agent_code}' ORDER BY agent_code LIMIT 1`, function (error, results3, fields) {
                        pool.query('UPDATE online_agents set is_login = ?, is_updated = ? WHERE agent_code = ?', ['0', '1', agent_code], function (error, results3, fields) {

                            if (error) {
                                return resolve(reject(error));
                            }
                            pool.end();
                            return resolve({
                                statusCode: 200,
                                returnCode: 3,
                                message: 'Agent Code:' + agent_code + ' is successfully logged out',
                            });

                        });
                    }
                    else {
                        pool.end();
                        return resolve({
                            statusCode: 200,
                            returnCode: 4,
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

module.exports.OnlineAgentRepo = {
    getOnlineAgentByAgentCode: getOnlineAgentByAgentCode,
    insertOnlineAgent: insertOnlineAgent,
    deleteOnlineAgent: deleteOnlineAgent,
};
