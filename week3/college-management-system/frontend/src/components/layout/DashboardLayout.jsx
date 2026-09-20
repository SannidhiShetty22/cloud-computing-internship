const DashboardLayout = ({ sidebar, headerTitle, children }) => {
    return (
        <div className="min-h-screen flex bg-zinc-50 dark:bg-[#0a0a0a]">

            {sidebar}

            <div className="flex-1 flex flex-col">

                <header className="h-16 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-8">
                    <h1 className="text-lg font-bold text-zinc-800 dark:text-zinc-100 tracking-tight">
                        {headerTitle}
                    </h1>
                </header>

                <main className="flex-1 p-8">
                    <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-[0_1px_2px_rgba(9,9,11,0.04),0_8px_24px_-12px_rgba(9,9,11,0.08)] p-8 min-h-[80vh] border border-zinc-200 dark:border-zinc-800">
                        {children}
                    </div>
                </main>

            </div>

        </div>
    );
};

export default DashboardLayout;
