import React from "react";

type TooltipProps = {
    title: string;
    children: React.ReactNode;
};

export const Tooltip: React.FC<TooltipProps> = ({ title, children }) => {
    return (
        <span className="group relative inline-flex">
            {children}
            <span
                role="tooltip"
                className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-inverse-surface px-2 py-1 text-xs text-inverse-on-surface opacity-0 transition-opacity group-hover:opacity-100"
            >
                {title}
            </span>
        </span>
    );
};

export default Tooltip;
