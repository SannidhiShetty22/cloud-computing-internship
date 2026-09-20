const variants = {
    default:
        "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300",

    primary:
        "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 ring-1 ring-inset ring-indigo-500/10",

    success:
        "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 ring-1 ring-inset ring-emerald-500/10",

    warning:
        "bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 ring-1 ring-inset ring-amber-500/10",

    danger:
        "bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400 ring-1 ring-inset ring-red-500/10",
};

const Badge = ({
                   children,
                   variant = "default",
                   className = "",
               }) => {
    return (
        <span
            className={`
                inline-flex items-center justify-center
                px-2.5 py-1
                rounded-lg
                text-xs font-bold
                whitespace-nowrap
                ${variants[variant] || variants.default}
                ${className}
            `}
        >
            {children}
        </span>
    );
};

export default Badge;
