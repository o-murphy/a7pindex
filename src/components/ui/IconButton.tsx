import React from "react";
import type { LucideIcon } from "lucide-react";

type IconButtonVariant = "outlined" | "tonal";

type IconButtonProps = {
    icon: LucideIcon;
    variant?: IconButtonVariant;
    size?: number;
    label?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const IconButton: React.FC<IconButtonProps> = ({
    icon: Icon,
    variant = "outlined",
    size = 20,
    label,
    className = "",
    ...props
}) => {
    const variantClasses =
        variant === "outlined"
            ? "border border-outline text-on-surface hover:bg-surface-variant/40"
            : "bg-secondary-container text-on-secondary-container hover:opacity-90";

    return (
        <button
            type="button"
            aria-label={label}
            className={`inline-flex items-center justify-center rounded-full p-2 transition-colors cursor-pointer ${variantClasses} ${className}`}
            {...props}
        >
            <Icon size={size} />
        </button>
    );
};

export default IconButton;
