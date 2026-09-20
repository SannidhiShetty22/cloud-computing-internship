require('dotenv').config();
const db = require('./src/config/db');
(async ()=>{
  try {
    const cols = await db.query('SHOW COLUMNS FROM faculties');
    console.log(JSON.stringify(cols.rows, null, 2));
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
})();
