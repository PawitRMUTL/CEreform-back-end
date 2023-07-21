"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/** @format */
var hapi = require('@hapi/hapi'); //const H2o2 = require('@hapi/h2o2');


var AuthBearer = require('hapi-auth-bearer-token');

var express = require('express');

var multer = require('multer');

var cors = require('cors');

var AgentStatus = require('./respository/AgentStatus');

var Inbound = require('./respository/Inbound');

var Outbound = require('./respository/Outbound');

var OnlineAgent = require('./respository/OnlineAgent');

var Satisfaction = require('./respository/Satisfaction'); //---------------- Portal --------------------------------


var Login = require('./respository/Portal/backend_login');

var upload = require('./respository/Portal/uploadfile');

var from = require('./respository/Portal/Fromcontent');

var env = require('./env.js'); //---------------- Websocket -----------------------------


var hapiPort = 3200;
var webSocketPort = 3201;
var webPort = 3280; //---------------- COOKIE --------------------------------

var cookie = require('cookie-parser');

var url = require('url');

var _require = require('console'),
    log = _require.log; //init Express


var app = express(); //init Express Router

var router = express.Router(); // use cors

var corsOptions = {
  origin: '*'
};
app.use(cors(corsOptions)); //REST route for GET /status

router.get('/status', function (req, res) {
  res.json({
    status: 'App is running!'
  });
}); //connect path to router

app.use('/', router); //use cookieParser

app.use(cookie()); //use file with express
// app.use(fileupload());
// app.use(express.static('files'));
//add middleware for static content

app.use(express["static"]('static'));
var webserver = app.listen(webPort, function () {
  console.log('Websockets listening on port: ' + webSocketPort);
  console.log('Webserver running on port: ' + webPort);
}); //var env = process.env.NODE_ENV || 'development';
//var env = process.env.NODE_ENV || 'production';

console.log('Running Environment: ' + env);

var init = function init() {
  var server;
  return regeneratorRuntime.async(function init$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          server = hapi.Server({
            port: hapiPort,
            host: '0.0.0.0',
            routes: {
              cors: true
            }
          }); // API TEST CONFIG

          server.route({
            method: 'GET',
            path: '/api/v1/',
            handler: function handler() {
              return '<h3> Welcome to CE Reform API V1.0.0</h3>';
            }
          }); // API  TEST !! GET
          // server.route({
          //   method: 'GET',
          //   path: '/api/authentication',
          //   handler: async function (request, reply) {
          //     var param = request.query;
          //     const { username, password } = param;
          //     try {
          //       const responsedata = await Login.authentication.authentication(
          //         username,
          //         password
          //       );
          //       if (responsedata.error) {
          //         return responsedata.errMessage;
          //       } else {
          //         return responsedata;
          //       }
          //     } catch (err) {
          //       server.log(['error', 'home'], err);
          //       return err;
          //     }
          //   },
          // });
          // API SENT FROM LOGIN !!POST

          server.route({
            method: 'POST',
            path: '/api/authentication',
            config: {
              payload: {
                multipart: true
              },
              cors: {
                origin: ['*'],
                additionalHeaders: ['cache-control', 'x-requested-width']
              }
            },
            handler: function handler(request, reply) {
              var _request$payload, username, password, responsedata;

              return regeneratorRuntime.async(function handler$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.prev = 0;
                      _request$payload = request.payload, username = _request$payload.username, password = _request$payload.password;
                      _context.next = 4;
                      return regeneratorRuntime.awrap(Login.authentication.authentication(username, password));

                    case 4:
                      responsedata = _context.sent;

                      if (!responsedata.error) {
                        _context.next = 9;
                        break;
                      }

                      return _context.abrupt("return", responsedata.errMessage);

                    case 9:
                      return _context.abrupt("return", responsedata);

                    case 10:
                      _context.next = 16;
                      break;

                    case 12:
                      _context.prev = 12;
                      _context.t0 = _context["catch"](0);
                      server.log(['error', 'home'], _context.t0);
                      return _context.abrupt("return", _context.t0);

                    case 16:
                    case "end":
                      return _context.stop();
                  }
                }
              }, null, null, [[0, 12]]);
            }
          }); // API VERIFY TOKEN JWT !! POST

          server.route({
            method: 'POST',
            path: '/api/verify_authen',
            config: {
              payload: {
                multipart: true
              },
              cors: {
                origin: ['*'],
                additionalHeaders: ['cache-control', 'x-requested-width']
              }
            },
            handler: function handler(request, reply) {
              var _request$payload2, token, tokenRole, responsedata;

              return regeneratorRuntime.async(function handler$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      _context2.prev = 0;
                      _request$payload2 = request.payload, token = _request$payload2.token, tokenRole = _request$payload2.tokenRole;
                      _context2.next = 4;
                      return regeneratorRuntime.awrap(Login.authentication.verifyauthentication(token, tokenRole));

                    case 4:
                      responsedata = _context2.sent;
                      return _context2.abrupt("return", responsedata);

                    case 8:
                      _context2.prev = 8;
                      _context2.t0 = _context2["catch"](0);
                      server.log(['error', 'home'], _context2.t0);
                      return _context2.abrupt("return", _context2.t0);

                    case 12:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, null, null, [[0, 8]]);
            }
          }); //API upload file pdf

          server.route({
            method: 'POST',
            path: '/api/uploadfilePDF',
            config: {
              payload: {
                multipart: true,
                parse: true,
                output: 'stream',
                allow: ['multipart/form-data', 'application/pdf'],
                // Specify the allowed content type for the request
                maxBytes: 10 * 1024 * 1024 // Set a maximum file size (optional)

              },
              cors: {
                origin: ['*'],
                additionalHeaders: ['cache-control', 'x-requested-width']
              }
            },
            handler: function handler(request, reply) {
              var file, owner, year, type, milliseconds, fileName, filePath, fs, fileStream, responsedata;
              return regeneratorRuntime.async(function handler$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      _context3.prev = 0;
                      file = request.payload['pdf-file'];
                      owner = request.payload['owner'];
                      year = request.payload['year'];
                      type = request.payload['type'];
                      milliseconds = new Date().getTime();
                      fileName = file.hapi.filename;
                      filePath = "../Documenets/".concat(milliseconds, "-").concat(fileName); // Save the file to disk

                      fs = require('fs');
                      fileStream = fs.createWriteStream(filePath);
                      _context3.next = 12;
                      return regeneratorRuntime.awrap(new Promise(function (resolve, reject) {
                        file.on('error', function (err) {
                          reject(err);
                        });
                        file.pipe(fileStream);
                        file.on('end', function () {
                          resolve();
                        });
                      }));

                    case 12:
                      _context3.next = 14;
                      return regeneratorRuntime.awrap(upload.uploadfile.upload_pdf(fileName, milliseconds, owner, year, type));

                    case 14:
                      responsedata = _context3.sent;

                      if (!responsedata.error) {
                        _context3.next = 19;
                        break;
                      }

                      return _context3.abrupt("return", responsedata.errMessage);

                    case 19:
                      return _context3.abrupt("return", responsedata);

                    case 20:
                      _context3.next = 26;
                      break;

                    case 22:
                      _context3.prev = 22;
                      _context3.t0 = _context3["catch"](0);
                      server.log(['error', 'home'], _context3.t0);
                      throw _context3.t0;

                    case 26:
                    case "end":
                      return _context3.stop();
                  }
                }
              }, null, null, [[0, 22]]);
            }
          }); //API GetfilePDF

          server.route({
            method: 'GET',
            path: '/api/GetfilePFD',
            handler: function handler(reply) {
              var responseData;
              return regeneratorRuntime.async(function handler$(_context4) {
                while (1) {
                  switch (_context4.prev = _context4.next) {
                    case 0:
                      _context4.prev = 0;
                      _context4.next = 3;
                      return regeneratorRuntime.awrap(upload.uploadfile.read_file());

                    case 3:
                      responseData = _context4.sent;

                      if (!responseData.error) {
                        _context4.next = 8;
                        break;
                      }

                      return _context4.abrupt("return", responseData.errMessage);

                    case 8:
                      return _context4.abrupt("return", responseData);

                    case 9:
                      _context4.next = 15;
                      break;

                    case 11:
                      _context4.prev = 11;
                      _context4.t0 = _context4["catch"](0);
                      server.log(['error', 'home'], err);
                      throw err;

                    case 15:
                    case "end":
                      return _context4.stop();
                  }
                }
              }, null, null, [[0, 11]]);
            }
          }); //API allPost

          server.route({
            method: 'GET',
            path: '/api/allPost',
            handler: function handler() {
              var _ref, _ref2, rows;

              return regeneratorRuntime.async(function handler$(_context5) {
                while (1) {
                  switch (_context5.prev = _context5.next) {
                    case 0:
                      _context5.prev = 0;
                      _context5.next = 3;
                      return regeneratorRuntime.awrap(from.Post.allPost());

                    case 3:
                      _ref = _context5.sent;
                      _ref2 = _slicedToArray(_ref, 1);
                      rows = _ref2[0];
                      return _context5.abrupt("return", res.json({
                        success: true,
                        listall: rows
                      }));

                    case 9:
                      _context5.prev = 9;
                      _context5.t0 = _context5["catch"](0);
                      server.log(['error', 'home'], err);
                      throw err;

                    case 13:
                    case "end":
                      return _context5.stop();
                  }
                }
              }, null, null, [[0, 9]]);
            }
          }); // API uploadmutipleimage max 4 form front-end

          server.route({
            method: 'POST',
            path: '/api/uploadimageNew',
            config: {
              payload: {
                multipart: true,
                parse: true,
                output: 'stream',
                allow: ['multipart/form-data', 'application/pdf'],
                // Specify the allowed content type for the request
                maxBytes: 10 * 1024 * 1024 // Set a maximum file size (optional)

              },
              cors: {
                origin: ['*'],
                additionalHeaders: ['cache-control', 'x-requested-width']
              }
            },
            handler: function handler(request, h) {
              var fs, responsedata, ownerid, _i2, _Object$entries, _Object$entries$_i, fieldname, file, filename, data;

              return regeneratorRuntime.async(function handler$(_context6) {
                while (1) {
                  switch (_context6.prev = _context6.next) {
                    case 0:
                      _context6.prev = 0;
                      fs = require('fs');
                      responsedata = [null];
                      ownerid = request.payload['id_owner ']; // console.log('Payload:', request.payload);

                      for (_i2 = 0, _Object$entries = Object.entries(request.payload); _i2 < _Object$entries.length; _i2++) {
                        _Object$entries$_i = _slicedToArray(_Object$entries[_i2], 2), fieldname = _Object$entries$_i[0], file = _Object$entries$_i[1];

                        if (file && file.hapi && file.hapi.filename) {
                          filename = file.hapi.filename;
                          data = file._data; // console.log('filename:', filename, 'data length:', data.length);

                          responsedata = upload.uploadfile.upload_image(data, filename, ownerid);
                        } else {
                          console.log('Invalid file object:', file);
                        }
                      } // Return a response after successful image upload


                      return _context6.abrupt("return", h.response('Images uploaded and inserted into the database successfully.'));

                    case 8:
                      _context6.prev = 8;
                      _context6.t0 = _context6["catch"](0);
                      server.log(['error', 'home'], _context6.t0);
                      throw _context6.t0;

                    case 12:
                    case "end":
                      return _context6.stop();
                  }
                }
              }, null, null, [[0, 8]]);
            }
          }); //API GetfilePDF

          server.route({
            method: 'GET',
            path: '/api/GetNewlist',
            handler: function handler(reply) {
              var responseData;
              return regeneratorRuntime.async(function handler$(_context7) {
                while (1) {
                  switch (_context7.prev = _context7.next) {
                    case 0:
                      _context7.prev = 0;
                      _context7.next = 3;
                      return regeneratorRuntime.awrap(upload.uploadfile.read_Newlist());

                    case 3:
                      responseData = _context7.sent;

                      if (!responseData.error) {
                        _context7.next = 8;
                        break;
                      }

                      return _context7.abrupt("return", responseData.errMessage);

                    case 8:
                      return _context7.abrupt("return", responseData);

                    case 9:
                      _context7.next = 15;
                      break;

                    case 11:
                      _context7.prev = 11;
                      _context7.t0 = _context7["catch"](0);
                      server.log(['error', 'home'], err);
                      throw err;

                    case 15:
                    case "end":
                      return _context7.stop();
                  }
                }
              }, null, null, [[0, 11]]);
            }
          }); // API READ IMAGE

          server.route({
            method: 'GET',
            path: '/api/Readimagenew',
            handler: function handler(request, h) {
              var responseData;
              return regeneratorRuntime.async(function handler$(_context8) {
                while (1) {
                  switch (_context8.prev = _context8.next) {
                    case 0:
                      _context8.prev = 0;
                      _context8.next = 3;
                      return regeneratorRuntime.awrap(upload.uploadfile.read_imagelist());

                    case 3:
                      responseData = _context8.sent;

                      if (!responseData.error) {
                        _context8.next = 8;
                        break;
                      }

                      return _context8.abrupt("return", responseData.errMessage);

                    case 8:
                      return _context8.abrupt("return", responseData);

                    case 9:
                      _context8.next = 15;
                      break;

                    case 11:
                      _context8.prev = 11;
                      _context8.t0 = _context8["catch"](0);
                      console.error('Error reading image from the database:', _context8.t0);
                      throw _context8.t0;

                    case 15:
                    case "end":
                      return _context8.stop();
                  }
                }
              }, null, null, [[0, 11]]);
            }
          });
          _context9.next = 12;
          return regeneratorRuntime.awrap(server.start());

        case 12:
          console.log('Server running on %s', server.info.uri);

        case 13:
        case "end":
          return _context9.stop();
      }
    }
  });
};

process.on('unhandledRejection', function (err) {
  console.log(err);
  process.exit(1);
});
init(); //--- Schedule setAvgWaitingTime API Call every 15 minutes -----
// var schedule = require('node-schedule');
// var request = require('request');
// var serverUrl = 'http://localhost:3200/api';
// schedule.scheduleJob('*/15 * * * *', function () {
//     var options = {
//         url: serverUrl + '/setavgwaitingtime',
//         /*
//         headers: {
//             'X-Parse-Application-Id': appID,
//             'X-Parse-Master-Key': masterKey,
//             'Content-Type': 'application/json'
//         }
//         */
//     };
//     request.post(options, function (error, response, body) {
//         if (!error && response.statusCode == 200) {
//             //console.log(body);
//             console.log("Call setAvgWaitingTime API OK!!");
//         } else
//             console.log("Call setAvgWaitingTime API ERROR!!");
//     });
// });
//-----------------------