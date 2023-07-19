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
async function upload_image(data, filename, ownerid) {
  const unique_id = uuidv4();
  const pool = mysql.createPool(config);
  // console.log('data1 is', data);

  return new Promise((resolve, reject) => {
    // Convert the buffer to a Base64 encoded string
    const dataString = data.toString('base64');
    console.log('data is ', data, 'filename', filename);
    pool.query(
      `INSERT INTO newspaper_image( data_file,filename , ownerid) VALUES ("${dataString}","${filename}","${ownerid}")`,
      function (error, results) {
        if (error) {
          console.error('Error inserting data:', error);
          return reject(error);
        } else {
          console.log('Upload image successfully');
          // console.log(resolve);
          resolve(results);
        }
      }
    );
  });
}

module.exports.upload_pdf = {
  upload_pdf: upload_pdf,
  read_file: readfile,
  upload_image: upload_image,
};
