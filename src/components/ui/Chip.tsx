import React from "react";
import { X } from "lucide-react";

type ChipProps = {
    onPress: () => void;
    tone?: "default" | "tertiary";
    children: React.ReactNode;
};

export const Chip: React.FC<ChipProps> = ({
    onPress,
    tone = "default",
    children,
}) => {
    const toneClasses =
        tone === "tertiary"
            ? "bg-tertiary-container text-on-tertiary-container"
            : "bg-secondary-container text-on-secondary-container hover:bg-error-container hover:text-on-error-container";

    return (
        <button
            type="button"
            onClick={onPress}
            className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm transition-colors cursor-pointer ${toneClasses}`}
        >
            {children}
            <X size={14} />
        </button>
    );
};

export default Chip;
