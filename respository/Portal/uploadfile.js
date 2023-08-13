/** @format */
var mysql = require('mysql');

//const uuid = require('uuid/v4');
const { v4: uuidv4 } = require('uuid');
const uuid = uuidv4();
const env = require('../../env.js');
const config = require('../../dbconfig.js')[env];

async function upload_pdf(filename, milliseconds, owner, year, type) {
  const unique_id = uuidv4();
  const pool = mysql.createPool(config);

  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO calendar_study (type,file_name , created_at , year,owner) VALUES ("${type}","${milliseconds}-${filename}"  ,NOW(),"${year}","${owner}" )`,
      function (error, results) {
        if (error) {
          console.error('Error inserting data:', error);
          return reject(error);
        } else {
          console.log('Upload successfully');
          resolve(results);
        }
      },
    );
  });
}

async function readfile() {
  var Query;
  const pool = mysql.createPool(config);

  return new Promise((resolve, reject) => {
    Query = 'SELECT * FROM calendar_study';
    console.log('Query is: ', Query);
    pool.query(Query, function (error, results) {
      if (error) {
        console.error('Error retrieving data:', error);
        return reject(error);
      } else {
        console.log('Readfile successful');
        resolve(results);
      }
    });
  });
}
// upload_image_tea_profile
async function upload_image_tea_profile(filename, ownerid) {
  const unique_id = uuidv4();
  const pool = mysql.createPool(config);
  console.log('filename', filename, 'ownerid', ownerid);
  // UPDATE  biographical_teacher SET _image = "${filename}" WHERE first_name = "${ownerid}"
  return new Promise((resolve, reject) => {
    pool.query(
      ` UPDATE  biographical_teacher SET _image = "${filename}" WHERE first_name = "${ownerid}"`,
      function (error, results) {
        if (error) {
          console.error('Error inserting data:', error);
          return reject(error);
        } else {
          console.log('Upload image Teacher successfully');
          // console.log(resolve);
          resolve(results);
        }
      },
    );
  });
}
// upload_image_stu_profile
async function upload_image_stu_profile(filename, ownerid) {
  const unique_id = uuidv4();
  const pool = mysql.createPool(config);
  // UPDATE `biographical_student` SET `image` = 'a' WHERE `biographical_student`.`student_id` = 1;
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE  biographical_student SET image = "${filename}" WHERE id_rmutl = "${ownerid}" `,
      function (error, results) {
        if (error) {
          console.error('Error inserting data:', error);
          return reject(error);
        } else {
          console.log('Upload image Student successfully');
          // console.log(resolve);
          resolve(results);
        }
      },
    );
  });
}
async function upload_image(filename, ownerid) {
  const unique_id = uuidv4();
  const pool = mysql.createPool(config);
  // console.log('data1 is', data);

  return new Promise((resolve, reject) => {
    // Convert the buffer to a Base64 encoded string
    // const dataString = data.toString('base64');
    // console.log('data is ', dataString, 'filename', filename);
    pool.query(
      `INSERT INTO newspaper_image( filename , ownerid) VALUES ("${filename}","${ownerid}")`,
      function (error, results) {
        if (error) {
          console.error('Error inserting data:', error);
          return reject(error);
        } else {
          console.log('Upload image successfully');
          // console.log(resolve);
          resolve(results);
        }
      },
    );
  });
}

async function read_Newlist() {
  var Query, Query2;
  const pool = mysql.createPool(config);

  return new Promise((resolve, reject) => {
    Query = 'SELECT * FROM newspaper';
    Query2 =
      'SELECT * FROM newspaper INNER JOIN newspaper_image ON newspaper.news_id = newspaper_image.ownerid WHERE newspaper_image.imageMain = 1 ';
    console.log('Query is: ', Query2);
    pool.query(Query2, function (error, results) {
      if (error) {
        console.error('Error retrieving data:', error);
        return reject(error);
      } else {
        console.log('ReadNew successful');
        resolve(results);
      }
    });
  });
}

async function read_imagelist() {
  var Query;
  const pool = mysql.createPool(config);

  return new Promise((resolve, reject) => {
    Query = `SELECT data_file FROM newspaper_image  `;
    console.log('Query is: ', Query);
    pool.query(Query, function (error, results) {
      if (error) {
        console.error('Error retrieving data:', error);
        return reject(error);
      } else {
        if (results.length > 0) {
          const imageData = results[8].data_file;
          console.log('ReadIamgeNew successful');
          // console.log(imageData);
          const txt = Buffer.from(imageData, 'base64').toString('ascii');
          resolve(txt);
        } else {
          resolve(null); // Image not found, return null
        }
      }
    });
  });
}
async function update_image(data, ownerid) {
  const unique_id = uuidv4();
  const pool = mysql.createPool(config);
  // console.log('data1 is', data);

  return new Promise((resolve, reject) => {
    const dataString = data.toString('base64');
    pool.query(
      `UPDATE newspaper SET imagetitle = "${dataString}" WHERE news_id = "${ownerid}"`,
      function (error, results) {
        if (error) {
          console.error('Error inserting data:', error);
          return reject(error);
        } else {
          console.log('Upload News_detail successfully');
          // console.log(resolve);
          resolve(results);
        }
      },
    );
  });
}
async function read_NewDetaill(id) {
  const unique_id = uuidv4();
  const pool = mysql.createPool(config);
  // console.log('data1 is', data);

  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM newspaper WHERE news_id = '${id}'`,
      function (error, results) {
        if (error) {
          console.error('Error inserting data:', error);
          return reject(error);
        } else {
          console.log('Read News_detail successfully');
          // console.log(results);
          resolve(results);
        }
      },
    );
  });
}

async function read_ImageNewlist(id) {
  const unique_id = uuidv4();
  const pool = mysql.createPool(config);
  // console.log('data1 is', data);

  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM newspaper_image WHERE ownerid = '${id}'`,
      function (error, results) {
        if (error) {
          console.error('Error inserting data:', error);
          return reject(error);
        } else {
          console.log('Read Image_News successfully');
          // console.log(results);
          resolve(results);
        }
      },
    );
  });
}

async function InsertViewNews(valuenew) {
  const unique_id = uuidv4();
  const pool = mysql.createPool(config);
  // console.log('data1 is', data);

  return new Promise((resolve, reject) => {
    pool.query(
      // `SELECT * FROM newspaper_image WHERE ownerid = '${id}'`,
      function (error, results) {
        if (error) {
          console.error('Error inserting data:', error);
          return reject(error);
        } else {
          console.log('Read Image_News successfully');
          // console.log(results);
          resolve(results);
        }
      },
    );
  });
}

module.exports.uploadfile = {
  read_imagelist: read_imagelist,
  read_Newlist: read_Newlist,
  upload_pdf: upload_pdf,
  read_file: readfile,
  upload_image: upload_image,
  update_image: update_image,
  read_NewDetaill: read_NewDetaill,
  read_ImageNewlist: read_ImageNewlist,
  upload_image_stu_profile: upload_image_stu_profile,
  upload_image_tea_profile: upload_image_tea_profile,
};
