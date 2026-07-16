import { useEffect, useState } from "react";

const MIN_DESKTOP_WIDTH = 600;

export const detectDevice = () => {
    if (typeof navigator === "undefined") {
        return "unknown";
    }

    const ua = navigator.userAgent;

    if (/android/i.test(ua)) {
        return "Android";
    }
    if (/iPad|iPhone|iPod/.test(ua)) {
        return "iOS";
    }
    if (/Windows NT/.test(ua)) {
        return "Windows";
    }
    if (/Macintosh/.test(ua)) {
        return "Mac";
    }
    if (/Linux/.test(ua)) {
        return "Linux";
    }

    return "unknown";
};

export const isMobileUA = () => {
    const dev = detectDevice();
    switch (dev) {
        case "Android":
        case "iOS":
            return true;
        default:
            return false;
    }
};

export const isMobileWidth = () => {
    return window.innerWidth < MIN_DESKTOP_WIDTH;
};

export const useResponsiveLayout = (): {
    layout: "mobile" | "desktop";
    width: number;
    height: number;
} => {
    const [layout, setLayout] = useState<"mobile" | "desktop">("desktop");
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const updateLayout = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            const mobile = isMobileUA() || isMobileWidth();
            setLayout(mobile ? "mobile" : "desktop");
            setDimensions({ width, height });
        };

        updateLayout();

        window.addEventListener("resize", updateLayout);
        return () => {
            window.removeEventListener("resize", updateLayout);
        };
    }, []);

    return { layout, ...dimensions };
};
