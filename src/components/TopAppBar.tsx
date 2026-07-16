import { ThemeToggle } from "./ThemeToggle";

const TopAppBar = () => {
    return (
        <header className="z-10 flex shrink-0 items-center justify-between bg-elevation-2 px-4 py-3 shadow-sm">
            <h1 className="text-lg font-medium text-on-surface">
                Archer Balistic Profiles Library
            </h1>
            <ThemeToggle />
        </header>
    );
};

export default TopAppBar;
