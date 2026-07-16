import React from "react";
import {
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions,
} from "@headlessui/react";
import { Check, ChevronDown } from "lucide-react";

type SelectProps = {
    label: string;
    items: string[];
    value: string;
    onChange: (value: string) => void;
};

const Select: React.FC<SelectProps> = ({ label, items, value, onChange }) => {
    const options = items.filter((item) => item !== "");

    return (
        <Listbox value={value || "All"} onChange={onChange}>
            <div className="relative w-full">
                <label className="mb-1 block text-xs text-on-surface-variant">
                    {label}
                </label>
                <ListboxButton className="flex w-full items-center justify-between rounded border border-outline bg-surface px-3 py-2 text-left text-sm text-on-surface">
                    <span className="truncate">{value || "All"}</span>
                    <ChevronDown size={16} className="text-on-surface-variant" />
                </ListboxButton>
                <ListboxOptions
                    anchor="bottom start"
                    className="z-20 mt-1 max-h-[400px] w-[var(--button-width)] overflow-auto rounded border border-outline-variant bg-surface shadow-lg"
                >
                    {options.map((item) => (
                        <ListboxOption
                            key={item}
                            value={item}
                            className="group flex cursor-pointer items-center justify-between px-3 py-2 text-sm text-on-surface data-focus:bg-surface-variant/50"
                        >
                            {item}
                            <Check
                                size={16}
                                className="invisible text-primary group-data-selected:visible"
                                data-slot="check"
                            />
                        </ListboxOption>
                    ))}
                </ListboxOptions>
            </div>
        </Listbox>
    );
};

export default Select;
