const approvedDataJSON = require('./approvedDataJSON');
const parentDataJSON = require('./parentDataJSON.js');
const studentDataJSON = require('./studentDataJSON.js');
const teacherDataJSON = require('./teacherDataJSON.js');

module.exports = (db) => {
  // Start user data creation
  db.User.create({
    firstName: 'Joe',
    lastName: 'Gates',
    email: 'j@g.co',
    password: process.env.ADMIN_USER_PWD,
    isAdmin: true,
    parentTeacher: 'teacher'
  });
  db.User.create({
    firstName: 'Jane',
    lastName: 'Jobs',
    email: 'j@j.co',
    password: process.env.USER_PWD,
    isAdmin: false,
    parentTeacher: 'parent'
  });

  db.Parent.bulkCreate(parentDataJSON).then(function () {
    return db.Approved.bulkCreate(approvedDataJSON);
  }).then(function () {
    return db.Teacher.bulkCreate(teacherDataJSON);
  }).then(function () {
    return db.Student.bulkCreate(studentDataJSON);
  }).then(function () {
    console.log('Seed completed.');
  });
};
