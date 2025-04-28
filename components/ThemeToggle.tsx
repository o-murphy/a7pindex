import React from "react";
import { useThemeToggle } from "@/hooks/useThemeToggle";
import { Appbar, useTheme } from "react-native-paper";

export const ThemeToggle = () => {
    const theme = useTheme();
    const { toggleTheme } = useThemeToggle();

    return (
        <Appbar.Action
            size={24}
            icon={theme.dark ? "weather-night" : "weather-sunny"}
            onPress={toggleTheme}
        />
    );
};
