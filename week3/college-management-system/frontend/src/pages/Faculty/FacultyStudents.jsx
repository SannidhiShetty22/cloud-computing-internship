import Students from "../Admin/Students.jsx";

// Faculty view: reuse the admin Students list inside the faculty layout.
// This keeps code DRY and provides a student directory for faculty members.
const FacultyStudents = () => {
    return <Students />;
};

export default FacultyStudents;
