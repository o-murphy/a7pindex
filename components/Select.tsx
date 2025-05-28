import React, { useMemo } from "react";
import { TextInput } from "react-native-paper";
import { Dropdown, DropdownInputProps } from "react-native-paper-dropdown";

type SelectProps = {
    label: string;
    items: string[];
    value: string;
    onChange: (value: string) => void;
};

const renderInputIcon = () => {
    return <TextInput.Icon icon="menu-down" disabled />;
};

const Select = ({ label, items, value, onChange }: SelectProps) => {
    const options = useMemo(() => {
        return items
            ?.filter((item) => item !== "")
            .map((item: any, index: number) => {
                return {
                    label: item,
                    value: index.toString(),
                };
            });
    }, [items]);

    const handleSelect = (value?: string | undefined) => {
        if (value) {
            onChange(options?.[parseInt(value)].label || "");
        }
    };

    return (
        <Dropdown
            options={options || []}
            value={value || "All"}
            onSelect={handleSelect}
            hideMenuHeader
            maxMenuHeight={400}
            CustomDropdownInput={(props: DropdownInputProps) => (
                <TextInput
                    {...props}
                    label={label}
                    dense
                    mode="outlined"
                    value={value || "All"}
                    right={renderInputIcon()}
                />
            )}
        />
    );
};

export default Select;
