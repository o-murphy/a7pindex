import React, { useEffect, useState } from "react";
import { TextInput, TextInputProps } from "react-native-paper";
import { debounce } from "lodash";

type DecimalInputProps = {
    value: string; 
    onChangeText: (value: string) => void;
} & Partial<TextInputProps>; // Merge with TextInputProps


const DecimalInput: React.FC<DecimalInputProps> = ({ value, onChangeText, ...props }) => {


    const [localValue, setLocalValue] = useState(value)

    const onDebounceSearch = debounce((value: string) => {
        onChangeText(value);
    }, 1000);

    const onChangeSearchText = (val: string) => {
        handleInputChange(val);
        onDebounceSearch(val);
    };

    const handleInputChange = (text: string) => {
        
        // Allow only numbers and a single decimal point
        const validText = text.replace(/[^0-9.,]/g, "");

        // Prevent multiple decimal points
        if ((validText.match(/[.,]/g) || []).length > 1) {
            return;
        }
        if (validText) {
            // onChangeText?.(validText);
            setLocalValue(validText)
        } else {
            // onChangeText?.("")
            setLocalValue("")
        }
    };

    useEffect(() => {
        setLocalValue(value)
    }, [value])

    return (
        <TextInput
            value={localValue ?? ""}
            onChangeText={onChangeSearchText}
            {...props}
        />
    );
};

export default DecimalInput;
