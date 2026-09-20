const Input = ({
                   className = "",
                   type = "text",
                   ...props
               }) => {
    return (
        <input
            type={type}
            className={`
                w-full
                px-3.5 py-2.5
                bg-white dark:bg-[#0a0a0a]
                border border-zinc-200 dark:border-zinc-800
                rounded-lg
                text-sm text-zinc-900 dark:text-zinc-100
                placeholder:text-zinc-400 dark:placeholder:text-zinc-500
                outline-none
                transition-all duration-150
                focus:border-zinc-900 dark:focus:border-zinc-100
                focus:ring-4 focus:ring-zinc-900/5 dark:focus:ring-white/5
                disabled:opacity-50
                disabled:cursor-not-allowed
                ${className}
            `}
            {...props}
        />
    );
};

export default Input;
