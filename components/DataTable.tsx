import { useCallback, useState } from "react";
import { FlatList, View } from "react-native";
import {
    ProfileIndexType,
    useFilterContext,
} from "@/hooks/FilterHook";
import { Item } from "./ItemRow";
import { Text } from "react-native-paper";

const filterIndex = (
    profiles: Array<Partial<ProfileIndexType>>,
    filter: Partial<ProfileIndexType>,
) => {
    return profiles
        .filter((item) =>
            filter.caliber
                ? item.meta?.caliber?.toLowerCase() ===
                filter.caliber?.toLowerCase()
                : true,
        )
        .filter((item) =>
            filter.bulletVendor
                ? item.meta?.bulletVendor.toLowerCase() ===
                filter.bulletVendor?.toLowerCase()
                : true,
        )
        .filter((item) =>
            filter.cartridgeVendor
                ? item.meta?.vendor.toLowerCase() ===
                filter.cartridgeVendor?.toLowerCase()
                : true,
        )
        .filter((item) =>
            filter.diameter ? item.diameter === filter.diameter : true,
        )
        .filter((item) =>
            filter.weight ? item.weight === filter.weight : true,
        )
        .filter((item) =>
            filter.dragModelType
                ? item.dragModelType === filter.dragModelType
                : true,
        );
};

const ITEM_WIDTH = 350 + 16;

const ProfilesDataTable = () => {
    const { webHookData: profilesIndex, filter } = useFilterContext();

    const [numColumns, setNumColumns] = useState(4);
    const [flatListKey, setFlatListKey] = useState("initialKey");
    const [containerHeight, setContainerHeight] = useState(0);

    const onLayout = useCallback(
        (event: { nativeEvent: { layout: { width: number; height: number } } }) => {
            const { width, height } = event.nativeEvent.layout;

            // Set the actual container height
            if (height > 0 && height !== containerHeight) {
                setContainerHeight(height);
            }

            // Calculate columns
            const calculatedColumns = Math.floor(width / ITEM_WIDTH);
            const newNumColumns = Math.max(1, calculatedColumns);
            if (newNumColumns !== numColumns) {
                setNumColumns(newNumColumns);
                setFlatListKey(`columns-${newNumColumns}`);
            }
        },
        [numColumns, containerHeight],
    );

    if (!profilesIndex || !profilesIndex.profiles) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onLayout={onLayout}>
                <Text>Loading data...</Text>
            </View>
        );
    }

    const filteredProfiles = filterIndex(profilesIndex.profiles, filter);

    return (
        <View style={{ flex: 1 }} onLayout={onLayout}>
            {containerHeight > 0 ? (
                <FlatList
                    key={flatListKey}
                    data={filteredProfiles}
                    numColumns={numColumns}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item }) => <Item item={item} />}
                    contentContainerStyle={{ flexGrow: 1 }}
                    initialNumToRender={10}
                    // style={{ height: containerHeight }}
                    style={{ height: 0 }}
                />
            ) : (
                // Fallback while measuring
                <View style={{ flex: 1 }} />
            )}
        </View>
    );
};

export default ProfilesDataTable;