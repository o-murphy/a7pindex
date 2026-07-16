import TopAppBar from "@/components/TopAppBar";
import FilterSurface from "@/components/FilterSurface";
import ProfilesDataTable from "@/components/DataTable";
import { FilterProvider } from "@/hooks/FilterHook";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";
import { ThemeContext, useThemePreference } from "@/hooks/useThemeToggle";

const MainView = () => {
    const { layout: layoutMode } = useResponsiveLayout();

    return (
        <div
            className={`flex flex-1 overflow-hidden bg-background ${
                layoutMode === "desktop" ? "flex-row" : "flex-col overflow-y-auto"
            }`}
        >
            <FilterSurface />
            <ProfilesDataTable />
        </div>
    );
};

export default function App() {
    const { isDark, toggleTheme } = useThemePreference();

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
            <FilterProvider>
                <div className="flex h-screen flex-col">
                    <TopAppBar />
                    <MainView />
                </div>
            </FilterProvider>
        </ThemeContext.Provider>
    );
}
