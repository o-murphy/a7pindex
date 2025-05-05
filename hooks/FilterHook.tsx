import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

// Define the type for the filter object
type ProfileIndexType = {
    id?: number;
    diameter?: number;
    weight?: number;
    name?: string;
    caliber?: string;
    bulletVendor?: string | null;
    cartridgeVendor?: string | null;
    path?: string;
    profileName?: string;
    cartridge?: string;
    bullet?: string;
    dragModelType?: "G1" | "G7" | "CUSTOM";
    meta?: any;
};

// Corrected type for uniqueKeys
type UniqueKeysType = {
    calibers: string[];
    diameters: number[];
    bulletVendors: string[];
    cartridgeVendors: string[];
};

// Corrected ProfilesJsonType
type ProfilesJsonType = {
    profiles: Array<Partial<ProfileIndexType>>;
    uniqueKeys: UniqueKeysType; // Adjusted to match the structure in profilesJson
};


const fetchDataFromWebhook = async (webhookUrl: string) => {
    try {
        const response = await fetch(webhookUrl, {
            method: 'GET',
            headers: {
                // 'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Webhook request failed: ${response.status}`);
        }

        const data = await response.json(); // Or response.text(), depending on expected format
        return data;
    } catch (error: any) {
        console.error('Error fetching from webhook:', error);
        // Important:  In a real app, handle this error more robustly (e.g., show a user-friendly message).
        throw error; // Re-throw to be caught by caller.
    }
};


// Define the context value type
interface FilterContextType {
    filter: Partial<ProfileIndexType>;
    setFilter: React.Dispatch<React.SetStateAction<Partial<ProfileIndexType>>>;
    webHookData?: Partial<ProfilesJsonType | null | undefined>;
}

// Create the context with a default null value
const FilterContext = createContext<FilterContextType | null>(null);

// Define the provider props type
interface FilterProviderProps {
    children: ReactNode;
}

// Define the FilterProvider component
const FilterProvider: React.FC<FilterProviderProps> = ({ children }) => {
    const [webHookData, setWebhookData] = useState<Partial<ProfilesJsonType | null | undefined>>({}); // Initialize with an empty object

    const [filter, setFilter] = useState<Partial<ProfileIndexType>>({}); // Initialize with an empty object
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const webhookUrl = "https://portfolio.o-murphy.net/a7p-lib/public/profiles.json"

    useEffect(() => {
        const handleFetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchDataFromWebhook(webhookUrl);
                setWebhookData(data);
            } catch (err: any) {
                setError(err.message || 'An error occurred while fetching data.');
                setWebhookData(null); // Clear any previous data on error
            } finally {
                setLoading(false);
            }
            console.log("FETCHED")
        }
        handleFetchData();
    }, []);

    return (
        <FilterContext.Provider value={{ filter, setFilter, webHookData }}>
            {children}
        </FilterContext.Provider>
    );
};

// Custom hook for using the FilterContext
const useFilterContext = (): FilterContextType => {
    const context = useContext(FilterContext);
    if (!context) {
        throw new Error(
            "useFilterContext must be used within a FilterProvider",
        );
    }
    return context;
};

export {
    ProfileIndexType,
    FilterContext,
    FilterProvider,
    useFilterContext,
    UniqueKeysType,
    ProfilesJsonType,
};
