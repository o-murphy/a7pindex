import { useCallback, useContext, useEffect, useState, createContext } from "react";

const THEME_PREFERENCE_KEY = "theme_preference";

export type ThemeContextType = {
    isDark: boolean;
    toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
    undefined,
);

export const useThemeToggle = () => {
    const context = useContext(ThemeContext);
    if (!context)
        throw new Error("useThemeToggle must be used within ThemeProvider");
    return context;
};

const readStoredPreference = (): boolean => {
    try {
        const stored = localStorage.getItem(THEME_PREFERENCE_KEY);
        if (stored === "light") return false;
    } catch {
        // ignore storage access errors
    }
    return true;
};

export const useThemePreference = (): ThemeContextType => {
    const [isDark, setIsDark] = useState<boolean>(readStoredPreference);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", isDark);
        try {
            localStorage.setItem(
                THEME_PREFERENCE_KEY,
                isDark ? "dark" : "light",
            );
        } catch {
            // ignore storage access errors
        }
    }, [isDark]);

    const toggleTheme = useCallback(() => {
        setIsDark((prev) => !prev);
    }, []);

    return { isDark, toggleTheme };
};
