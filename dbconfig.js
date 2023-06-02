/** @format */

var dbconfig = {
  development: {
    //connectionLimit : 10,
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'Portal',
  },
  production: {
    //connectionLimit : 10,
    host: '128.199.188.223',
    port: '4406',
    user: 'root',
    //// password: '1q2w3e4rP;;',
    password: '1q2w3e4rP@ssw0rd',
    database: '3cx-buzz',
  },
};
module.exports = dbconfig;
