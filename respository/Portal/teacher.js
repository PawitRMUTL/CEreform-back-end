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
    pool.query('SELECT * FROM biographical_teacher', function (error, results) {
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
// thecher_listByEmail
async function thecher_listByEmail(email) {
  const unique_id = uuidv4();
  const pool = mysql.createPool(config);
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM biographical_teacher WHERE _email = '${email}'`,
      function (error, results) {
        if (error) {
          console.error('Error inserting data:', error);
          return reject(error);
        } else {
          console.log('SELECT teacher_list successfully');
          // console.log(resolve);
          resolve(results);
        }
      },
    );
  });
}
// thecher_listById
async function thecher_listById(id) {
  const unique_id = uuidv4();
  const pool = mysql.createPool(config);

  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM biographical_teacher WHERE teacher_id = ${id}`,
      function (error, results) {
        if (error) {
          console.error('Error inserting data:', error);
          return reject(error);
        } else {
          console.log('SELECT teacher_list successfully');
          // console.log(resolve);
          resolve(results);
        }
      },
    );
  });
}
// ReadEducateTeacherById
async function ReadEducateTeacherById(id) {
  const unique_id = uuidv4();
  const pool = mysql.createPool(config);

  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM education_teacher WHERE owner_id = '${id}' ORDER BY graduates_years DESC `,
      function (error, results) {
        if (error) {
          console.error('Error inserting data:', error);
          return reject(error);
        } else {
          console.log('SELECT Education Teacher successfully');
          // console.log(resolve);
          resolve(results);
        }
      },
    );
  });
}
// T_Read_thecher_listById
async function T_Read_thecher_listById(id) {
  const unique_id = uuidv4();
  const pool = mysql.createPool(config);

  // `SELECT * FROM biographical_teacher INNER JOIN education_teacher ON  biographical_teacher.teacher_id = education_teacher.owner_id
  // INNER JOIN subject_teacher ON   biographical_teacher.teacher_id = subject_teacher.subject_id WHERE biographical_teacher.teacher_id = 1`

  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM biographical_teacher INNER JOIN education_teacher ON  biographical_teacher.teacher_id = education_teacher.owner_id 
  INNER JOIN subject_teacher ON   biographical_teacher.teacher_id = subject_teacher.subject_id  WHERE biographical_teacher.teacher_id = "${id}" ORDER BY education_teacher.graduates_years ASC`,
      function (error, results) {
        if (error) {
          console.error('Error inserting data:', error);
          return reject(error);
        } else {
          console.log('SELECT teacher_list successfully');
          // console.log(resolve);
          resolve(results);
        }
      },
    );
  });
}
module.exports.teacher_detaill = {
  thecher_list: thecher_list,
  thecher_listById: thecher_listById,
  T_Read_thecher_listById: T_Read_thecher_listById,
  thecher_listByEmail: thecher_listByEmail,
  ReadEducateTeacherById: ReadEducateTeacherById,
};
