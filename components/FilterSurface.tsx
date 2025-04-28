import { useCallback, useEffect, useState } from "react";
import {
    Button,
    Chip,
    ChipProps,
    Icon,
    Surface,
    Text,
    TextInput,
    useTheme,
} from "react-native-paper";
import Select from "./Select";
import {
    ProfileIndexType,
    ProfilesJson,
    useFilterContext,
} from "@/hooks/FilterHook";
import DecimalInput from "./Decimalnput";
import { TouchableOpacity, View } from "react-native";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";

const allValues = "All";

const { uniqueKeys } = ProfilesJson;
const { calibers, cartridgeVendors, bulletVendors } = uniqueKeys;
const dragModelTypes = ["G1", "G7", "CUSTOM"];

const FilterView = () => {
    const { filter, setFilter } = useFilterContext();

    const [localFilter, setLocalFilter] = useState<Partial<ProfileIndexType>>(
        {},
    );

    useEffect(() => {
        setLocalFilter(() => filter);
    }, [filter]);

    const onFilterChange = (key: string, value: any) => {
        setFilter({
            ...filter,
            [key]: value === allValues ? null : value,
        });
    };

    const applyFilter = () => {
        setFilter({
            ...filter,
            caliber: localFilter?.caliber,
            bulletVendor: localFilter?.bulletVendor,
            cartridgeVendor: localFilter?.cartridgeVendor,
            dragModelType: localFilter?.dragModelType,
        });
    };

    return (
        <View style={{ flexDirection: "column", flexWrap: "wrap", gap: 8 }}>
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
            <View style={{ flexDirection: "row", gap: 8 }}>
                <DecimalInput
                    value={(filter.diameter || 0).toString()}
                    onChangeText={(value) =>
                        onFilterChange("diameter", parseFloat(value))
                    }
                    mode={"outlined"}
                    dense={true}
                    label={"Diameter"}
                    inputMode={"decimal"}
                    right={<TextInput.Affix text="inch" />}
                    style={{ width: 125 }}
                />
                <DecimalInput
                    value={(filter.weight || 0).toString()}
                    onChangeText={(value) =>
                        onFilterChange("weight", parseFloat(value))
                    }
                    mode={"outlined"}
                    dense={true}
                    label={"Weight"}
                    inputMode={"decimal"}
                    right={<TextInput.Affix text="gr" />}
                    style={{ width: 125 }}
                />
            </View>
            <Select
                label={"Drag Model"}
                items={[allValues, ...dragModelTypes]}
                value={localFilter.dragModelType ?? allValues}
                onChange={(value) => onFilterChange("dragModelType", value)}
            />
            <Button icon={"check"} mode={"outlined"} onPress={applyFilter}>
                Apply filter
            </Button>
        </View>
    );
};

interface FilterChipProps extends ChipProps {
    key?: any | undefined;
}

const FilterChip: React.FC<FilterChipProps> = ({
    children,
    key = undefined,
    ...props
}) => {
    const [hovered, setHovered] = useState(false);

    const theme = useTheme();

    return (
        <Chip
            style={[
                props.style,
                hovered && { backgroundColor: theme.colors.errorContainer },
            ]}
            key={key}
            {...props}
            onPointerEnter={() => setHovered(true)}
            onPointerLeave={() => setHovered(false)}
        >
            {children}
        </Chip>
    );
};

const FilterSurface = () => {
    const theme = useTheme();
    const { layout: layoutMode } = useResponsiveLayout();
    const [collapsed, setCollapsed] = useState<boolean>(true);
    const { filter, setFilter } = useFilterContext();

    const clearChip = (key: string) => {
        setFilter({
            ...filter,
            [key]: null,
        });
    };

    const resetFilter = () => {
        console.log("RESET");
        setFilter({
            diameter: 0,
            weight: 0,
            caliber: "",
            bulletVendor: "",
            cartridgeVendor: "",
            dragModelType: undefined,
        });
    };

    const renderChips = useCallback(() => {
        const fmt = (key: string, value: any) => {
            if (key === "diameter") {
                return `${value} inch`;
            } else if (key === "weight") {
                return `${value} gr`;
            }
            return value;
        };

        const chips = Object.entries(filter)
            .map(([key, value]) => {
                if (!value) {
                    return null;
                }
                return (
                    <FilterChip
                        key={key}
                        closeIcon={"close"}
                        onPress={() => clearChip(key)}
                        onClose={() => clearChip(key)}
                    >
                        {fmt(key, value)}
                    </FilterChip>
                );
            })
            .filter((chip) => chip !== null); // Filter out the null values

        console.log(chips);
        return (
            <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap" }}>
                {chips}
                {chips.length > 0 && (
                    <FilterChip
                        onPress={resetFilter}
                        closeIcon={"filter-off"}
                        onClose={resetFilter}
                        style={{
                            backgroundColor: theme.colors.tertiaryContainer,
                        }}
                    >
                        Reset filter
                    </FilterChip>
                )}
            </View>
        );
    }, [filter, clearChip, resetFilter]);

    return (
        <Surface style={{ gap: 8, padding: 8 }}>
            {(layoutMode === "mobile" && collapsed) || <FilterView />}
            {layoutMode === "mobile" && (
                <TouchableOpacity
                    style={{
                        flexDirection: "row",
                        gap: 8,
                        padding: 8,
                        justifyContent: "space-between",
                    }}
                    onPress={() => setCollapsed(!collapsed)}
                >
                    <Icon source={"filter"} size={20} />
                    <Text>{collapsed ? "Show filter" : "Hide filter"}</Text>
                    <Icon
                        source={collapsed ? "chevron-down" : "chevron-up"}
                        size={20}
                    />
                </TouchableOpacity>
            )}
            {renderChips()}
        </Surface>
    );
};

export default FilterSurface;
