import React, { createContext, useContext, useState, ReactNode } from "react";
import profilesJson from "@/assets/profiles.json";

// Define the type for the filter object
type ProfileIndexType = {
    id?: number,
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

// Ensure profilesJson matches ProfilesJsonType
const ProfilesJson = profilesJson as ProfilesJsonType;

// Define the context value type
interface FilterContextType {
    filter: Partial<ProfileIndexType>;
    setFilter: React.Dispatch<React.SetStateAction<Partial<ProfileIndexType>>>;
}

// Create the context with a default null value
const FilterContext = createContext<FilterContextType | null>(null);

// Define the provider props type
interface FilterProviderProps {
    children: ReactNode;
}

// Define the FilterProvider component
const FilterProvider: React.FC<FilterProviderProps> = ({ children }) => {
    const [filter, setFilter] = useState<Partial<ProfileIndexType>>({}); // Initialize with an empty object

    return (
        <FilterContext.Provider value={{ filter, setFilter }}>
            {children}
        </FilterContext.Provider>
    );
};

// Custom hook for using the FilterContext
const useFilterContext = (): FilterContextType => {
    const context = useContext(FilterContext);
    if (!context) {
        throw new Error("useFilterContext must be used within a FilterProvider");
    }
    return context;
};

export {
    ProfileIndexType,
    FilterContext,
    FilterProvider,
    useFilterContext,
    UniqueKeysType,
    ProfilesJson,
    ProfilesJsonType
};
