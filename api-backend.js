/** @format */

const hapi = require('@hapi/hapi');
//const H2o2 = require('@hapi/h2o2');
const AuthBearer = require('hapi-auth-bearer-token');
var express = require('express');
const multer = require('multer');
const cors = require('cors');

// const AgentStatus = require('./respository/AgentStatus');
// const Inbound = require('./respository/Inbound');
// const Outbound = require('./respository/Outbound');
// const OnlineAgent = require('./respository/OnlineAgent');
// const Satisfaction = require('./respository/Satisfaction');

//---------------- Portal --------------------------------
const Login = require('./respository/Portal/backend_login');
const upload = require('./respository/Portal/uploadfile');
const teacher = require('./respository/Portal/teacher');
const student = require('./respository/Portal/Student');
// --------------- env -----------------------------------
const env = require('./env.js');
//---------------- Websocket -----------------------------
const hapiPort = 3200;
const webSocketPort = 3201;
const webPort = 3280;

//---------------- COOKIE --------------------------------
const cookie = require('cookie-parser');
var url = require('url');
const { log } = require('console');

//init Express
var app = express();
//init Express Router
var router = express.Router();
// use cors
const corsOptions = {
  origin: '*',
};

app.use(cors(corsOptions));
//REST route for GET /status
router.get('/status', function (req, res) {
  res.json({
    status: 'App is running!',
  });
});

//connect path to router
app.use('/', router);

//use cookieParser
app.use(cookie());

//use file with express
// app.use(fileupload());
// app.use(express.static('files'));

//add middleware for static content
app.use(express.static('static'));
var webserver = app.listen(webPort, function () {
  console.log('Websockets listening on port: ' + webSocketPort);
  console.log('Webserver running on port: ' + webPort);
});

//var env = process.env.NODE_ENV || 'development';
//var env = process.env.NODE_ENV || 'production';

console.log('Running Environment: ' + env);

const init = async () => {
  const server = hapi.Server({
    port: hapiPort,
    host: '0.0.0.0',
    routes: {
      cors: true,
    },
  });
  // API TEST CONFIG
  server.route({
    method: 'GET',
    path: '/api/v1/',
    handler: () => {
      return '<h3> Welcome to CE Reform API V1.0.0</h3>';
    },
  });
  // API UpdateTeacher_education !! POST TEACHER
  server.route({
    method: 'POST',
    path: '/api/UpdateTeacher_education',
    config: {
      payload: {
        multipart: true,
      },
      cors: {
        origin: ['*'],
        additionalHeaders: ['cache-control', 'x-requested-width'],
      },
    },
    handler: async function (request, reply) {
      try {
        const {
          IDowner,
          IDBachelor,
          IDMaster,
          IDDocter,
          // Bachelor
          BachelorCuriculum,
          BachelorMajor,
          BachelorYear,
          BachelorUniversity,
          // Master
          MasterCuriculum,
          MasterMajor,
          MasterYear,
          MasterUniversity,
          // Doctor
          DoctorCuriculum,
          DoctorMajor,
          DoctorYear,
          DoctorUniversity,
        } = request.payload;

        const responsedata =
          await teacher.teacher_detaill.Update_teacher_edutcation(
            IDowner,
            IDBachelor,
            IDMaster,
            IDDocter,
            // Bachelor
            BachelorCuriculum,
            BachelorMajor,
            BachelorYear,
            BachelorUniversity,
            // Master
            MasterCuriculum,
            MasterMajor,
            MasterYear,
            MasterUniversity,
            // Doctor
            DoctorCuriculum,
            DoctorMajor,
            DoctorYear,
            DoctorUniversity,
          );
        if (responsedata.error) {
          return responsedata.errMessage;
        } else {
          return responsedata;
        }
      } catch (err) {
        server.log(['error', 'home'], err);
        return err;
      }
    },
  });
  // API UpdateTeacherSubject !!POST TEACHER
  server.route({
    method: 'POST',
    path: '/api/UpdateTeacherSubject',
    config: {
      payload: {
        multipart: true,
      },
      cors: {
        origin: ['*'],
        additionalHeaders: ['cache-control', 'x-requested-width'],
      },
    },
    handler: async function (request, reply) {
      try {
        const {
          id,
          Subjectteach1,
          Subjectteach2,
          Subjectteach3,
          Subjectteach4,
          Subjectteach5,
        } = request.payload;

        const responsedata =
          await teacher.teacher_detaill.Update_teacher_subject(
            id,
            Subjectteach1,
            Subjectteach2,
            Subjectteach3,
            Subjectteach4,
            Subjectteach5,
          );
        if (responsedata.error) {
          return responsedata.errMessage;
        } else {
          return responsedata;
        }
      } catch (err) {
        server.log(['error', 'home'], err);
        return err;
      }
    },
  });
  // API UpdateTeacher !!POST TEACHER
  server.route({
    method: 'POST',
    path: '/api/UpdateTeacher',
    config: {
      payload: {
        multipart: true,
      },
      cors: {
        origin: ['*'],
        additionalHeaders: ['cache-control', 'x-requested-width'],
      },
    },
    handler: async function (request, reply) {
      try {
        const {
          id,
          prefix,
          date,
          firstname,
          lastname,
          idrmutl,
          email,
          religion,
          nationality,
          phone,
        } = request.payload;
        const responsedata = await teacher.teacher_detaill.Update_teacher(
          id,
          prefix,
          date,
          firstname,
          lastname,
          idrmutl,
          email,
          religion,
          nationality,
          phone,
        );
        if (responsedata.error) {
          return responsedata.errMessage;
        } else {
          return responsedata;
        }
      } catch (err) {
        server.log(['error', 'home'], err);
        return err;
      }
    },
  });
  // API UPDATE !!POST STUDENT
  server.route({
    method: 'POST',
    path: '/api/UpdateStudent',
    config: {
      payload: {
        multipart: true,
      },
      cors: {
        origin: ['*'],
        additionalHeaders: ['cache-control', 'x-requested-width'],
      },
    },
    handler: async function (request, reply) {
      try {
        const { id, email, date, nationality, religion } = request.payload;

        const responsedata = await student.student.Update_student(
          id,
          email,
          date,
          nationality,
          religion,
        );
        if (responsedata.error) {
          return responsedata.errMessage;
        } else {
          // console.log(responsedata.jwt);
          return responsedata;
        }
      } catch (err) {
        server.log(['error', 'home'], err);
        return err;
      }
    },
  });
  // API SENT FROM LOGIN !!POST STUDENT
  server.route({
    method: 'POST',
    path: '/api/authentication',
    config: {
      payload: {
        multipart: true,
      },
      cors: {
        origin: ['*'],
        additionalHeaders: ['cache-control', 'x-requested-width'],
      },
    },
    handler: async function (request, reply) {
      try {
        const { username, password } = request.payload;
        const responsedata = await Login.authentication.authentication(
          username,
          password,
        );
        if (responsedata.error) {
          return responsedata.errMessage;
        } else {
          // console.log(responsedata.jwt);
          return responsedata;
        }
      } catch (err) {
        server.log(['error', 'home'], err);
        return err;
      }
    },
  });
  // API SENT FROM LOGIN !!POST TEACHER
  server.route({
    method: 'POST',
    path: '/api/authenticationTEA-CHER',
    config: {
      payload: {
        multipart: true,
      },
      cors: {
        origin: ['*'],
        additionalHeaders: ['cache-control', 'x-requested-width'],
      },
    },
    handler: async function (request, reply) {
      try {
        const { username, password } = request.payload;
        const responsedata = await Login.authentication.authenticationteacher(
          username,
          password,
        );
        if (responsedata.error) {
          return responsedata.errMessage;
        } else {
          // console.log(responsedata.jwt);
          return responsedata;
        }
      } catch (err) {
        server.log(['error', 'home'], err);
        return err;
      }
    },
  });
  // API VERIFY TOKEN JWT !! POST
  server.route({
    method: 'POST',
    path: '/api/verify_authen',
    config: {
      payload: {
        multipart: true,
      },
      cors: {
        origin: ['*'],
        additionalHeaders: ['cache-control', 'x-requested-width'],
      },
    },
    handler: async function (request, reply) {
      try {
        const { token, tokenRole } = request.payload;
        const responsedata = await Login.authentication.verifyauthentication(
          token,
          tokenRole,
        );
        return responsedata;
      } catch (err) {
        server.log(['error', 'home'], err);
        return err;
      }
    },
  });
  // API READ firstname student POST
  server.route({
    method: 'POST',
    path: '/api/ReadStudent',
    config: {
      payload: {
        multipart: true,
      },
      cors: {
        origin: ['*'],
        additionalHeaders: ['cache-control', 'x-requested-width'],
      },
    },
    handler: async function (request, reply) {
      try {
        const { username } = request.payload;
        const responsedata =
          await Login.authentication.Read_Frist_StudentByUsername(username);
        if (responsedata.error) {
          return responsedata.errMessage;
        } else {
          // console.log(responsedata.jwt);
          return responsedata;
        }
      } catch (err) {
        server.log(['error', 'home'], err);
        return err;
      }
    },
  });
  // API READ firstname teacher POST
  server.route({
    method: 'POST',
    path: '/api/ReadTeacher',
    config: {
      payload: {
        multipart: true,
      },
      cors: {
        origin: ['*'],
        additionalHeaders: ['cache-control', 'x-requested-width'],
      },
    },
    handler: async function (request, reply) {
      try {
        const { username } = request.payload;
        const responsedata =
          await Login.authentication.Read_Frist_teacherByUsername(username);
        if (responsedata.error) {
          return responsedata.errMessage;
        } else {
          // console.log(responsedata.jwt);
          return responsedata;
        }
      } catch (err) {
        server.log(['error', 'home'], err);
        return err;
      }
    },
  });
  // API READ STUDENT WHERE RMUTL ID
  server.route({
    method: 'POST',
    path: '/api/ReadStudentByUsername',
    config: {
      payload: {
        multipart: true,
      },
      cors: {
        origin: ['*'],
        additionalHeaders: ['cache-control', 'x-requested-width'],
      },
    },
    handler: async function (request, reply) {
      try {
        const { username } = request.payload;
        const responsedata = await student.student.ReadStudentByUsername(
          username,
        );
        if (responsedata.error) {
          return responsedata.errMessage;
        } else {
          // console.log(responsedata.jwt);
          return responsedata;
        }
      } catch (err) {
        server.log(['error', 'home'], err);
        return err;
      }
    },
  });
  // API READ TEACHER WHERE RMUTL ID
  server.route({
    method: 'POST',
    path: '/api/ReadTeacherByEmail',
    config: {
      payload: {
        multipart: true,
      },
      cors: {
        origin: ['*'],
        additionalHeaders: ['cache-control', 'x-requested-width'],
      },
    },
    handler: async function (request, reply) {
      try {
        const { email } = request.payload;
        const responsedata = await teacher.teacher_detaill.thecher_listByEmail(
          email,
        );
        if (responsedata.error) {
          return responsedata.errMessage;
        } else {
          // console.log(responsedata);
          return responsedata;
        }
      } catch (err) {
        server.log(['error', 'home'], err);
        return err;
      }
    },
  });
  // API READ EDUCATE TEACHER WHERE Id
  server.route({
    method: 'POST',
    path: '/api/ReadEducateTeacherById',
    config: {
      payload: {
        multipart: true,
      },
      cors: {
        origin: ['*'],
        additionalHeaders: ['cache-control', 'x-requested-width'],
      },
    },
    handler: async function (request, reply) {
      try {
        const { id } = request.payload;
        const responsedata =
          await teacher.teacher_detaill.ReadEducateTeacherById(id);
        if (responsedata.error) {
          return responsedata.errMessage;
        } else {
          // console.log(responsedata);
          return responsedata;
        }
      } catch (err) {
        server.log(['error', 'home'], err);
        return err;
      }
    },
  });
  //API upload file pdf
  server.route({
    method: 'POST',
    path: '/api/uploadfilePDF',
    config: {
      payload: {
        multipart: true,
        parse: true,
        output: 'stream',
        allow: ['multipart/form-data', 'application/pdf'], // Specify the allowed content type for the request
        maxBytes: 10 * 1024 * 1024, // Set a maximum file size (optional)
      },
      cors: {
        origin: ['*'],
        additionalHeaders: ['cache-control', 'x-requested-width'],
      },
    },
    handler: async function (request, reply) {
      try {
        const file = request.payload['pdf-file'];
        const owner = request.payload['owner'];
        const year = request.payload['year'];
        const type = request.payload['type'];
        const milliseconds = new Date().getTime();
        const fileName = file.hapi.filename;
        const filePath = `../Documenets/${milliseconds}-${fileName}`;

        // Save the file to disk
        const fs = require('fs');
        const fileStream = fs.createWriteStream(filePath);
        await new Promise((resolve, reject) => {
          file.on('error', (err) => {
            reject(err);
          });
          file.pipe(fileStream);
          file.on('end', () => {
            resolve();
          });
        });
        const responsedata = await upload.uploadfile.upload_pdf(
          fileName,
          milliseconds,
          owner,
          year,
          type,
        );

        if (responsedata.error) {
          return responsedata.errMessage;
        } else {
          return responsedata;
        }
      } catch (err) {
        server.log(['error', 'home'], err);
        throw err; // Throw the error to indicate a failure
      }
    },
  });
  //API GetfilePDF
  server.route({
    method: 'GET',
    path: '/api/GetfilePFD',
    handler: async function (reply) {
      try {
        const responseData = await upload.uploadfile.read_file();
        if (responseData.error) {
          return responseData.errMessage;
        } else {
          return responseData;
        }
      } catch (error) {
        server.log(['error', 'home'], err);
        throw err; // Throw the error to indicate a failure
      }
    },
  });
  // API uploadimageTeacher
  server.route({
    method: 'POST',
    path: '/api/uploadimageTeacher',
    config: {
      payload: {
        multipart: true,
        parse: true,
        output: 'stream',
        allow: ['multipart/form-data', 'application/pdf'], // Specify the allowed content type for the request
        maxBytes: 10 * 1024 * 1024, // Set a maximum file size (optional)
      },
      cors: {
        origin: ['*'],
        additionalHeaders: ['cache-control', 'x-requested-width'],
      },
    },
    handler: async function (request, h) {
      try {
        const fs = require('fs');
        let responsedata = [null];
        const ownerid = request.payload['owner'];
        // console.log('ownerid:', ownerid);
        for (const [fieldname, file] of Object.entries(request.payload)) {
          if (file && file.hapi && file.hapi.filename) {
            const filename = file.hapi.filename;
            const data = file._data;
            // Save the image file to disk (you can choose your desired destination)
            const destinationPath = `/Users/baconinhell/Desktop/dandelion-pro_v25/starter-project/image/teacher/${filename}`;
            const fileStream = fs.createWriteStream(destinationPath);
            fileStream.write(data);
            fileStream.end();
            responsedata = upload.uploadfile.upload_image_tea_profile(
              filename,
              ownerid,
            );
          } else {
            console.log('Invalid file object:', file);
          }
        }
        // Return a response after successful image upload
        return h.response(
          'Images uploaded and inserted into the database successfully.',
        );
      } catch (err) {
        server.log(['error', 'home'], err);
        throw err; // Throw the error to indicate a failure
      }
    },
  });
  // API uploadimageStudent
  server.route({
    method: 'POST',
    path: '/api/uploadimageStudent',
    config: {
      payload: {
        multipart: true,
        parse: true,
        output: 'stream',
        allow: ['multipart/form-data', 'application/pdf'], // Specify the allowed content type for the request
        maxBytes: 10 * 1024 * 1024, // Set a maximum file size (optional)
      },
      cors: {
        origin: ['*'],
        additionalHeaders: ['cache-control', 'x-requested-width'],
      },
    },
    handler: async function (request, h) {
      try {
        const fs = require('fs');
        let responsedata = [null];
        const ownerid = request.payload['owner'];
        // console.log('Payload:', request.payload);
        for (const [fieldname, file] of Object.entries(request.payload)) {
          if (file && file.hapi && file.hapi.filename) {
            const filename = file.hapi.filename;
            const data = file._data;
            // Save the image file to disk (you can choose your desired destination)
            const destinationPath = `/Users/baconinhell/Desktop/dandelion-pro_v25/starter-project/image/student/${filename}`;
            const fileStream = fs.createWriteStream(destinationPath);
            fileStream.write(data);
            fileStream.end();

            responsedata = upload.uploadfile.upload_image_stu_profile(
              filename,
              ownerid,
            );
          } else {
            console.log('Invalid file object:', file);
          }
        }
        // Return a response after successful image upload
        return h.response(
          'Images uploaded and inserted into the database successfully.',
        );
      } catch (err) {
        server.log(['error', 'home'], err);
        throw err; // Throw the error to indicate a failure
      }
    },
  });
  // API uploadmutipleimage max 4 form front-end
  server.route({
    method: 'POST',
    path: '/api/uploadimageNew',
    config: {
      payload: {
        multipart: true,
        parse: true,
        output: 'stream',
        allow: ['multipart/form-data', 'application/pdf'], // Specify the allowed content type for the request
        maxBytes: 10 * 1024 * 1024, // Set a maximum file size (optional)
      },
      cors: {
        origin: ['*'],
        additionalHeaders: ['cache-control', 'x-requested-width'],
      },
    },
    handler: async function (request, h) {
      try {
        const fs = require('fs');
        let responsedata = [null];
        const ownerid = request.payload['id_owner '];
        // console.log('Payload:', request.payload);
        for (const [fieldname, file] of Object.entries(request.payload)) {
          if (file && file.hapi && file.hapi.filename) {
            const filename = file.hapi.filename;
            const data = file._data;
            // Save the image file to disk (you can choose your desired destination)
            const destinationPath = `/Users/baconinhell/Desktop/dandelion-pro_v25/starter-project/image/ImageNew/${filename}`;
            const fileStream = fs.createWriteStream(destinationPath);
            fileStream.write(data);
            fileStream.end();
            console.log('filename:', filename);
            responsedata = upload.uploadfile.upload_image(filename, ownerid);
          } else {
            console.log('Invalid file object:', file);
          }
        }
        // Return a response after successful image upload
        return h.response(
          'Images uploaded and inserted into the database successfully.',
        );
      } catch (err) {
        server.log(['error', 'home'], err);
        throw err; // Throw the error to indicate a failure
      }
    },
  });

  // API addNewsViewByID
  server.route({
    method: 'POST',
    path: '/api/addNewsViewByID',
    config: {
      payload: {
        multipart: true,
      },
      cors: {
        origin: ['*'],
        additionalHeaders: ['cache-control', 'x-requested-width'],
      },
    },
    handler: async function (request, reply) {
      try {
        const { Id, View } = request.payload;

        const responsedata = await upload.uploadfile.addNewsViewByID(Id, View);
        if (responsedata.error) {
          return responsedata.errMessage;
        } else {
          // console.log(responsedata);
          return responsedata;
        }
      } catch (err) {
        server.log(['error', 'home'], err);
        return err;
      }
    },
  });
  //API GetfilePDF
  server.route({
    method: 'GET',
    path: '/api/GetNewlist',
    handler: async function (reply) {
      try {
        const responseData = await upload.uploadfile.read_Newlist();
        // console.log('responseData is ', responseData);

        if (responseData.error) {
          return responseData.errMessage;
        } else {
          return responseData;
        }
      } catch (error) {
        server.log(['error', 'home'], err);
        throw err; // Throw the error to indicate a failure
      }
    },
  });
  // API READ IMAGE
  server.route({
    method: 'GET',
    path: '/api/Readimagenew',

    handler: async function (request, h) {
      try {
        const responseData = await upload.uploadfile.read_imagelist(); // Use 'uploadfile' instead of 'upload.uploadfile'
        if (responseData.error) {
          return responseData.errMessage;
        } else {
          return responseData;
        }
      } catch (err) {
        console.error('Error reading image from the database:', err);
        throw err;
      }
    },
  });
  //API UPDATE IMAGE
  server.route({
    method: 'POST',
    path: '/api/Updateimage',
    config: {
      payload: {
        multipart: true,
        parse: true,
        output: 'stream',
        allow: ['multipart/form-data', 'application/pdf'], // Specify the allowed content type for the request
        maxBytes: 10 * 1024 * 1024, // Set a maximum file size (optional)
      },
      cors: {
        origin: ['*'],
        additionalHeaders: ['cache-control', 'x-requested-width'],
      },
    },
    handler: async function (request, h) {
      try {
        const fs = require('fs');
        let responsedata = [null];
        const ownerid = request.payload['id_owner '];
        // console.log('Payload:', request.payload);
        for (const [fieldname, file] of Object.entries(request.payload)) {
          if (file && file.hapi && file.hapi.filename) {
            const data = file._data;
            responsedata = upload.uploadfile.update_image(data, ownerid);
            console.log('OK !!');
          } else {
            console.log('Invalid file object:', file);
          }
        }
        // Return a response after successful image upload
        return h.response(
          'Images uploaded and inserted into the database successfully.',
        );
      } catch (err) {
        server.log(['error', 'home'], err);
        throw err; // Throw the error to indicate a failure
      }
    },
  });

  //READ NEWS LIST
  server.route({
    method: 'POST',
    path: '/api/listnews_detail',
    config: {
      payload: {
        multipart: true,
      },
      cors: {
        origin: ['*'],
        additionalHeaders: ['cache-control', 'x-requested-width'],
      },
    },
    handler: async function (request, reply) {
      try {
        const { id } = request.payload;
        const responsedata = await upload.uploadfile.read_NewDetaill(id);
        return responsedata;
      } catch (err) {
        server.log(['error', 'home'], err);
        return err;
      }
    },
  });

  //API GetReadfileimage
  server.route({
    method: 'POST',
    path: '/api/Getimagesnews',
    config: {
      payload: {
        multipart: true,
      },
      cors: {
        origin: ['*'],
        additionalHeaders: ['cache-control', 'x-requested-width'],
      },
    },
    handler: async function (request, reply) {
      try {
        const { id } = request.payload;
        // console.log('id is ', id);
        const responseData = await upload.uploadfile.read_ImageNewlist(id);
        return responseData;
      } catch (err) {
        server.log(['error', 'home'], err);
        return err;
      }
    },
  });
  // API InsertViewNew
  server.route({
    method: 'POST',
    path: '/api/InsertViewNew',
    config: {
      payload: {
        multipart: true,
      },
      cors: {
        origin: ['*'],
        additionalHeaders: ['cache-control', 'x-requested-width'],
      },
    },
    handler: async function (request, reply) {
      try {
        const { valuenew } = request.payload;
        // console.log('id is ', id);
        const responseData = await upload.uploadfile.InsertViewNews(valuenew);
        return responseData;
      } catch (err) {
        server.log(['error', 'home'], err);
        return err;
      }
    },
  });
  //API TEACHER LIST
  server.route({
    method: 'GET',
    path: '/api/Teacher_list',
    handler: async function (reply) {
      try {
        const responseData = await teacher.teacher_detaill.thecher_list();
        if (responseData.error) {
          return responseData.errMessage;
        } else {
          return responseData;
        }
      } catch (error) {
        server.log(['error', 'home'], err);
        throw err; // Throw the error to indicate a failure
      }
    },
  });

  //API ReadTeacher By ID
  server.route({
    method: 'POST',
    path: '/api/ReadTeacherByID',
    config: {
      payload: {
        multipart: true,
      },
      cors: {
        origin: ['*'],
        additionalHeaders: ['cache-control', 'x-requested-width'],
      },
    },
    handler: async function (request, reply) {
      try {
        const { id } = request.payload;
        // console.log('id is ', id);
        const responseData =
          await teacher.teacher_detaill.T_Read_thecher_listById(id);
        return responseData;
      } catch (err) {
        server.log(['error', 'home'], err);
        return err;
      }
    },
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();

//--- Schedule setAvgWaitingTime API Call every 15 minutes -----

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
