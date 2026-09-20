const Select = ({
                    children,
                    className = "",
                    ...props
                }) => {
    return (
        <select
            className={`
                w-full
                px-3.5 py-2.5
                bg-white dark:bg-[#0a0a0a]
                border border-zinc-200 dark:border-zinc-800
                rounded-lg
                text-sm text-zinc-900 dark:text-zinc-100
                outline-none
                transition-all duration-150
                focus:border-zinc-900 dark:focus:border-zinc-100
                focus:ring-4 focus:ring-zinc-900/5 dark:focus:ring-white/5
                disabled:opacity-50
                disabled:cursor-not-allowed
                ${className}
            `}
            {...props}
        >
            {children}
        </select>
    );
};

export default Select;
