const db = require("../config/db");

/*
Assign Controller
-----------------

Handles:

* Get faculties by course + semester
* Assign subject to faculty
  */

// ============================
// Get Faculties By Course + Semester
// ============================
exports.getFaculties = async (req, res) => {
    try {
        const columnsResult = await db.query(`SHOW COLUMNS FROM faculties`);
        const columns = columnsResult.rows.map((row) => String(row.Field).toLowerCase());
        const courseField = columns.includes("courcecode")
            ? "courcecode"
            : columns.includes("coursecode")
                ? "coursecode"
                : null;

        const selectCourseCode = courseField
            ? `f.${courseField} AS courcecode`
            : `NULL AS courcecode`;

        const result = await db.query(
            `SELECT
                 f.sr_no,
                 COALESCE(f.facultyname, f.emailid) AS facultyname,
                 f.emailid,
                 f.subject,
                 s.subjectname,
                 ${selectCourseCode},
                 f.semoryear
             FROM faculties f
                      LEFT JOIN subject s ON f.subject = s.subjectcode
             ORDER BY f.sr_no ASC`
        );

        res.json(result.rows);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching faculties" });
    }
};

// ============================
// Assign Subject To Faculty
// ============================
exports.assignSubject = async (req, res) => {
    const { facultyId } = req.params;
    const { subjectcode, courcecode, semoryear } = req.body;

    if (
        subjectcode === undefined ||
        semoryear === undefined
    ) {
        return res.status(400).json({
            message: "Subject and semester are required"
        });
    }

    try {
        const columnsResult = await db.query(`SHOW COLUMNS FROM faculties`);
        const columns = columnsResult.rows.map((row) => String(row.Field).toLowerCase());
        const courseField = columns.includes("courcecode")
            ? "courcecode"
            : columns.includes("coursecode")
                ? "coursecode"
                : null;

        let query;
        let values;

        if (subjectcode === "NOT ASSIGNED") {
            query = `
        UPDATE faculties
        SET subject = ?, semoryear = ?
        WHERE sr_no = ?
            `;
            values = [subjectcode, semoryear, facultyId];
        } else if (courseField) {
            query = `
        UPDATE faculties
        SET subject = ?, ${courseField} = ?, semoryear = ?
        WHERE sr_no = ?
            `;
            values = [subjectcode, courcecode, semoryear, facultyId];
        } else {
            return res.status(500).json({ message: "Faculty course field not found" });
        }

        const result = await db.query(query, values);

        if (result.rowCount === 0) {
            return res.status(404).json({
                message: "Faculty not found"
            });
        }

        res.json({ message: "Subject updated successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating subject" });
    }
};
