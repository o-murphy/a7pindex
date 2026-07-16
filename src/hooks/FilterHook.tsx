import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
} from "react";

export type ProfileIndexType = {
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

export type UniqueKeysType = {
    calibers: string[];
    diameters: number[];
    bulletVendors: string[];
    cartridgeVendors: string[];
};

export type ProfilesJsonType = {
    profiles: Array<Partial<ProfileIndexType>>;
    uniqueKeys: UniqueKeysType;
};

const fetchDataFromWebhook = async (webhookUrl: string) => {
    try {
        const response = await fetch(webhookUrl, {
            method: "GET",
        });

        if (!response.ok) {
            throw new Error(`Webhook request failed: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error: any) {
        console.error("Error fetching from webhook:", error);
        throw error;
    }
};

interface FilterContextType {
    filter: Partial<ProfileIndexType>;
    setFilter: React.Dispatch<React.SetStateAction<Partial<ProfileIndexType>>>;
    webHookData?: Partial<ProfilesJsonType | null | undefined>;
}

export const FilterContext = createContext<FilterContextType | null>(null);

interface FilterProviderProps {
    children: ReactNode;
}

export const FilterProvider: React.FC<FilterProviderProps> = ({
    children,
}) => {
    const [webHookData, setWebhookData] = useState<
        Partial<ProfilesJsonType | null | undefined>
    >({});

    const [filter, setFilter] = useState<Partial<ProfileIndexType>>({});

    const webhookUrl = "https://o-murphy.net/a7p-lib/public/profiles.json";

    useEffect(() => {
        const handleFetchData = async () => {
            try {
                const data = await fetchDataFromWebhook(webhookUrl);
                setWebhookData(data);
            } catch (err) {
                setWebhookData(null);
                console.error(err);
            }
        };
        handleFetchData();
    }, []);

    return (
        <FilterContext.Provider value={{ filter, setFilter, webHookData }}>
            {children}
        </FilterContext.Provider>
    );
};

export const useFilterContext = (): FilterContextType => {
    const context = useContext(FilterContext);
    if (!context) {
        throw new Error(
            "useFilterContext must be used within a FilterProvider",
        );
    }
    return context;
};
