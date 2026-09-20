const PageHeader = ({
                        icon: Icon,
                        title,
                        subtitle,
                        children,
                        className = "",
                    }) => {
    return (
        <header
            className={`
                sticky top-0 z-20
                bg-white/80 dark:bg-zinc-900/80
                backdrop-blur-xl
                border-b border-zinc-200/80 dark:border-zinc-800
                ${className}
            `}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                    {Icon && (
                        <div className="p-2.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-lg shrink-0">
                            <Icon className="w-5 h-5" />
                        </div>
                    )}

                    <div className="min-w-0">
                        <h1 className="text-[15px] font-semibold tracking-tight leading-tight truncate text-zinc-900 dark:text-white">
                            {title}
                        </h1>

                        {subtitle && (
                            <p className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-widest hidden sm:block truncate">
                                {subtitle}
                            </p>
                        )}
                    </div>
                </div>

                {children && (
                    <div className="flex items-center gap-2 shrink-0">
                        {children}
                    </div>
                )}
            </div>
        </header>
    );
};

export default PageHeader;
