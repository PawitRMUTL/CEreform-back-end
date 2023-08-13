/** @format */
var mysql = require('mysql');

//const uuid = require('uuid/v4');
const { v4: uuidv4 } = require('uuid');
const uuid = uuidv4();
const env = require('../../env.js');
const config = require('../../dbconfig.js')[env];

// Update_teacher_edutcation
async function Update_teacher_edutcation(
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
) {
  const unique_id = uuidv4();
  const pool = mysql.createPool(config);
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE education_teacher
    SET
      subject_eng = CASE
        WHEN teacher_education_id = "${IDBachelor}" THEN "${BachelorMajor}"
        WHEN teacher_education_id = "${IDMaster}" THEN "${MasterMajor}"
        WHEN teacher_education_id = "${IDDocter}" THEN "${DoctorMajor}"
        ELSE subject_eng
      END,
      subject = CASE
        WHEN teacher_education_id = "${IDBachelor}" THEN "${BachelorCuriculum}"
        WHEN teacher_education_id = "${IDMaster}" THEN "${MasterCuriculum}"
        WHEN teacher_education_id = "${IDDocter}" THEN "${DoctorCuriculum}"
        ELSE subject
      END,
      university = CASE
        WHEN teacher_education_id = "${IDBachelor}" THEN "${BachelorUniversity}"
        WHEN teacher_education_id = "${IDMaster}" THEN "${MasterUniversity}"
        WHEN teacher_education_id = "${IDDocter}" THEN "${DoctorUniversity}"
        ELSE university
      END,
      graduates_years = CASE
        WHEN teacher_education_id = "${IDBachelor}" THEN "${BachelorYear}"
        WHEN teacher_education_id = "${IDMaster}" THEN "${MasterYear}"
        WHEN teacher_education_id = "${IDDocter}" THEN "${DoctorYear}"
        ELSE graduates_years
      END
    WHERE teacher_education_id IN ("${IDBachelor}", "${IDMaster}", "${IDDocter}");
    `,
      function (error, results) {
        if (error) {
          console.error('Error  data:', error);
          return reject(error);
        } else {
          console.log('UPDATE Teacher Education successfully');
          resolve(results);
        }
      },
    );
  });
}
// Update_teacher
async function Update_teacher_subject(
  id,
  Subjectteach1,
  Subjectteach2,
  Subjectteach3,
  Subjectteach4,
  Subjectteach5,
) {
  console.log(
    id,
    Subjectteach1,
    Subjectteach2,
    Subjectteach3,
    Subjectteach4,
    Subjectteach5,
  );
  const unique_id = uuidv4();
  const pool = mysql.createPool(config);
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE subject_teacher SET subject_teach1 = "${Subjectteach1}", subject_teach2 = "${Subjectteach2}" , 
      subject_teach3 = "${Subjectteach3}" , subject_teach4 = "${Subjectteach4}" , subject_teach5 = "${Subjectteach5}"  
      WHERE subject_id = "${id}" `,
      function (error, results) {
        if (error) {
          console.error('Error  data:', error);
          return reject(error);
        } else {
          resolve(results);
          console.log('UPDATE Subject Teacher successfully');
        }
      },
    );
  });
}
// Update_teacher
async function Update_teacher(
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
) {
  const unique_id = uuidv4();
  const pool = mysql.createPool(config);
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE biographical_teacher SET prefix = "${prefix}", first_name = "${firstname}" , 
      last_name = "${lastname}" , id_rmutl = "${idrmutl}" , _email = "${email}" , 
      brithday = "${date}" , nationality = "${nationality}",_phone = "${phone}" , religion = "${religion}" ,
       created = NOW() WHERE teacher_id = "${id}" `,
      function (error, results) {
        if (error) {
          console.error('Error  data:', error);
          return reject(error);
        } else {
          console.log('UPDATE Teacher successfully');
          resolve(results);
        }
      },
    );
  });
}
// READ TEACHER
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
      `SELECT * FROM biographical_teacher INNER JOIN subject_teacher ON biographical_teacher.teacher_id = subject_teacher.subject_id WHERE _email = '${email}'`,
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
  Update_teacher: Update_teacher,
  Update_teacher_subject: Update_teacher_subject,
  Update_teacher_edutcation: Update_teacher_edutcation,
};
