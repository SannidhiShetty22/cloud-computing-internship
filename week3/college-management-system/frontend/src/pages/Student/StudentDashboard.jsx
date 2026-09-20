import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../utils/api";
import {
  LayoutDashboard,
  User,
  GraduationCap,
  BookOpen,
  Activity,
  ClipboardCheck,
  BarChart3,
  UserCircle,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

/* ================= COMPONENT: DASHBOARD CARD ================= */
const DashboardCard = ({ title, value, icon: Icon, color, loading }) => {
  const colorThemes = {
    blue: "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400",
    indigo: "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
    emerald: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    violet: "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300",
  };

  return (
    <div className="relative overflow-hidden bg-white dark:bg-[#111111] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group cursor-default">
      <div
        className={`absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-10 transition-transform group-hover:scale-150 duration-500 ${
          colorThemes[color].split(" ")[0]
        }`}
      ></div>
      <div className="flex items-center justify-between relative z-10">
        <div className="space-y-1">
          <p className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
            {title}
          </p>
          {loading ? (
            <div className="h-8 w-20 bg-zinc-200 dark:bg-zinc-800 rounded-md animate-pulse mt-2"></div>
          ) : (
            <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
              {value || "-"}
            </p>
          )}
        </div>
        <div className={`p-4 rounded-xl ${colorThemes[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

/* ================= COMPONENT: QUICK ACTION LINK ================= */
const QuickActionLink = ({ to, icon: Icon, label, color }) => {
  const colorThemes = {
    blue: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 group-hover:bg-blue-500 group-hover:text-white",
    indigo: "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 group-hover:bg-indigo-500 group-hover:text-white",
    emerald: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 group-hover:bg-emerald-500 group-hover:text-white",
    violet: "text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 group-hover:bg-zinc-900 group-hover:text-white dark:group-hover:bg-zinc-100 dark:group-hover:text-zinc-900",
  };

  return (
    <Link
      to={to}
      className="group flex items-center justify-between p-3 rounded-lg border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 hover:border-zinc-300 dark:hover:border-zinc-600 transition-all active:scale-95"
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg transition-colors ${colorThemes[color]}`}>
          <Icon className="w-4 h-4" />
        </div>
        <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-200 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
          {label}
        </span>
      </div>
      <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 group-hover:translate-x-1 transition-all" />
    </Link>
  );
};

/* ================= MAIN COMPONENT ================= */
export default function StudentDashboard() {
  const token = localStorage.getItem("token");

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await api.get("/api/student/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStudent(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchStudent();
  }, [token]);

  return (
    <div className="pb-12 font-sans">

      {/* PAGE HEADER - GLASSMORPHISM */}
      <header className="sticky top-0 z-20 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-lg border-b border-zinc-200 dark:border-zinc-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-brand text-white rounded-xl shadow-md shadow-indigo-500/25">
              <LayoutDashboard className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 tracking-tight leading-tight">
                Student Dashboard
              </h1>
              <p className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-widest hidden sm:block">
                Academic Overview
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider hidden sm:inline">
              Session Active
            </span>
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider sm:hidden">
              Active
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">

        {/* METRICS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          <DashboardCard
            title="Student Name"
            value={
              loading
                ? ""
                : `${student?.firstname || ""} ${student?.lastname || ""}`.trim()
            }
            icon={User}
            color="blue"
            loading={loading}
          />
          <DashboardCard
            title="Roll Number"
            value={student?.rollnumber}
            icon={BookOpen}
            color="indigo"
            loading={loading}
          />
          <DashboardCard
            title="Course"
            value={student?.courcecode}
            icon={GraduationCap}
            color="emerald"
            loading={loading}
          />
          <DashboardCard
            title="Semester"
            value={student?.semoryear || "N/A"}
            icon={Activity}
            color="violet"
            loading={loading}
          />
        </div>

        {/* TWO-COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

          {/* INFO PANEL — spans 2 columns */}
          <section className="lg:col-span-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 sm:p-8 shadow-sm h-full flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
                <Activity className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
              </div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                Student Portal Overview
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 flex-1">
              <div className="flex flex-col gap-3 p-5 rounded-xl bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-100 dark:border-zinc-800/60">
                <ShieldCheck className="w-6 h-6 text-indigo-500" />
                <div>
                  <h4 className="text-sm font-bold text-zinc-800 dark:text-zinc-200 mb-1">
                    Student Privileges
                  </h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    You have access to view your personal attendance records,
                    academic marks, and update your profile information securely.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 p-5 rounded-xl bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-100 dark:border-zinc-800/60">
                <BarChart3 className="w-6 h-6 text-emerald-500" />
                <div>
                  <h4 className="text-sm font-bold text-zinc-800 dark:text-zinc-200 mb-1">
                    Live Academic Data
                  </h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    Your attendance and marks reflect real-time data entered by
                    faculty. Check regularly to stay on top of your performance.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* QUICK ACTIONS — spans 1 column */}
          <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                Quick Launch
              </h3>
            </div>

            <div className="flex flex-col gap-3">
              <QuickActionLink
                to="/student/attendance"
                icon={ClipboardCheck}
                label="View Attendance"
                color="blue"
              />
              <QuickActionLink
                to="/student/marksheet"
                icon={GraduationCap}
                label="View Marksheet"
                color="indigo"
              />
              <QuickActionLink
                to="/student/profile"
                icon={UserCircle}
                label="My Profile"
                color="emerald"
              />
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}