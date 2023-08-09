/** @format */
var mysql = require('mysql');

//--------------- jwt -----------------
var jwt = require('jsonwebtoken');

//---------------- COOKIE --------------------------------

//const uuid = require('uuid/v4');
const { v4: uuidv4 } = require('uuid');
const uuid = uuidv4();
const env = require('../../env.js');
const config = require('../../dbconfig.js')[env];

// API READ STUDENT WHERE rmutl_id
async function ReadStudentByUsername(username) {
  const unique_id = uuidv4();
  const pool = mysql.createPool(config);
  // console.log('data1 is', data);

  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM biographical_student WHERE id_rmutl = "${username}"`,
      function (error, results) {
        if (error) {
          console.error('Error  data:', error);
          return reject(error);
        } else {
          console.log('Read Student successfully');
          resolve(results);
        }
      },
    );
  });
}
// Update_student
async function Update_student(id, email, date, nationality, religion) {
  const unique_id = uuidv4();
  const pool = mysql.createPool(config);
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE biographical_student SET
      created = NOW(), email ="${email}" ,birthday = "${date}" ,nationality = "${nationality}", religion="${religion}" 
       WHERE id_rmutl  = "${id}"  `,
      function (error, results) {
        if (error) {
          console.error('Error  data:', error);
          return reject(error);
        } else {
          console.log('UPDATE Student successfully');
          resolve(results);
        }
      },
    );
  });
}

module.exports.student = {
  ReadStudentByUsername: ReadStudentByUsername,
  Update_student: Update_student,
};
