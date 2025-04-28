import React, { useCallback, useState } from "react";
import { FlatList, View } from "react-native";
import { ProfileIndexType, ProfilesJson, useFilterContext } from "@/hooks/FilterHook";
import { Item } from "./ItemRow";

const filterIndex = (profiles: Array<Partial<ProfileIndexType>>, filter: Partial<ProfileIndexType>) => {
    return profiles
        .filter(item => filter.caliber ? item.meta?.caliber?.toLowerCase() === filter.caliber?.toLowerCase() : true)
        .filter(item => filter.bulletVendor ? item.meta?.bulletVendor.toLowerCase() === filter.bulletVendor?.toLowerCase() : true)
        .filter(item => filter.cartridgeVendor ? item.meta?.vendor.toLowerCase() === filter.cartridgeVendor?.toLowerCase() : true)
        .filter(item => filter.diameter ? item.diameter === filter.diameter : true)
        .filter(item => filter.weight ? item.weight === filter.weight : true)
        .filter(item => filter.dragModelType ? item.dragModelType === filter.dragModelType : true);
};

const ITEM_WIDTH = 350 + 16;

const ProfilesDataTable = () => {
    const { profiles } = ProfilesJson;
    const { filter } = useFilterContext();
    const filteredProfiles = filterIndex(profiles, filter);

    const [numColumns, setNumColumns] = useState(4); // Default value
    const [flatListKey, setFlatListKey] = useState('initialKey');

    const onLayout = useCallback((event: { nativeEvent: { layout: { width: any; }; }; }) => {
        const { width } = event.nativeEvent.layout;
        const calculatedColumns = Math.floor(width / ITEM_WIDTH);
        const newNumColumns = Math.max(1, calculatedColumns);
        if (newNumColumns !== numColumns) {
            setNumColumns(newNumColumns);
            setFlatListKey(`columns-${newNumColumns}`);
        }
    }, [ITEM_WIDTH, numColumns]);

    return (
        <View style={{ flex: 1 }} onLayout={onLayout}>
            <FlatList
                key={flatListKey}
                data={filteredProfiles}
                numColumns={numColumns}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => <Item item={item} />}
                contentContainerStyle={{ flexGrow: 1 }}
                initialNumToRender={10}
            />
        </View>
    );
};

export default ProfilesDataTable;