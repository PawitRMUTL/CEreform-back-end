/** @format */
var mysql = require('mysql');

//const uuid = require('uuid/v4');
const { v4: uuidv4 } = require('uuid');
const uuid = uuidv4();
const env = require('../../env.js');
const config = require('../../dbconfig.js')[env];

async function thecher_list() {
  const unique_id = uuidv4();
  const pool = mysql.createPool(config);

  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM teacher_list', function (error, results) {
      if (error) {
        console.error('Error inserting data:', error);
        return reject(error);
      } else {
        console.log('SELECT teacher_list successfully');
        // console.log(resolve);
        resolve(results);
      }
    });
  });
}

// thecher_listById
async function thecher_listById(id) {
  const unique_id = uuidv4();
  const pool = mysql.createPool(config);

  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM teacher_list WHERE teacher_id = ${id}`,
      function (error, results) {
        if (error) {
          console.error('Error inserting data:', error);
          return reject(error);
        } else {
          console.log('SELECT teacher_list successfully');
          // console.log(resolve);
          resolve(results);
        }
      }
    );
  });
}

module.exports.teacher_detaill = {
  thecher_list: thecher_list,
  thecher_listById: thecher_listById,
};
