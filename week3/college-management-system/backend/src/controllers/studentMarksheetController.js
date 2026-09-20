const db = require("../config/db");

exports.getStudentMarks = async (req, res) => {

  try {

    const email = req.user.email;

    // optional filters from frontend
    const { sem, subject } = req.query;

    const studentResult = await db.query(
        "SELECT rollnumber, Courcecode FROM students WHERE emailid = ?",
        [email]
    );

    const student = studentResult.rows;

    if (!student.length) {
      return res.status(404).json({ message: "Student not found" });
    }

    const { rollnumber, Courcecode } = student[0];

    // dynamic query
    let query = `
      SELECT
        subjectname,
        subjectcode,
        semoryear,
        theorymarks,
        practicalmarks,
        (theorymarks + practicalmarks) AS total_marks
      FROM marks
      WHERE rollnumber = ?
        AND Courcecode = ?
    `;

    const params = [rollnumber, Courcecode];

    if (sem) {
      params.push(sem);
      query += ` AND semoryear = ?`;
    }

    if (subject) {
      params.push(subject);
      query += ` AND subjectcode = ?`;
    }

    const result = await db.query(query, params);

    const rows = result.rows;

    res.json({
      marks: rows,
      course: Courcecode,
      roll: rollnumber
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }

};