const Page = ({
                  children,
                  className = "",
              }) => {
    return (
        <div
            className={`
                min-h-screen
                bg-zinc-50 dark:bg-[#0a0a0a]
                text-zinc-900 dark:text-zinc-100
                transition-colors duration-300
                font-sans
                pb-12
                ${className}
            `}
        >
            {children}
        </div>
    );
};

export default Page;
