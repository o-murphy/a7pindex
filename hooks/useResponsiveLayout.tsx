import { useEffect, useState } from "react";
import { Dimensions, Platform } from "react-native";

const MIN_DESKTOP_WIDTH = 600;

export const detectDevice = () => {
    if (typeof navigator === "undefined") {
        return "unknown";
    }

    const ua = navigator.userAgent;

    if (/android/i.test(ua)) {
        return "Android";
    }
    if (/iPad|iPhone|iPod/.test(ua) && !(typeof window !== 'undefined' && (window as any).MSStream)) {
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
    console.log("Device", dev);
    switch (dev) {
        case "Android":
        case "iOS":
            return true;
        default:
            return false;
    }
};

export const isWebPlatform = () => {
    console.log("Platform", Platform.OS);
    return Platform.OS === "web";
};

export const isMobileWidth = () => {
    const { width, height } = Dimensions.get("window");
    console.log("dimensions", width, height);
    return width < MIN_DESKTOP_WIDTH;
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
            const { width, height } = Dimensions.get("window");
            const mobile = isMobileUA() || isMobileWidth(); // Assuming these functions use width for mobile detection
            setLayout(mobile ? "mobile" : "desktop");
            setDimensions({ width, height });
        };

        updateLayout(); // Initial check

        const sub = Dimensions.addEventListener("change", updateLayout);
        return () => {
            sub.remove?.(); // Required for web compatibility
        };
    }, []);

    return { layout, ...dimensions };
};