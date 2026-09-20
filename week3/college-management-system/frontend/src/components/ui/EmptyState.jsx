const EmptyState = ({
                        icon: Icon,
                        title,
                        description,
                        children,
                        className = "",
                    }) => {
    return (
        <div
            className={`
                flex flex-col items-center justify-center
                px-4 py-12
                text-center
                ${className}
            `}
        >
            {Icon && (
                <div className="mb-4 p-3.5 bg-zinc-100 dark:bg-zinc-800 rounded-xl ring-1 ring-inset ring-zinc-200 dark:ring-zinc-700">
                    <Icon className="w-6 h-6 text-zinc-400 dark:text-zinc-500" />
                </div>
            )}

            <h3 className="text-sm font-bold text-zinc-700 dark:text-zinc-300">
                {title}
            </h3>

            {description && (
                <p className="mt-1 max-w-sm text-xs text-zinc-500 dark:text-zinc-400">
                    {description}
                </p>
            )}

            {children && (
                <div className="mt-4">
                    {children}
                </div>
            )}
        </div>
    );
};

export default EmptyState;
