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
// dashboard_Read_report
async function dashboard_Read_report() {
  const unique_id = uuidv4();
  const pool = mysql.createPool(config);
  return new Promise((resolve, reject) => {
    pool.query(
      `
      SELECT * FROM graduate_report
      `,
      function (error, results) {
        if (error) {
          console.error('Error  data:', error);
          return reject(error);
        } else {
          console.log('Read dashboard_Read_report successfully');
          resolve(results);
        }
      },
    );
  });
}
// dashboard
async function dashboard() {
  const unique_id = uuidv4();
  const pool = mysql.createPool(config);
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT
        MAX(student_id) AS max_id,
        'student' AS TYPE
      FROM
        biographical_student
      UNION
      SELECT
        MAX(teacher_id) AS max_id,
        'teacher' AS TYPE
      FROM
        biographical_teacher
      UNION
      SELECT
        MAX(news_id) AS max_id,
        'news' AS TYPE
      FROM
        newspaper
      `,
      function (error, results) {
        if (error) {
          console.error('Error  data:', error);
          return reject(error);
        } else {
          console.log('Read Dash - board successfully');
          resolve(results);
        }
      },
    );
  });
}

module.exports.dashboard = {
  dashboard: dashboard,
  dashboard_Read_report: dashboard_Read_report,
};
