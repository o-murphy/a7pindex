import React from "react";
import type { LucideIcon } from "lucide-react";

type ButtonVariant = "outlined" | "tonal" | "fab";
type ButtonColor = "primary" | "secondary" | "tertiary" | "error";

type ButtonProps = {
    variant?: ButtonVariant;
    color?: ButtonColor;
    icon?: LucideIcon;
    fullWidth?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const colorClasses: Record<ButtonColor, string> = {
    primary: "bg-primary-container text-on-primary-container",
    secondary: "bg-secondary-container text-on-secondary-container",
    tertiary: "bg-tertiary-container text-on-tertiary-container",
    error: "bg-error-container text-on-error-container",
};

const outlinedColorClasses: Record<ButtonColor, string> = {
    primary: "text-primary border-outline",
    secondary: "text-secondary border-outline",
    tertiary: "text-tertiary border-outline",
    error: "text-error border-outline",
};

export const Button: React.FC<ButtonProps> = ({
    variant = "outlined",
    color = "primary",
    icon: Icon,
    fullWidth,
    className = "",
    children,
    ...props
}) => {
    const base =
        "inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors cursor-pointer disabled:opacity-38 disabled:cursor-not-allowed";

    const variantClasses =
        variant === "outlined"
            ? `border ${outlinedColorClasses[color]} hover:bg-surface-variant/40`
            : variant === "fab"
              ? `shadow-md ${colorClasses[color]} hover:opacity-90 px-6 py-4`
              : `${colorClasses[color]} hover:opacity-90`;

    return (
        <button
            className={`${base} ${variantClasses} ${fullWidth ? "w-full" : ""} ${className}`}
            {...props}
        >
            {Icon && <Icon size={18} />}
            {children}
        </button>
    );
};

export default Button;
