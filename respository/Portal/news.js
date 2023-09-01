/** @format */
var mysql = require('mysql');

//const uuid = require('uuid/v4');
const { v4: uuidv4 } = require('uuid');
const uuid = uuidv4();
const env = require('../../env.js');
const config = require('../../dbconfig.js')[env];

// Read_news_and_image_Byid
async function Read_news_and_image_Byid(id) {
  const unique_id = uuidv4();
  const pool = mysql.createPool(config);

  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT news_id, news_name, news_date, news_heading, news_content, news_content2, created_by,
		JSON_ARRAYAGG(filename) AS image_filenames
		FROM newspaper
		LEFT JOIN newspaper_image ON newspaper.news_id = newspaper_image.ownerid
		WHERE newspaper.news_id = "${id}"
		GROUP BY news_id, news_name, news_date, news_heading, news_content, news_content2, created_by;
		`,
      function (error, results) {
        if (error) {
          console.error('Error inserting data:', error);
          return reject(error);
        } else {
          console.log('SELECT teacher and image successfully');
          // console.log(resolve);
          resolve(results);
        }
      },
    );
  });
}
// Update News By id
async function Update_news_By_id(
  Newsid,
  Newsname,
  Newsdate,
  Newscontent,
  Newscontent2,
  Newsheading,
  Createby,
) {
  const unique_id = uuidv4();
  const pool = mysql.createPool(config);
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE newspaper SET
		news_name = "${Newsname}",
		news_date = "${Newsdate}",
		news_heading = "${Newsheading}",
		news_content = "${Newscontent}",
		news_content2 = "${Newscontent2}",
		created_by = "${Createby}"
	WHERE news_id = "${Newsid}"`,
      function (error, results) {
        if (error) {
          console.error('Error inserting data:', error);
          return reject(error);
        } else {
          console.log('Update news successfully');
          // console.log(resolve);
          resolve(results);
        }
      },
    );
  });
}

// delete_news_byId
async function delete_news_byId(id) {
  const unique_id = uuidv4();
  const pool = mysql.createPool(config);

  return new Promise((resolve, reject) => {
    pool.query(
      ` UPDATE newspaper  SET isDeleted = '1' WHERE news_id = "${id}"`,
      function (error, results) {
        if (error) {
          console.error('Error inserting data:', error);
          return reject(error);
        } else {
          console.log('SELECT teacher and image successfully');
          // console.log(resolve);
          resolve(results);
        }
      },
    );
  });
}
// Adds_news
async function Adds_news(
  Newsname,
  Newsdate,
  Newscontent,
  Newscontent2,
  Newsheading,
  Createby,
) {
  const unique_id = uuidv4();
  const pool = mysql.createPool(config);
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO newspaper(news_name, news_date, news_heading, news_content, news_content2, created_by , lsedited,isDeleted,view) VALUES('${Newsname}', '${Newsdate}', '${Newsheading}', '${Newscontent}', '${Newscontent2}', '${Createby}' , NOW(),0,'0')`,
      function (error, results) {
        if (error) {
          console.error('Error Adds data:', error);
          return reject(error);
        } else {
          console.log('Adds news successfully');
          // console.log(resolve);
          resolve(results);
        }
      },
    );
  });
}
// ReadNews
async function ReadNews() {
  const unique_id = uuidv4();
  const pool = mysql.createPool(config);
  return new Promise((resolve, reject) => {
    pool.query(
      'SELECT * FROM newspaper WHERE isDeleted = 0',
      function (error, results) {
        if (error) {
          console.error('Error Adds data:', error);
          return reject(error);
        } else {
          console.log('Adds news successfully');
          // console.log(resolve);
          resolve(results);
        }
      },
    );
  });
}
module.exports.news = {
  Read_news_and_image_Byid: Read_news_and_image_Byid,
  Update_news_By_id: Update_news_By_id,
  delete_news_byId: delete_news_byId,
  Adds_news: Adds_news,
  ReadNews: ReadNews,
};
