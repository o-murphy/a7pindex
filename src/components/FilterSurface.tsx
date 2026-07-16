import { useEffect, useState } from "react";
import { Check, ChevronDown, ChevronUp, Filter, FilterX } from "lucide-react";
import Select from "./Select";
import DecimalInput from "./DecimalInput";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { ProfileIndexType, useFilterContext } from "@/hooks/FilterHook";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";

const allValues = "All";

const dragModelTypes = ["G1", "G7", "CUSTOM"];

const FilterView = () => {
    const { filter, setFilter, webHookData: profilesIndex } =
        useFilterContext();

    const [localFilter, setLocalFilter] = useState<Partial<ProfileIndexType>>(
        {},
    );

    useEffect(() => {
        setLocalFilter(filter);
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

    if (!profilesIndex) {
        return null;
    }

    const uniqueKeys = profilesIndex?.uniqueKeys || {
        calibers: [],
        cartridgeVendors: [],
        bulletVendors: [],
    };

    const { calibers, cartridgeVendors, bulletVendors } = uniqueKeys;

    return (
        <div className="flex flex-col flex-wrap gap-2">
            <Select
                label="Caliber"
                items={[allValues, ...calibers]}
                value={localFilter.caliber ?? allValues}
                onChange={(value) => onFilterChange("caliber", value)}
            />
            <Select
                label="Cartridge vendor"
                items={[allValues, ...cartridgeVendors]}
                value={localFilter.cartridgeVendor ?? allValues}
                onChange={(value) => onFilterChange("cartridgeVendor", value)}
            />
            <Select
                label="Bullet vendor"
                items={[allValues, ...bulletVendors]}
                value={localFilter.bulletVendor ?? allValues}
                onChange={(value) => onFilterChange("bulletVendor", value)}
            />
            <div className="flex gap-2">
                <DecimalInput
                    value={(filter.diameter || 0).toString()}
                    onChangeText={(value) =>
                        onFilterChange("diameter", parseFloat(value))
                    }
                    label="Diameter"
                    suffix="inch"
                    className="w-[125px]"
                />
                <DecimalInput
                    value={(filter.weight || 0).toString()}
                    onChangeText={(value) =>
                        onFilterChange("weight", parseFloat(value))
                    }
                    label="Weight"
                    suffix="gr"
                    className="w-[125px]"
                />
            </div>
            <Select
                label="Drag Model"
                items={[allValues, ...dragModelTypes]}
                value={localFilter.dragModelType ?? allValues}
                onChange={(value) => onFilterChange("dragModelType", value)}
            />
            <Button icon={Check} onClick={applyFilter}>
                Apply filter
            </Button>
        </div>
    );
};

const fmtChipValue = (key: string, value: any) => {
    if (key === "diameter") {
        return `${value} inch`;
    } else if (key === "weight") {
        return `${value} gr`;
    }
    return value;
};

const FilterSurface = () => {
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
        setFilter({
            diameter: 0,
            weight: 0,
            caliber: "",
            bulletVendor: "",
            cartridgeVendor: "",
            dragModelType: undefined,
        });
    };

    const activeEntries = Object.entries(filter).filter(([, value]) => value);

    return (
        <div
            className={`flex flex-col gap-2 bg-elevation-1 p-2 ${
                layoutMode === "desktop"
                    ? "w-80 shrink-0 overflow-y-auto border-r border-outline-variant"
                    : "w-full shrink-0"
            }`}
        >
            {(layoutMode === "mobile" && collapsed) || <FilterView />}
            {layoutMode === "mobile" && (
                <button
                    type="button"
                    className="flex items-center justify-between gap-2 p-2 text-on-surface"
                    onClick={() => setCollapsed(!collapsed)}
                >
                    <Filter size={20} />
                    <span>{collapsed ? "Show filter" : "Hide filter"}</span>
                    {collapsed ? (
                        <ChevronDown size={20} />
                    ) : (
                        <ChevronUp size={20} />
                    )}
                </button>
            )}
            <div className="flex flex-wrap gap-2">
                {activeEntries.map(([key, value]) => (
                    <Chip key={key} onPress={() => clearChip(key)}>
                        {fmtChipValue(key, value)}
                    </Chip>
                ))}
                {activeEntries.length > 0 && (
                    <button
                        type="button"
                        onClick={resetFilter}
                        className="inline-flex items-center gap-1 rounded-full bg-tertiary-container px-3 py-1.5 text-sm text-on-tertiary-container"
                    >
                        Reset filter
                        <FilterX size={14} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default FilterSurface;
