import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
    Sun,
    Moon,
    Eye,
    EyeOff,
    GraduationCap,
    Mail,
    Lock,
    LogIn,
    AlertCircle,
    ShieldCheck,
    ClipboardCheck,
    BarChart3,
} from "lucide-react";
import api from "../utils/api";

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from;
    const lastPage = localStorage.getItem("lastPage");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Demo login state
    const [demoAccounts, setDemoAccounts] = useState([]);
    const [demoEmail, setDemoEmail] = useState("");
    const [demoLoading, setDemoLoading] = useState(false);

    // Logic for dynamic logo handling
    const [useFallback, setUseFallback] = useState(false);

    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) return savedTheme;
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        return prefersDark ? "dark" : "light";
    });

    /* ================= Logic Preservation ================= */
    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    useEffect(() => {
        const hidePassword = () => {
            setShowPassword(false);
        };
        document.addEventListener("click", hidePassword);
        return () => {
            document.removeEventListener("click", hidePassword);
        };
    }, []);

    useEffect(() => {
        let cancelled = false;
        api.get("/api/auth/demo-accounts")
            .then((res) => {
                if (!cancelled) {
                    setDemoAccounts(res.data.accounts || []);
                    if ((res.data.accounts || []).length > 0) {
                        setDemoEmail(res.data.accounts[0].emailid);
                    }
                }
            })
            .catch(() => {});
        return () => {
            cancelled = true;
        };
    }, []);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const response = await api.post("/api/auth/login", { email, password });
            const { token, role } = response.data;
            localStorage.setItem("token", token);
            localStorage.setItem("role", role);
            if (from) {
                navigate(from.pathname + (from.search || ""), { replace: true });
                return;
            }
            if (lastPage) {
                navigate(lastPage, { replace: true });
                return;
            }
            if (role === "admin") {
                navigate("/admin/dashboard", { replace: true });
            } else if (role === "faculty") {
                navigate("/faculty/dashboard", { replace: true });
            } else if (role === "student") {
                navigate("/student/dashboard", { replace: true });
            }
        } catch (err) {
            if (!err.response) {
                setError("Server unreachable. Check your connection.");
            } else {
                setError("Invalid email or password");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDemoLogin = async (e) => {
        e.preventDefault();
        setError("");
        if (!demoEmail) {
            setError("Please select a demo account");
            return;
        }
        setDemoLoading(true);
        try {
            const response = await api.post("/api/auth/demo-login", {
                email: demoEmail
            });
            const { token, role } = response.data;
            localStorage.setItem("token", token);
            localStorage.setItem("role", role);
            if (from) {
                navigate(from.pathname + (from.search || ""), { replace: true });
                return;
            }
            if (lastPage) {
                navigate(lastPage, { replace: true });
                return;
            }
            if (role === "admin") {
                navigate("/admin/dashboard", { replace: true });
            } else if (role === "faculty") {
                navigate("/faculty/dashboard", { replace: true });
            } else if (role === "student") {
                navigate("/student/dashboard", { replace: true });
            }
        } catch (err) {
            if (err.response) {
                setError(
                    err.response.data?.message || "Demo login failed"
                );
            } else {
                setError("Server unreachable. Check your connection.");
            }
        } finally {
            setDemoLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-white dark:bg-[#0a0a0a] transition-colors duration-500">

            {/* Theme Toggle */}
            <button
                onClick={toggleTheme}
                className="absolute top-6 right-6 z-20 p-2.5 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors active:scale-90"
                title="Toggle theme"
            >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* ===================== BRAND PANEL ===================== */}
            <div className="relative hidden lg:flex flex-col justify-between w-[45%] overflow-hidden bg-brand p-12 text-white">
                <div className="absolute inset-0 bg-grid" />
                <div className="absolute -top-32 -right-32 w-[28rem] h-[28rem] rounded-full bg-white/5 blur-3xl" />
                <div className="absolute -bottom-40 -left-24 w-[24rem] h-[24rem] rounded-full bg-white/[0.03] blur-3xl" />

                <div className="relative z-10 flex items-center gap-3">
                    <div className="flex items-center gap-2.5 text-sm font-semibold tracking-tight">
                        <div className="h-9 w-9 rounded-lg bg-white/[0.06] backdrop-blur flex items-center justify-center ring-1 ring-white/10 overflow-hidden">
                            <img
                                src="/logo.png"
                                alt="College Logo"
                                className="h-6 w-6 object-contain"
                                onError={(e) => { e.currentTarget.style.display = "none"; }}
                            />
                        </div>
                        College Management System
                    </div>
                </div>

                <div className="relative z-10 max-w-md">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] ring-1 ring-white/10 text-xs font-medium text-zinc-300 mb-8">
                        <span className="relative flex h-1.5 w-1.5">
                            <span className="absolute inline-flex h-full w-full rounded-full bg-zinc-400 opacity-60"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-zinc-300"></span>
                        </span>
                        Academic Management Portal
                    </div>

                    <h1 className="text-[2.6rem] xl:text-[3.2rem] font-semibold leading-[1.1] tracking-tight">
                        One platform for
                        <span className="block text-zinc-400">the whole campus</span>
                    </h1>

                    <p className="mt-6 text-sm xl:text-[15px] text-zinc-400 leading-relaxed max-w-sm">
                        Attendance, marks, marksheets, and academic records — unified
                        for administrators, faculty, and students.
                    </p>

                    <div className="mt-12 space-y-5">
                        <FeatureRow icon={ShieldCheck} label="Role-based access for Admin, Faculty & Students" />
                        <FeatureRow icon={ClipboardCheck} label="Attendance and marks, tracked in real time" />
                        <FeatureRow icon={BarChart3} label="Printable, verifiable marksheets" />
                    </div>
                </div>

                <p className="relative z-10 text-xs text-zinc-500 font-medium">
                    © 2026 College Administration System
                </p>
            </div>

            {/* ===================== FORM PANEL ===================== */}
            <div className="relative flex-1 flex flex-col items-center justify-center px-4 py-12 lg:py-0">
                <div className="w-full max-w-[400px] animate-in fade-in zoom-in-95 duration-700">

                    {/* Mobile brand header */}
                    <div className="lg:hidden text-center mb-8">
                        <div className="inline-flex w-20 h-20 rounded-2xl shadow-lg shadow-zinc-900/10 mb-4 overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white items-center justify-center">
                            {!useFallback ? (
                                <img
                                    src="/logo.png"
                                    alt="College Logo"
                                    className="w-12 h-12 object-contain"
                                    onError={() => setUseFallback(true)}
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-brand">
                                    <GraduationCap size={36} className="text-white" />
                                </div>
                            )}
                        </div>
                        <h1 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                            College Management System
                        </h1>
                        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-1">
                            Sign in to your account
                        </p>
                    </div>

                    {/* Desktop heading */}
                    <div className="hidden lg:block text-center mb-8">
                        <div className="inline-flex w-12 h-12 rounded-xl bg-brand items-center justify-center mb-5 overflow-hidden">
                            <img
                                src="/logo.png"
                                alt="College Logo"
                                className="h-8 w-8 object-contain"
                                onError={(e) => { e.currentTarget.style.display = "none"; }}
                            />
                        </div>
                        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                            Welcome back
                        </h1>
                        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-1">
                            Sign in to continue to the academic portal
                        </p>
                    </div>

                    <div className="bg-white dark:bg-[#111111] border border-zinc-200 dark:border-zinc-800 p-8 rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(0,0,0,0.06)] transition-colors">

                        {error && (
                            <div className="mb-6 p-3 flex items-center gap-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 text-xs font-medium rounded-lg animate-in slide-in-from-top-2">
                                <AlertCircle size={16} className="flex-shrink-0" />
                                <p>{error}</p>
                            </div>
                        )}

                        <form onSubmit={handleLogin} className="space-y-5">

                            {/* Email Address */}
                            <div className="space-y-1.5">
                                <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400">
                                    Email Address
                                </label>
                                <div className="relative group">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-zinc-900 dark:group-focus-within:text-zinc-100 transition-colors">
                                        <Mail size={17} />
                                    </div>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-9.5 pr-3.5 py-2.5 bg-zinc-50 dark:bg-[#0a0a0a] border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm font-medium text-zinc-900 dark:text-zinc-100 outline-none focus:ring-4 focus:ring-zinc-900/5 focus:border-zinc-900 dark:focus:border-zinc-100 transition-all"
                                        placeholder="name@college.edu"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="space-y-1.5">
                                <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400">
                                    Password
                                </label>
                                <div className="relative group">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-zinc-900 dark:group-focus-within:text-zinc-100 transition-colors">
                                        <Lock size={17} />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-9.5 pr-9 py-2.5 bg-zinc-50 dark:bg-[#0a0a0a] border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm font-medium text-zinc-900 dark:text-zinc-100 outline-none focus:ring-4 focus:ring-zinc-900/5 focus:border-zinc-900 dark:focus:border-zinc-100 transition-all"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={(e) => { e.stopPropagation(); setShowPassword(!showPassword); }}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 bg-zinc-900 hover:bg-black dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-zinc-900 text-sm font-semibold rounded-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white dark:border-zinc-400 dark:border-t-zinc-900 rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <LogIn size={17} />
                                        Sign In
                                    </>
                                )}
                            </button>

                        </form>

                        {/* Divider */}
                        <div className="relative my-7">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-zinc-100 dark:border-zinc-800"></div>
                            </div>
                            <div className="relative flex justify-center text-xs font-medium text-zinc-400">
                                <span className="bg-white dark:bg-[#111111] px-4">Or sign in with</span>
                            </div>
                        </div>

                        {/* Demo Login */}
                        <div className="flex justify-center">
                            <div className="w-full">
                                <select
                                    value={demoEmail}
                                    onChange={(e) => setDemoEmail(e.target.value)}
                                    disabled={demoLoading}
                                    className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#0a0a0a] px-3.5 py-2.5 text-sm text-zinc-800 dark:text-zinc-100 outline-none focus:ring-4 focus:ring-zinc-900/5 focus:border-zinc-900 dark:focus:border-zinc-100 transition-all"
                                >
                                    {demoAccounts.length === 0 && (
                                        <option value="">Loading demo accounts...</option>
                                    )}
                                    {demoAccounts.map((acc) => (
                                        <option key={acc.emailid} value={acc.emailid}>
                                            {acc.role.charAt(0).toUpperCase() + acc.role.slice(1)} - {acc.emailid}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    type="button"
                                    onClick={handleDemoLogin}
                                    disabled={demoLoading}
                                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3.5 py-2.5 text-sm font-medium text-zinc-700 dark:text-zinc-200 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors disabled:opacity-60"
                                >
                                    {demoLoading ? "Signing in..." : "Sign in with Demo Account"}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Footer Link */}
                    <p className="text-center mt-8 text-xs font-medium text-zinc-400 lg:hidden">
                        © 2026 College Administration System
                    </p>
                </div>
            </div>
        </div>
    );
};

/* ================= COMPONENT: BRAND FEATURE ROW ================= */
const FeatureRow = ({ icon: Icon, label }) => {
    return (
        <div className="flex items-center gap-3.5">
            <div className="h-10 w-10 rounded-lg bg-white/[0.06] ring-1 ring-white/10 flex items-center justify-center flex-shrink-0">
                <Icon size={18} className="text-zinc-300" />
            </div>
            <p className="text-sm font-medium text-zinc-300">
                {label}
            </p>
        </div>
    );
};

export default Login;
