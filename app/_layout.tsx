import React, { useMemo } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PaperProvider, Surface, useTheme } from "react-native-paper";
import TopAppBar from "@/components/TopAppBar";
import FilterSurface from "@/components/FilterSurface";
import ProfilesDataTable from "@/components/DataTable";
import { FilterProvider } from "@/hooks/FilterHook";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";
import { View } from "react-native";
import { ThemeContext, useThemePreference } from "@/hooks/useThemeToggle";

const MainView = () => {
    const theme = useTheme();
    const { layout: layoutMode } = useResponsiveLayout();

    const layoutDirection = useMemo(() => {
        switch (layoutMode) {
            case "desktop":
                return "row";
            case "mobile":
                return "column";
            default:
                return "column";
        }
    }, [layoutMode]);

    return (
        <View
            style={{
                flexDirection: layoutDirection,
                flex: 1,
                backgroundColor: theme.colors.background,
            }}
        >
            {" "}
            {/* Added flex: 1 here */}
            <FilterSurface />
            <ProfilesDataTable />
        </View>
    );
};

export default function RootLayout() {
    const { theme, toggleTheme, isReady } = useThemePreference();

    if (!isReady) return null; // or <SplashScreen />

    return (
        <SafeAreaProvider>
            <ThemeContext.Provider value={{ theme, toggleTheme }}>
                <PaperProvider theme={theme}>
                    <FilterProvider>
                        <TopAppBar />
                        <MainView />
                    </FilterProvider>
                </PaperProvider>
            </ThemeContext.Provider>
        </SafeAreaProvider>
    );
}
