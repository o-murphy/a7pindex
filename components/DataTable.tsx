import React from "react";
import { FlatList } from "react-native";
import { ProfileIndexType, ProfilesJson, useFilterContext } from "@/hooks/FilterHook";
import { HeaderRow, ItemRow } from "./ItemRow";
import { Surface } from "react-native-paper";

const filterIndex = (profiles: Array<Partial<ProfileIndexType>>, filter: Partial<ProfileIndexType>) => {
    return profiles
        .filter(item => filter.caliber ? item.meta?.caliber?.toLowerCase() === filter.caliber?.toLowerCase() : true)
        .filter(item => filter.bulletVendor ? item.meta?.bulletVendor.toLowerCase() === filter.bulletVendor?.toLowerCase() : true)
        .filter(item => filter.cartridgeVendor ? item.meta?.vendor.toLowerCase() === filter.cartridgeVendor?.toLowerCase() : true)
        .filter(item => filter.diameter ? item.diameter === filter.diameter : true)
        .filter(item => filter.weight ? item.weight === filter.weight : true)
        .filter(item => filter.dragModelType ? item.dragModelType === filter.dragModelType : true);
};

const ProfilesDataTable = () => {
    const { profiles } = ProfilesJson;
    const { filter } = useFilterContext();
    const filteredProfiles = filterIndex(profiles, filter);

    return (
        <Surface style={{ flexDirection: "column", padding: 8, margin: 8, flex: 1 }}>
            {/* <HeaderRow /> */}
            <FlatList
                data={filteredProfiles}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => <ItemRow item={item} />}
                contentContainerStyle={{ flexGrow: 1 }}
                initialNumToRender={10}
            />
        </Surface>
    );
};

export default ProfilesDataTable;