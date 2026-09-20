const variants = {
    primary:
        "bg-zinc-900 text-white hover:bg-black dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200",
    secondary:
        "bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 ring-1 ring-inset ring-zinc-200 dark:ring-zinc-800",
    danger:
        "bg-red-600 text-white hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-500",
    ghost:
        "bg-transparent text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800",
};

const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2.5 text-sm",
    lg: "px-6 py-3 text-sm",
};

const Button = ({
                    children,
                    variant = "primary",
                    size = "md",
                    className = "",
                    type = "button",
                    ...props
                }) => {
    return (
        <button
            type={type}
            className={`
                inline-flex items-center justify-center gap-1.5
                rounded-lg font-semibold
                transition-all duration-150
                active:scale-95
                disabled:opacity-50
                disabled:cursor-not-allowed
                disabled:active:scale-100
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-zinc-900/40
                dark:focus-visible:ring-white/40
                ${variants[variant]}
                ${sizes[size]}
                ${className}
            `}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
