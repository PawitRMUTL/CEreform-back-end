/** @format */
var mysql = require('mysql');

//const uuid = require('uuid/v4');
const { v4: uuidv4 } = require('uuid');
const uuid = uuidv4();
const env = require('../../env.js');
const config = require('../../dbconfig.js')[env];

async function upload_pdf(filename, milliseconds, owner, year, type) {
  const unique_id = uuidv4();
  const pool = mysql.createPool(config);

  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO calendar_study (type,file_name , created_at , year,owner) VALUES ("${type}","${milliseconds}-${filename}"  ,NOW(),"${year}","${owner}" )`,
      function (error, results) {
        if (error) {
          console.error('Error inserting data:', error);
          return reject(error);
        } else {
          console.log('Upload successfully');
          resolve(results);
        }
      }
    );
  });
}

async function readfile() {
  var Query;
  const pool = mysql.createPool(config);

  return new Promise((resolve, reject) => {
    Query = 'SELECT * FROM calendar_study';
    console.log('Query is: ', Query);
    pool.query(Query, function (error, results) {
      if (error) {
        console.error('Error retrieving data:', error);
        return reject(error);
      } else {
        console.log('Readfile successful');
        resolve(results);
      }
    });
  });
}

module.exports.upload_pdf = {
  upload_pdf: upload_pdf,
  read_file: readfile,
};
