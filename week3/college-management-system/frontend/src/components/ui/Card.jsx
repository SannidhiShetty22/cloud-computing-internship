const Card = ({
                  children,
                  className = "",
              }) => {
    return (
        <div
            className={`
                bg-white dark:bg-[#111111]
                border border-zinc-200 dark:border-zinc-800
                rounded-lg
                shadow-[0_1px_2px_rgba(0,0,0,0.04)]
                ${className}
            `}
        >
            {children}
        </div>
    );
};

export default Card;
