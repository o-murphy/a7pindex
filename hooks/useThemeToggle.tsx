// src/hooks/useThemePreference.ts

import {
    useEffect,
    useState,
    useCallback,
    useContext,
    createContext,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ArmyDarkTheme, ArmyLightTheme } from "@/theme/theme";
import { ThemeBase } from "react-native-paper";

const THEME_PREFERENCE_KEY = "theme_preference";

// Define the theme context type
export type ThemeContextType = {
    theme: ThemeBase;
    toggleTheme: () => void;
};

// Create the context
export const ThemeContext = createContext<ThemeContextType | undefined>(
    undefined,
);

// Export hook to use in child components
export const useThemeToggle = () => {
    const context = useContext(ThemeContext);
    if (!context)
        throw new Error("useThemeToggle must be used within ThemeProvider");
    return context;
};

export type ThemeState = {
    theme: ThemeBase;
    isDark: boolean;
    toggleTheme: () => void;
    isReady: boolean;
};

// Load theme preference from storage
const useLoadTheme = (
    setIsDark: (value: boolean) => void,
    setIsReady: (value: boolean) => void,
) => {
    useEffect(() => {
        const loadTheme = async () => {
            try {
                const stored = await AsyncStorage.getItem(THEME_PREFERENCE_KEY);
                if (stored === "dark") setIsDark(true);
                else if (stored === "light") setIsDark(false);
            } catch (e) {
                console.error("Failed to load theme", e);
            } finally {
                setIsReady(true);
            }
        };
        loadTheme();
    }, []);
};

// Save theme preference to storage
const useSaveTheme = (isDark: boolean) => {
    return useCallback(async () => {
        const next = !isDark;
        try {
            await AsyncStorage.setItem(
                THEME_PREFERENCE_KEY,
                next ? "dark" : "light",
            );
        } catch (e) {
            console.error("Failed to save theme", e);
        }
        return next;
    }, [isDark]);
};

export const useThemePreference = (): ThemeState => {
    const [isDark, setIsDark] = useState(true);
    const [isReady, setIsReady] = useState(false);

    useLoadTheme(setIsDark, setIsReady);

    const saveTheme = useSaveTheme(isDark);

    const toggleTheme = useCallback(async () => {
        const next = await saveTheme();
        setIsDark(next);
    }, [saveTheme]);

    const theme = isDark ? ArmyDarkTheme : ArmyLightTheme;

    return { theme, isDark, toggleTheme, isReady };
};
