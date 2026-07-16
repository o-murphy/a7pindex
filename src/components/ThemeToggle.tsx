import { Moon, Sun } from "lucide-react";
import { useThemeToggle } from "@/hooks/useThemeToggle";
import { IconButton } from "@/components/ui/IconButton";

export const ThemeToggle = () => {
    const { isDark, toggleTheme } = useThemeToggle();

    return (
        <IconButton
            icon={isDark ? Moon : Sun}
            label="Toggle theme"
            onClick={toggleTheme}
        />
    );
};

export default ThemeToggle;
