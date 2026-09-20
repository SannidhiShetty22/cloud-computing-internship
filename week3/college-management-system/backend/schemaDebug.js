require('dotenv').config();
const db = require('./src/config/db');
const fs = require('fs');
(async () => {
  try {
    const students = await db.query('SHOW CREATE TABLE students');
    const marks = await db.query('SHOW CREATE TABLE marks');
    const rollgenerator = await db.query('SHOW CREATE TABLE rollgenerator');
    const attendance = await db.query('SHOW CREATE TABLE attendance');
    const attandance = await db.query('SHOW CREATE TABLE attandance');
    fs.writeFileSync('schemaDebug.json', JSON.stringify({ students: students.rows, marks: marks.rows, rollgenerator: rollgenerator.rows, attendance: attendance.rows, attandance: attandance.rows }, null, 2));
  } catch (err) {
    fs.writeFileSync('schemaDebug.json', JSON.stringify({ error: err.toString(), stack: err.stack }, null, 2));
  } finally {
    process.exit(0);
  }
})();
