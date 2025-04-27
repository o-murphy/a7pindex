import React, { useEffect, useState } from "react";
import { FAB, Surface } from "react-native-paper";
import Select from "./Select";
import { ProfileIndexType, ProfilesJson, useFilterContext } from "@/hooks/FilterHook";
import DecimalInput from "./Decimalnput";


const allValues = "All";

const FilterSurface = () => {
    const { uniqueKeys } = ProfilesJson;
    const { calibers, cartridgeVendors, bulletVendors } = uniqueKeys;
    const dragModelTypes = ["G1", "G7", "CUSTOM"];

    const { filter, setFilter } = useFilterContext();

    const [localFilter, setLocalFilter] = useState<Partial<ProfileIndexType>>({});
    const [diameter, setDiameter] = useState<string>((filter?.diameter || 0)?.toFixed(3))
    const [weight, setWeight] = useState<string>((filter?.weight || 0)?.toFixed(1))

    // Helper function to check if the filter is empty
    const isFilterEmpty = () =>
        Object.values(filter).every((value) => value === null || value === undefined);

    const onFilterChange = (key: string, value: any) => {
        setLocalFilter((prevFilter) => ({
            ...prevFilter,
            [key]: value === allValues ? null : value,
        }));
    };

    useEffect(() => {
        applyFilter();
    }, [weight, diameter, localFilter])

    const applyFilter = () => {
        setFilter({
            diameter: parseFloat(diameter.replace(",", ".")) || 0,
            weight: parseFloat(weight.replace(",", ".")) || 0,
            caliber: localFilter?.caliber,
            bulletVendor: localFilter?.bulletVendor,
            cartridgeVendor: localFilter?.cartridgeVendor,
            dragModelType: localFilter?.dragModelType
        });
    };

    const resetFilter = () => {
        setDiameter((0).toFixed(3))
        setWeight((0).toFixed(1))
        setLocalFilter({});
    };

    return (
        <Surface style={{ flexDirection: "column", flexWrap: "wrap", padding: 8, margin: 8 }}>
            <Select
                label={"Caliber"}
                items={[allValues, ...calibers]}
                value={localFilter.caliber ?? allValues}
                onChange={(value) => onFilterChange("caliber", value)}
            />
            <Select
                label={"Cartridge vendor"}
                items={[allValues, ...cartridgeVendors]}
                value={localFilter.cartridgeVendor ?? allValues}
                onChange={(value) => onFilterChange("cartridgeVendor", value)}
            />
            <Select
                label={"Bullet vendor"}
                items={[allValues, ...bulletVendors]}
                value={localFilter.bulletVendor ?? allValues}
                onChange={(value) => onFilterChange("bulletVendor", value)}
            />
            <DecimalInput
                value={diameter}
                onChangeText={setDiameter}
                mode={"outlined"}
                dense={true}
                label={"Diameter"}
                inputMode={"decimal"}
                // keyboardType={"numeric"}
                style={{ margin: 4 }}
            />
            <DecimalInput
                value={weight}
                onChangeText={setWeight}
                mode={"outlined"}
                dense={true}
                label={"Weight"}
                inputMode={"decimal"}
                // keyboardType={"numeric"}
                style={{ margin: 4 }}
            />
            <Select
                label={"Drag Model"}
                items={[allValues, ...dragModelTypes]}
                value={localFilter.dragModelType ?? allValues}
                onChange={(value) => onFilterChange("dragModelType", value)}
            />
            <Surface elevation={0} style={{ flexDirection: "row" }}>
                <Surface elevation={0} style={{ justifyContent: "center", margin: 4 }}>
                    <FAB
                        size={"small"}
                        variant={"secondary"}
                        mode="flat"
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
