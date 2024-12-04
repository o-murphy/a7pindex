import React from "react"
import { ScrollView } from "react-native"
import { ProfileIndexType, ProfilesJson, useFilterContext } from "@/hooks/FilterHook";
import ItemRow from "./ItemRow";



const filterIndex = (data: Array<Partial<ProfileIndexType>>, criteria: Partial<ProfileIndexType>) => {
    return data.filter(item => {
        // Check if all criteria are met
        return Object.entries(criteria).every(([key, value]) => {
            const itemValue = item[key as keyof ProfileIndexType];

            // Handle string comparison case-insensitively
            if (typeof value === 'string' && typeof itemValue === 'string') {
                return itemValue.toLowerCase() === value.toLowerCase();
            }

            if (!value) {
                return true
            }

            // Handle non-string values normally
            return itemValue === value;
        });
    });
};


const ProfilesDataTable = () => {
    const { profiles } = ProfilesJson;
    const { filter } = useFilterContext();

    const filteredProfiles = filterIndex(profiles, filter);

    return (
        <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ overflow: "hidden" }}
        >
            {
                filteredProfiles.map((item, index) =>
                    <ItemRow item={item} key={index} />
                )
            }
        </ScrollView>
    )
};

export default ProfilesDataTable;