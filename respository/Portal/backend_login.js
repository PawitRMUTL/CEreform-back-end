/** @format */
var mysql = require('mysql');

//--------------- jwt -----------------
var jwt = require('jsonwebtoken');

//---------------- COOKIE --------------------------------
const cookieParser = require('cookie-parser');

//const uuid = require('uuid/v4');
const { v4: uuidv4 } = require('uuid');
const uuid = uuidv4();
const env = require('../../env.js');
const config = require('../../dbconfig.js')[env];
// API authenticationteacher
async function authenticationteacher(username, password) {
  var Query;
  var pool = mysql.createPool(config);
  return new Promise((resolve, reject) => {
    Query = `SELECT id_rmutl , _email FROM biographical_teacher WHERE _email = '${username}' AND id_rmutl = '${password}' `;
    console.log('Query1 is: ', Query);
    pool.query(Query, function (error, results) {
      if (results[0] !== undefined) {
        console.log('results is', results[0]);
        const userRole = 'อาจารย์';
        var token = jwt.sign(
          { data: username, iat: Math.floor(Date.now() / 1000) - 30 },
          'jwt_secret',
        );
        // console.log('tokenUser : ' + token);
        var tokenRole = jwt.sign(
          { dataRole: userRole, iat: Math.floor(Date.now() / 1000) - 30 },
          'jwt_secret_role',
        );
        // console.log('tokenUserRole : ' + tokenRole);
        pool.end();
        return resolve({
          statusCode: 200,
          returnCode: 1,
          jwt: token,
          jwtRole: tokenRole,
        });
      } else {
        pool.end();
        return resolve({
          statusCode: 404,
          returnCode: 11,
        });
      }
    });
  });
}
// API authen Student
async function authentication(username, password) {
  var Query;
  var pool = mysql.createPool(config);
  return new Promise((resolve, reject) => {
    Query = `SELECT id_rmutl , brithday FROM biographical_student WHERE id_rmutl = '${username}' AND brithday = '${password}' `;
    console.log('Query1 is: ', Query);
    pool.query(Query, function (error, results) {
      if (results[0] !== undefined) {
        console.log('results is', results[0]);
        const userRole = 'นักศึกษา';
        var token = jwt.sign(
          { data: username, iat: Math.floor(Date.now() / 1000) - 30 },
          'jwt_secret',
        );
        // console.log('tokenUser : ' + token);
        var tokenRole = jwt.sign(
          { dataRole: userRole, iat: Math.floor(Date.now() / 1000) - 30 },
          'jwt_secret_role',
        );
        // console.log('tokenUserRole : ' + tokenRole);
        pool.end();
        return resolve({
          statusCode: 200,
          returnCode: 1,
          jwt: token,
          jwtRole: tokenRole,
        });
      } else {
        pool.end();
        return resolve({
          statusCode: 404,
          returnCode: 11,
        });
      }
    });
  });
}
async function Read_Frist_StudentByUsername(username) {
  const unique_id = uuidv4();
  const pool = mysql.createPool(config);
  // console.log('data1 is', data);

  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT first_name FROM biographical_student WHERE id_rmutl = "${username}"`,
      function (error, results) {
        if (error) {
          console.error('Error inserting data:', error);
          return reject(error);
        } else {
          console.log('Read FristName successfully');
          resolve(results);
        }
      },
    );
  });
}
// Read_Frist_teacherByUsername
async function Read_Frist_teacherByUsername(username) {
  const unique_id = uuidv4();
  const pool = mysql.createPool(config);

  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT first_name FROM biographical_teacher WHERE _email = "${username}"`,
      function (error, results) {
        if (error) {
          console.error('Error inserting data:', error);
          return reject(error);
        } else {
          console.log('Read FristName successfully');
          resolve(results);
        }
      },
    );
  });
}
async function verifyauthentication(token, tokenRole) {
  let role;
  let username;
  try {
    jwt.verify(token, 'jwt_secret', function (err, decoded) {
      username = decoded.data;
      console.log('username' + decoded.data);
    });
    jwt.verify(tokenRole, 'jwt_secret_role', function (err, decoded) {
      role = decoded.dataRole;
      // console.log('role : ' + role);
    });
    return {
      returnCode: '1',
      User: username,
      stateRole: role,
    };
  } catch (err) {
    return { message: err, returnCode: '0' };
  }
}

module.exports.authentication = {
  authentication: authentication,
  verifyauthentication: verifyauthentication,
  Read_Frist_StudentByUsername: Read_Frist_StudentByUsername,
  authenticationteacher: authenticationteacher,
  Read_Frist_teacherByUsername: Read_Frist_teacherByUsername,
};
