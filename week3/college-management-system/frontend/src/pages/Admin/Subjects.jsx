import { useCallback, useEffect, useState } from "react";
import api from "../../utils/api";
import ConfirmDeleteModal from "../../components/modals/ConfirmDeleteModal.jsx";
import Toast from "../../components/ui/Toast.jsx";
import {
    BookOpen,
    Filter,
    PlusCircle,
    Edit2,
    Trash2,
    X,
    CheckCircle2,
    AlertCircle,
    RotateCcw
} from "lucide-react";

const Subjects = () => {
    const token = localStorage.getItem("token");

    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState("");
    const [selectedSem, setSelectedSem] = useState("");
    const [showAllSubjects, setShowAllSubjects] = useState(false);
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [editingCode, setEditingCode] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [subjectToDelete, setSubjectToDelete] = useState(null);

    const [toast, setToast] = useState(null);

    const [form, setForm] = useState({
        subjectcode: "",
        subjectname: "",
        subjecttype: "core",
        theorymarks: "",
        practicalmarks: ""
    });

    /* ================= ACTION: RESET ================= */
    const handleReset = () => {
        setSelectedCourse("");
        setSelectedSem("");
        setSubjects([]);
        resetForm();
        setError("");
    };

    /* ================= FETCH ================= */

    const fetchCourses = useCallback(async () => {
        try {
            const res = await api.get(
                "/api/courses",
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setCourses(res.data);
        } catch {
            setError("Failed to load courses.");
        }
    }, [token]);

    const fetchSubjects = useCallback(async (courseCode, sem) => {
        try {
            setLoading(true);
            let url = "/api/subjects";
            if (courseCode && sem) {
                url = `/api/subjects?course_code=${courseCode}&sem=${sem}`;
            }

            const res = await api.get(url, { headers: { Authorization: `Bearer ${token}` } });
            setSubjects(res.data);
        } catch (err) {
            console.error(err);
            setError("Failed to load subjects.");
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        if (token) fetchCourses();
    }, [fetchCourses, token]);

    useEffect(() => {
        if (showAllSubjects) {
            fetchSubjects();
            return;
        }

        if (selectedCourse && selectedSem) {
            fetchSubjects(selectedCourse, selectedSem);
        } else {
            setSubjects([]);
        }
    }, [selectedCourse, selectedSem, showAllSubjects, fetchSubjects]);

    const selectedCourseData = courses.find(
        (c) => c.course_code === selectedCourse
    );

    /* ================= FORM ================= */

    const handleFormChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const resetForm = () => {
        setForm({
            subjectcode: "",
            subjectname: "",
            subjecttype: "core",
            theorymarks: "",
            practicalmarks: ""
        });
        setEditingCode(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedCourse || !selectedSem) {
            setError("Select course and semester first.");
            return;
        }

        try {
            setLoading(true);

            if (editingCode) {
                await api.put(
                    `/api/subjects/${editingCode}`,
                    {
                        // FIX: Include the new subject code in the update payload
                        subjectcode: form.subjectcode,
                        subjectname: form.subjectname,
                        subjecttype: form.subjecttype,
                        theorymarks: form.theorymarks,
                        practicalmarks: form.practicalmarks
                    },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setToast({ type: "success", message: "Subject updated successfully!" });
            } else {
                await api.post(
                    "/api/subjects",
                    {
                        ...form,
                        courcecode: selectedCourse,
                        semoryear: selectedSem
                    },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setToast({ type: "success", message: "Subject added successfully!" });
            }

            resetForm();
            fetchSubjects(selectedCourse, selectedSem);

        } catch (err) {
            const errorMessage = err.response?.data?.message || "Operation failed.";
            setError(errorMessage);
            setToast({ type: "error", message: errorMessage });
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (subject) => {
        // If currently showing all subjects, switch to the subject's course/sem so the edit form is visible
        if (showAllSubjects) {
            setShowAllSubjects(false);
            setSelectedCourse(subject.courcecode);
            setSelectedSem(String(subject.semoryear));
        } else if (selectedCourse !== subject.courcecode || String(selectedSem) !== String(subject.semoryear)) {
            // Ensure the form is visible for the subject's course/sem
            setSelectedCourse(subject.courcecode);
            setSelectedSem(String(subject.semoryear));
        }

        setForm({
            subjectcode: subject.subjectcode,
            subjectname: subject.subjectname,
            subjecttype: subject.subjecttype,
            theorymarks: subject.theorymarks,
            practicalmarks: subject.practicalmarks
        });
        setEditingCode(subject.subjectcode);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleDelete = async () => {
        if (!subjectToDelete) return;

        try {
            setLoading(true);
            await api.delete(
                `/api/subjects/${subjectToDelete}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setToast({ type: "success", message: "Subject deleted successfully." });
            if (showAllSubjects) {
                fetchSubjects();
            } else {
                fetchSubjects(selectedCourse, selectedSem);
            }
        } catch {
            setError("Failed to delete subject.");
            setToast({ type: "error", message: "Failed to delete subject." });
        } finally {
            setLoading(false);
            setShowDeleteModal(false);
            setSubjectToDelete(null);
        }
    };

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300 font-sans pb-12">

            {/* PLATFORM HEADER - GLASSMORPHISM */}
            <header className="sticky top-0 z-20 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-lg border-b border-zinc-200 dark:border-zinc-800 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-600 text-white rounded-lg shadow-md shadow-blue-500/20">
                            <BookOpen className="w-5 h-5" />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold tracking-tight leading-tight">Subject Management</h1>
                            <p className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-widest hidden sm:block">Academic Configuration</p>
                        </div>
                    </div>
                    <button onClick={handleReset} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors">
                        <RotateCcw className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Reset Form</span>
                    </button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-3 sm:px-6 py-6 space-y-6">

                {/* ERROR STATE */}
                {error && (
                    <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl text-red-600 dark:text-red-400 text-sm font-semibold animate-in slide-in-from-top-2">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <p>{error}</p>
                    </div>
                )}

                {/* FILTER CARD */}
                <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm p-4 sm:p-6 transition-all">
                    <div className="flex items-center gap-2 mb-4">
                        <Filter className="w-4 h-4 text-blue-500" />
                        <h2 className="text-xs font-bold uppercase text-zinc-500 dark:text-zinc-400 tracking-wider">Hierarchy Selection</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <select
                            value={selectedCourse}
                            onChange={(e) => {
                                setSelectedCourse(e.target.value);
                                setSelectedSem("");
                                resetForm();
                                setShowAllSubjects(false);
                            }}
                            className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
                        >
                            <option value="">Select Course...</option>
                            {courses.map((course) => (
                                <option key={course.id} value={course.course_code}>
                                    {course.course_name}
                                </option>
                            ))}
                        </select>

                        <select
                            value={selectedSem}
                            onChange={(e) => { setSelectedSem(e.target.value); setShowAllSubjects(false);} }
                            disabled={!selectedCourse}
                            className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm text-zinc-900 dark:text-zinc-100 disabled:opacity-40 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
                        >
                            <option value="">Select Semester/Year...</option>
                            {selectedCourseData &&
                                Array.from({ length: selectedCourseData.total_semesters }, (_, i) => i + 1)
                                    .map((sem) => (
                                        <option key={sem} value={sem}>
                                            {selectedCourseData.sem_or_year === "year" ? `Year ${sem}` : `Semester ${sem}`}
                                        </option>
                                    ))}
                        </select>
                    </div>
                    <div className="mt-4">
                        <button
                            type="button"
                            onClick={() => { setShowAllSubjects(true); setSelectedCourse(""); setSelectedSem(""); resetForm(); setError(""); }}
                            className={`px-4 py-2 rounded-lg text-sm font-semibold mr-2 ${showAllSubjects ? 'bg-blue-600 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200'}`}
                        >
                            All Subjects
                        </button>
                    </div>
                </section>

                {/* FORM CARD */}
                {selectedCourse && selectedSem && (
                    <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm p-4 sm:p-6 transition-all relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center gap-2 mb-6">
                            {editingCode ? <Edit2 className="w-4 h-4 text-blue-500" /> : <PlusCircle className="w-4 h-4 text-blue-500" />}
                            <h2 className="text-xs font-bold uppercase text-zinc-500 dark:text-zinc-400 tracking-wider">
                                {editingCode ? "Edit Subject Configuration" : "Add New Subject"}
                            </h2>
                        </div>

                        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 w-full">
                            {/* FIX: Removed the disabled attribute and cursor-not-allowed classes */}
                            <input
                                name="subjectcode"
                                placeholder="Subject Code (e.g. CS101)"
                                value={form.subjectcode}
                                onChange={handleFormChange}
                                required
                                className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                            />

                            <input
                                name="subjectname"
                                placeholder="Subject Name"
                                value={form.subjectname}
                                onChange={handleFormChange}
                                required
                                className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                            />

                            <select
                                name="subjecttype"
                                value={form.subjecttype}
                                onChange={handleFormChange}
                                className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
                            >
                                <option value="core">Core Subject</option>
                                <option value="optional">Optional Subject</option>
                            </select>

                            <input
                                type="number"
                                name="theorymarks"
                                placeholder="Max Theory Marks"
                                value={form.theorymarks}
                                onChange={handleFormChange}
                                required
                                className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                            />

                            <input
                                type="number"
                                name="practicalmarks"
                                placeholder="Max Practical Marks"
                                value={form.practicalmarks}
                                onChange={handleFormChange}
                                required
                                className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                            />

                            {/* ACTION BUTTONS */}
                            <div className="sm:col-span-2 lg:col-span-5 flex flex-col sm:flex-row sm:justify-end gap-3 mt-2 border-t border-zinc-100 dark:border-zinc-800/60 pt-4 w-full">
                                {editingCode && (
                                    <button type="button" onClick={resetForm}
                                            className="w-full sm:w-auto px-5 py-2.5 flex items-center justify-center gap-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 text-sm font-bold rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors active:scale-95">
                                        <X className="w-4 h-4" /> Cancel Edit
                                    </button>
                                )}
                                <button type="submit" disabled={loading}
                                        className="w-full sm:w-auto px-6 py-2.5 flex items-center justify-center gap-2 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-all shadow-md shadow-blue-500/20 active:scale-95 disabled:opacity-70 disabled:active:scale-100">
                                    {editingCode ? <CheckCircle2 className="w-4 h-4" /> : <PlusCircle className="w-4 h-4" />}
                                    {editingCode ? "Update Subject" : "Add Subject"}
                                </button>
                            </div>
                        </form>
                    </section>
                )}

                {/* SUBJECT LIST TABLE - ZERO HORIZONTAL SCROLL ON MOBILE */}
                {((selectedCourse && selectedSem) || showAllSubjects) && (
                    <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/50">
                            <table className="w-full table-fixed">
                                <thead>
                                <tr>
                                    <th className="w-[20%] sm:w-[12%] px-4 sm:px-6 py-3.5 text-left text-[10px] sm:text-xs font-bold text-zinc-500 uppercase tracking-wider">Code</th>
                                    <th className="w-[35%] sm:w-[28%] px-2 sm:px-4 py-3.5 text-left text-[10px] sm:text-xs font-bold text-zinc-500 uppercase tracking-wider">Subject Name</th>
                                    {showAllSubjects && (
                                        <>
                                            <th className="hidden md:table-cell md:w-[12%] px-4 py-3.5 text-center text-[10px] sm:text-xs font-bold text-zinc-500 uppercase tracking-wider">Course</th>
                                            <th className="hidden md:table-cell md:w-[8%] px-4 py-3.5 text-center text-[10px] sm:text-xs font-bold text-zinc-500 uppercase tracking-wider">Sem</th>
                                        </>
                                    )}
                                    <th className="hidden sm:table-cell sm:w-[10%] px-4 py-3.5 text-center text-[10px] sm:text-xs font-bold text-zinc-500 uppercase tracking-wider">Type</th>
                                    <th className="hidden sm:table-cell sm:w-[10%] px-2 py-3.5 text-center text-[10px] sm:text-xs font-bold text-zinc-500 uppercase tracking-wider">Theory</th>
                                    <th className="hidden sm:table-cell sm:w-[10%] px-2 py-3.5 text-center text-[10px] sm:text-xs font-bold text-zinc-500 uppercase tracking-wider">Pract.</th>
                                    <th className="w-[25%] sm:w-[20%] px-4 sm:px-6 py-3.5 text-right sm:text-center text-[10px] sm:text-xs font-bold text-zinc-500 uppercase tracking-wider">Actions</th>
                                </tr>
                                </thead>
                            </table>
                        </div>

                        <div className="w-full">
                            <table className="w-full table-fixed">
                                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
                                {subjects.length > 0 ? subjects.map((sub, idx) => (
                                    <tr key={sub.subjectcode} className={`${idx % 2 === 0 ? 'bg-transparent' : 'bg-zinc-50/50 dark:bg-zinc-800/20'} hover:bg-blue-50/50 dark:hover:bg-blue-500/5 transition-colors`}>
                                        <td className="w-[20%] sm:w-[12%] px-4 sm:px-6 py-4">
                                            <div className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate">{sub.subjectcode}</div>
                                        </td>
                                        <td className="w-[35%] sm:w-[28%] px-2 sm:px-4 py-4">
                                            <div className="text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-300 truncate" title={sub.subjectname}>{sub.subjectname}</div>
                                        </td>
                                        {showAllSubjects && (
                                            <>
                                                <td className="hidden md:table-cell md:w-[12%] px-4 py-4 text-center">
                                                    <div className="text-xs font-mono font-bold text-zinc-700 dark:text-zinc-300">{sub.courcecode}</div>
                                                </td>
                                                <td className="hidden md:table-cell md:w-[8%] px-4 py-4 text-center">
                                                    <div className="text-xs font-mono font-bold text-zinc-700 dark:text-zinc-300">{sub.semoryear}</div>
                                                </td>
                                            </>
                                        )}
                                        <td className="hidden sm:table-cell sm:w-[10%] px-4 py-4 text-center">
                                                <span className={`inline-flex items-center px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider
                                                    ${sub.subjecttype === 'core' ? 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400' : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'}`}>
                                                    {sub.subjecttype}
                                                </span>
                                        </td>
                                        <td className="hidden sm:table-cell sm:w-[10%] px-2 py-4 text-center">
                                            <div className="text-xs font-mono font-bold text-zinc-700 dark:text-zinc-300">{sub.theorymarks}</div>
                                        </td>
                                        <td className="hidden sm:table-cell sm:w-[10%] px-2 py-4 text-center">
                                            <div className="text-xs font-mono font-bold text-zinc-700 dark:text-zinc-300">{sub.practicalmarks}</div>
                                        </td>
                                        <td className="w-[25%] sm:w-[20%] px-4 sm:px-6 py-3 text-right sm:text-center">
                                            <div className="flex items-center justify-end sm:justify-center gap-1 sm:gap-2">
                                                <button onClick={() => handleEdit(sub)}
                                                        className="p-2 sm:px-3 sm:py-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-500/10 dark:hover:text-blue-400 rounded-lg transition-colors flex items-center justify-center"
                                                        title="Edit Subject">
                                                    <Edit2 className="w-4 h-4" />
                                                    <span className="hidden xl:inline text-xs font-bold ml-2">Edit</span>
                                                </button>
                                                <button onClick={() => { setSubjectToDelete(sub.subjectcode); setShowDeleteModal(true); }}
                                                        className="p-2 sm:px-3 sm:py-1.5 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/20 rounded-lg transition-colors flex items-center justify-center"
                                                        title="Delete Subject">
                                                    <Trash2 className="w-4 h-4" />
                                                    <span className="hidden xl:inline text-xs font-bold ml-2">Delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={showAllSubjects ? 8 : 6} className="px-6 py-12 text-center text-zinc-500 dark:text-zinc-400 text-sm">
                                            No subjects registered for this parameter.
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </section>
                )}
            </main>

            <ConfirmDeleteModal
                show={showDeleteModal}
                title="Confirm Deletion"
                message="Are you sure you want to delete this subject? This action cannot be undone."
                loading={loading}
                onCancel={() => { setShowDeleteModal(false); setSubjectToDelete(null); }}
                onConfirm={handleDelete}
            />

            {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
        </div>
    );
};

export default Subjects;