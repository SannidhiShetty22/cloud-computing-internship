require('dotenv').config();
const db = require('./src/config/db');
(async () => {
  try {
    console.log('Altering rollnumber schema...');

    await db.query('ALTER TABLE students MODIFY rollnumber VARCHAR(50) DEFAULT NULL');
    await db.query('ALTER TABLE marks DROP FOREIGN KEY fk_marks_student');
    await db.query('ALTER TABLE marks MODIFY rollnumber VARCHAR(50) DEFAULT NULL');
    await db.query('ALTER TABLE rollgenerator MODIFY rollnumber VARCHAR(50) DEFAULT NULL');
    await db.query('ALTER TABLE attendance MODIFY rollnumber VARCHAR(50) DEFAULT NULL');
    await db.query('ALTER TABLE attandance MODIFY rollnumber VARCHAR(50) DEFAULT NULL');
    await db.query('ALTER TABLE marks ADD CONSTRAINT fk_marks_student FOREIGN KEY (rollnumber) REFERENCES students (rollnumber) ON DELETE CASCADE');

    console.log('Rollnumber schema updated successfully.');
  } catch (err) {
    console.error('Schema update failed:', err);
  } finally {
    process.exit(0);
  }
})();
