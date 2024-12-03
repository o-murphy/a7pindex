import React, { useState } from "react";
import { FAB, Surface, TextInput } from "react-native-paper";
import Select from "./Select";
import { ProfileIndexType, ProfilesJson, useFilterContext } from "@/hooks/FilterHook";

const FilterSurface = () => {
    const { uniqueKeys } = ProfilesJson;
    const { calibers, cartridgeVendors, bulletVendors } = uniqueKeys;
    const dragModelTypes = ["G1", "G7", "CUSTOM"];

    const { filter, setFilter } = useFilterContext();

    const [localFilter, setLocalFilter] = useState<Partial<ProfileIndexType>>({});

    // Helper function to check if the filter is empty
    const isFilterEmpty = () =>
        Object.values(filter).every((value) => value === null || value === undefined);

    const onFilterChange = (key: string, value: any) => {
        setLocalFilter((prevFilter) => ({
            ...prevFilter,
            [key]: value === "All" ? null : value,
        }));
    };

    const applyFilter = () => {
        setFilter(localFilter);
    };

    const resetFilter = () => {
        setLocalFilter({});
        setFilter({});
    };

    console.log(filter);

    return (
        <Surface elevation={3} style={{ flexDirection: "row", flexWrap: "wrap", padding: 8, margin: 8 }}>
            <Select
                label={"Caliber"}
                items={["All", ...calibers]}
                value={localFilter.caliber ?? "All"}
                onChange={(value) => onFilterChange("caliber", value)}
            />
            <Select
                label={"Cartridge vendor"}
                items={["All", ...cartridgeVendors]}
                value={localFilter.cartridgeVendor ?? "All"}
                onChange={(value) => onFilterChange("cartridgeVendor", value)}
            />
            <Select
                label={"Bullet vendor"}
                items={["All", ...bulletVendors]}
                value={localFilter.bulletVendor ?? "All"}
                onChange={(value) => onFilterChange("bulletVendor", value)}
            />
            <TextInput
                mode={"outlined"}
                dense={true}
                label={"Diameter"}
                inputMode="decimal"
                style={{ margin: 4 }}
                onChangeText={(value) => onFilterChange("diameter", parseFloat(value))}
            />
            <TextInput
                mode={"outlined"}
                dense={true}
                label={"Weight"}
                inputMode="decimal"
                style={{ margin: 4 }}
                onChangeText={(value) => onFilterChange("weight", parseFloat(value))}
            />
            <Select
                label={"Drag Model"}
                items={["All", ...dragModelTypes]}
                value={localFilter.dragModelType ?? "All"}
                onChange={(value) => onFilterChange("dragModelType", value)}
            />
            <Surface elevation={0} style={{ flexDirection: "row" }}>
                <Surface elevation={0} style={{ justifyContent: "center", margin: 4 }}>
                    <FAB size={"small"} variant={"secondary"} style={{}} icon={"filter"} onPress={applyFilter} />
                </Surface>
                <Surface elevation={0} style={{ justifyContent: "center", margin: 4 }}>
                    <FAB
                        size={"small"}
                        variant={"secondary"}
                        style={{}}
                        icon={"filter-off"}
                        onPress={resetFilter}
                        disabled={isFilterEmpty()}
                    />
                </Surface>
            </Surface>
        </Surface>
    );
};

export default FilterSurface;
