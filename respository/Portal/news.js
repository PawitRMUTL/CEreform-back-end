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


module.exports.news = {
	Read_news_and_image_Byid:Read_news_and_image_Byid,
};
