require("dotenv").config();

const app = require("./src/app");
const db = require("./src/config/db");

const PORT = process.env.PORT || 5000;

async function ensureRollnumberSchema() {
    try {
        const result = await db.query("SHOW COLUMNS FROM students LIKE 'rollnumber'");
        const type = result.rows?.[0]?.Type?.toLowerCase() || "";

        if (type.includes("bigint")) {
            console.log("Migrating rollnumber columns to VARCHAR(50)");
            await migrateMarksRollnumber();
            await db.query("ALTER TABLE students MODIFY rollnumber VARCHAR(50) DEFAULT NULL");
            await db.query("ALTER TABLE rollgenerator MODIFY rollnumber VARCHAR(50) DEFAULT NULL");
            await db.query("ALTER TABLE attendance MODIFY rollnumber VARCHAR(50) DEFAULT NULL");
            await db.query("ALTER TABLE attandance MODIFY rollnumber VARCHAR(50) DEFAULT NULL");
            console.log("Rollnumber schema migration complete.");
        }
    } catch (error) {
        console.error("Rollnumber schema migration failed:", error);
    }
}

async function migrateMarksRollnumber() {
    try {
        const fkResult = await db.query(`
            SELECT CONSTRAINT_NAME
            FROM information_schema.KEY_COLUMN_USAGE
            WHERE TABLE_SCHEMA = DATABASE()
              AND TABLE_NAME = 'marks'
              AND COLUMN_NAME = 'rollnumber'
              AND REFERENCED_TABLE_NAME = 'students'
              AND REFERENCED_COLUMN_NAME = 'rollnumber'
        `);

        if (fkResult.rows.length > 0) {
            const fkName = fkResult.rows[0].CONSTRAINT_NAME;
            await db.query(`ALTER TABLE marks DROP FOREIGN KEY \`${fkName}\``); // escaped backticks for SQL identifier
        }

        await db.query("ALTER TABLE marks MODIFY rollnumber VARCHAR(50) DEFAULT NULL");

        if (fkResult.rows.length > 0) {
            await db.query(
                `ALTER TABLE marks
                 ADD CONSTRAINT fk_marks_student
                 FOREIGN KEY (rollnumber)
                 REFERENCES students(rollnumber)
                 ON DELETE CASCADE`
            );
        }
    } catch (error) {
        console.error("Failed to migrate marks.rollnumber:", error);
    }
}

(async () => {
    await ensureRollnumberSchema();
    app.listen(PORT, "0.0.0.0", () => {
        console.log(`Server running on port ${PORT}`);
    });
})();
