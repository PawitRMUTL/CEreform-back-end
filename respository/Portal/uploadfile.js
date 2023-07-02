/** @format */
var mysql = require('mysql');

//const uuid = require('uuid/v4');
const { v4: uuidv4 } = require('uuid');
const uuid = uuidv4();
const env = require('../../env.js');
const config = require('../../dbconfig.js')[env];

async function upload_pdf(filename, milliseconds, owner) {
  const unique_id = uuidv4();
  const pool = mysql.createPool(config);

  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO calendar_study (file_name , created_at , owner) VALUES ("${milliseconds}-${filename}"  ,NOW(),"${owner}" )`,
      function (error, results) {
        if (error) {
          console.error('Error inserting data:', error);
          return reject(error);
        }
        resolve(results);
      }
    );
  });
}

module.exports.upload_pdf = {
  upload_pdf: upload_pdf,
};
