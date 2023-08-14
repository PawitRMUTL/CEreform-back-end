/** @format */
var mysql = require('mysql');

//const uuid = require('uuid/v4');
const { v4: uuidv4 } = require('uuid');
const uuid = uuidv4();
const env = require('../../env.js');
const config = require('../../dbconfig.js')[env];

// thecher_listById
async function Report_graduate(
  SelecteCooperative,
  SelecteCooperativePhone,
  SelectePrefix,
  SelecteFirst,
  SelecteLast,
  SelecteCooperativeTopic,
  SelecteCooperativeContent,
) {
  const unique_id = uuidv4();
  const pool = mysql.createPool(config);

  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO graduate_report( name_cooperative, phone_cooperative, prefix_name_graduate, first_name_graduate, last_name_graduate, topic_gradute, contant_gradute) 
		VALUES ('${SelecteCooperative}','${SelecteCooperativePhone}','${SelectePrefix}','${SelecteFirst}','${SelecteLast}','${SelecteCooperativeTopic}','${SelecteCooperativeContent}')`,
      function (error, results) {
        if (error) {
          console.error('Error inserting data:', error);
          return reject(error);
        } else {
          console.log('Insert Report  successfully');
          // console.log(resolve);
          resolve(results);
        }
      },
    );
  });
}

module.exports.report = {
  Report_graduate: Report_graduate,
};
