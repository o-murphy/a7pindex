import { useEffect, useState } from "react";

type DecimalInputProps = {
    value: string;
    onChangeText: (value: string) => void;
    label: string;
    suffix?: string;
    className?: string;
};

const DecimalInput: React.FC<DecimalInputProps> = ({
    value,
    onChangeText,
    label,
    suffix,
    className = "",
}) => {
    const [localValue, setLocalValue] = useState(value);

    const commitChange = () => {
        onChangeText(localValue);
    };

    const handleInputChange = (text: string) => {
        const validText = text.replace(/[^0-9.,]/g, "");

        if ((validText.match(/[.,]/g) || []).length > 1) {
            return;
        }
        setLocalValue(validText);
    };

    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    return (
        <div className={className}>
            <label className="mb-1 block text-xs text-on-surface-variant">
                {label}
            </label>
            <div className="flex items-center rounded border border-outline bg-surface px-3">
                <input
                    value={localValue ?? ""}
                    onChange={(e) => handleInputChange(e.target.value)}
                    onBlur={commitChange}
                    inputMode="decimal"
                    className="w-full py-2 text-sm text-on-surface outline-none"
                />
                {suffix && (
                    <span className="text-sm text-on-surface-variant">
                        {suffix}
                    </span>
                )}
            </div>
        </div>
    );
};

export default DecimalInput;
