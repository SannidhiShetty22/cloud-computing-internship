import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const SidebarNavigation = ({
                               navigation,
                               openSections,
                               toggleSection,
                               closeSidebar,
                               closeSections,
                           }) => {
    const location = useLocation();

    const activeSection = navigation.find((item) =>
        item.children?.some((child) =>
            location.pathname.startsWith(child.path)
        )
    );

    const handleNavigation = () => {
        if (window.innerWidth < 1024) {
            closeSidebar();
        }
    };

    return (
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {navigation.map((item) => {
                const Icon = item.icon;

                const isOpen =
                    openSections[item.name] ||
                    activeSection?.name === item.name;

                if (item.children) {
                    return (
                        <div
                            key={item.name}
                            className="mb-1"
                        >
                            <button
                                onClick={() =>
                                    toggleSection(item.name)
                                }
                                className={`w-full flex items-center justify-between px-3 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                                    isOpen
                                        ? "text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-800/50"
                                        : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-zinc-200"
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <Icon
                                        className={`w-5 h-5 ${
                                            isOpen
                                                ? "text-zinc-900 dark:text-white"
                                                : ""
                                        }`}
                                    />

                                    {item.name}
                                </div>

                                <ChevronRight
                                    className={`w-4 h-4 transition-transform duration-200 ${
                                        isOpen
                                            ? "rotate-90 text-zinc-900 dark:text-white"
                                            : ""
                                    }`}
                                />
                            </button>

                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                    isOpen
                                        ? "max-h-48 opacity-100 mt-1"
                                        : "max-h-0 opacity-0"
                                }`}
                            >
                                <div className="ml-5 pl-3 border-l border-zinc-200 dark:border-zinc-800 space-y-1 py-1">
                                    {item.children.map((child) => {
                                        const isActive =
                                            location.pathname.startsWith(
                                                child.path
                                            );

                                        return (
                                            <Link
                                                key={child.path}
                                                to={child.path}
                                                onClick={handleNavigation}
                                                className={`block px-4 py-2 rounded-lg text-[13px] font-medium transition-all ${
                                                    isActive
                                                        ? "bg-brand-soft text-zinc-900 dark:text-white font-bold"
                                                        : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
                                                }`}
                                            >
                                                {child.name}
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    );
                }

                const isActive =
                    location.pathname === item.path;

                return (
                    <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => {
                            closeSections();
                            handleNavigation();
                        }}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                            isActive
                                ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                                : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-zinc-200"
                        }`}
                    >
                        <Icon className="w-5 h-5" />

                        {item.name}
                    </Link>
                );
            })}
        </nav>
    );
};

export default SidebarNavigation;