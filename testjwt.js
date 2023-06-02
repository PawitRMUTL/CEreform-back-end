/** @format */

var jwt = require('jsonwebtoken');
// var token = jwt.sign(
//   { data: 'Aunnnnnnh', iat: Math.floor(Date.now() / 1000) + 60 * 60 },
//   'aun'
// );
// console.log(token);
const token2 =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiQSIsImlhdCI6MTY4NDgyOTcyOX0.LSpcnLdtPWgF2E0_xpE0FNtlIu7FuH2HQjLMDvOWwYk';
jwt.verify(token2, 'thanit', function (err, decoded) {
  console.log(decoded.data); // bar
});
