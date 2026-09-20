import {
    Menu,
    Moon,
    Sun,
    LogOut,
} from "lucide-react";

const AppHeader = ({
                       title,
                       theme,
                       toggleSidebar,
                       toggleTheme,
                       handleLogout,
                   }) => {
    return (
        <header className="bg-white/80 dark:bg-[#111111]/80 backdrop-blur-xl border-b border-zinc-200/80 dark:border-zinc-800 sticky top-0 z-30">
            <div className="flex items-center justify-between px-4 sm:px-8 h-16">
                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        onClick={toggleSidebar}
                        className="p-2 -ml-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/40 dark:focus-visible:ring-white/40"
                        aria-label="Toggle sidebar"
                    >
                        <Menu className="w-5 h-5" />
                    </button>

                    <div className="flex items-center gap-2.5 hidden sm:flex">
                        <img
                            src="/logo.png"
                            alt="College Logo"
                            className="h-6 w-6 object-contain"
                        />
                        <h1 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 tracking-tight">
                            {title}
                        </h1>
                    </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-4">
                    <button
                        type="button"
                        onClick={toggleTheme}
                        className="p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/40 dark:focus-visible:ring-white/40"
                        title="Toggle Theme"
                        aria-label="Toggle theme"
                    >
                        {theme === "dark" ? (
                            <Sun className="w-5 h-5" />
                        ) : (
                            <Moon className="w-5 h-5" />
                        )}
                    </button>

                    <div className="h-5 w-px bg-zinc-200 dark:bg-zinc-700 hidden sm:block mx-1" />

                    <button
                        type="button"
                        onClick={handleLogout}
                        className="flex items-center gap-2 p-2 sm:px-3 sm:py-1.5 text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/50 group"
                    >
                        <LogOut className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />

                        <span className="hidden sm:inline">
                            Sign Out
                        </span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default AppHeader;
