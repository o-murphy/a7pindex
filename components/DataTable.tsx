import React from "react"
import { ScrollView } from "react-native"
import { ProfileIndexType, ProfilesJson, useFilterContext } from "@/hooks/FilterHook";
import ItemRow from "./ItemRow";



// const filterIndex = (data: Array<Partial<ProfileIndexType>>, criteria: Partial<ProfileIndexType>) => {
//     return data.filter(item => {
//         // Check if all criteria are met
//         return Object.entries(criteria).every(([key, value]) => {
//             const itemValue = item[key as keyof ProfileIndexType];

//             // Handle string comparison case-insensitively
//             if (typeof value === 'string' && typeof itemValue === 'string') {
//                 return itemValue.toLowerCase() === value.toLowerCase();
//             }

//             if (!value) {
//                 return true
//             }

//             // Handle non-string values normally
//             return itemValue === value;
//         });
//     });
// };


const filterIndex = (profiles: Array<Partial<ProfileIndexType>>, filter: Partial<ProfileIndexType>) => {
    return profiles
    .filter(item => filter.caliber ? item.meta?.caliber?.toLowerCase() === filter.caliber?.toLowerCase() : true)
    .filter(item => filter.bulletVendor ? item.meta?.bulletVendor.toLowerCase() === filter.bulletVendor?.toLowerCase() : true)
    .filter(item => filter.cartridgeVendor ? item.meta?.vendor.toLowerCase() === filter.cartridgeVendor?.toLowerCase() : true)
    .filter(item => filter.diameter ? item.diameter === filter.diameter : true)
    .filter(item => filter.weight ? item.weight === filter.weight : true)
    .filter(item => filter.dragModelType ? item.dragModelType === filter.dragModelType : true);
}



const ProfilesDataTable = () => {
    const { profiles } = ProfilesJson;
    const { filter } = useFilterContext();
    const filteredProfiles = filterIndex(profiles, filter);

    console.log(filter)

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