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

async function authentication(username, password) {
  var Query;
  var pool = mysql.createPool(config);
  return new Promise((resolve, reject) => {
    Query = `SELECT * FROM student WHERE username = '${username}' AND password = '${password}' `;
    console.log('Query1 is: ', Query);
    pool.query(Query, function (error, results) {
      // if (error) throw error;
      if (results.length > 0) {
        const userRole = results[0].role;
        // token มีเวลา 1 ชั่วโมง
        var token = jwt.sign(
          { data: username, iat: Math.floor(Date.now() / 1000) - 30 },
          'jwt_secret'
        );
        console.log('token : '+token);
        var tokenRole = jwt.sign(
          { dataRole: userRole, iat: Math.floor(Date.now() / 1000) - 30 },
          'jwt_secret_role'
        );
        pool.end();
        return resolve({
          statusCode: 200,
          returnCode: 1,
          jwt: token,
          jwtUser: tokenRole,
          message: 'login suecssfully',
        });
      } else {
        pool.end();
        return resolve({
          statusCode: 404,
          returnCode: 11,
          message: 'user not found',
        });
      }
    });
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
      console.log('role : ' + role);
    });
    return {
      message: 'Authen current !!',
      returnCode: '1',
      User: username,
      stateRole: role,
    };
  } catch (err) {
    return { message: 'Authen incurrent !!', returnCode: '0' };
  }
}

module.exports.authentication = {
  authentication: authentication,
  verifyauthentication: verifyauthentication,
};
