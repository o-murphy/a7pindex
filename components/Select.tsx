import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
    View,
    FlatList,
    Keyboard,
    TouchableOpacity,
    Dimensions,
    LayoutRectangle,
} from 'react-native';
import { Dialog, Divider, List, MD3DarkTheme, Portal, TextInput } from 'react-native-paper';

type SelectProps = {
    label?: string;
    items?: Array<string> | null;
    value?: any,
    onChange?: (value: any) => void;
};

const Select = ({ label = "<LABEL>", items, value, onChange }: SelectProps) => {
    const [userinput, setUserInput] = useState<string>(value);
    const [show, setShow] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState<{
        x: number;
        y: number;
        width: number;
        height: number;
    } | null>(null);

    const inputRef = useRef<View>(null);

    useEffect(() => {
        setUserInput(value)
    }, [value])

    // const togglePicker = useCallback(() => {
    //     Keyboard.dismiss();
    //     setShow((prev) => !prev);


    // }, []);

    const hidePicker = useCallback(
        (item: string) => {
            setShow(false);
            setUserInput(item);
            onChange?.(item);
        },
        [onChange]
    );

    const localItems = items ?? ["All", "Mr", "Mrs", "Miss"];

    const togglePicker = useCallback(() => {
        if (inputRef.current) {
            inputRef.current.measure(
                (x, y, width, height, pageX, pageY) => {
                    setDropdownPosition({
                        x: pageX,
                        y: pageY + height,
                        width,
                        height,
                    });
                    setShow((prev) => !prev);
                }
            );
        }
    }, []);

    return (
        <TouchableOpacity onPress={togglePicker} activeOpacity={1}>
            <View ref={inputRef}>
                <TextInput
                    mode="outlined"
                    label={label}
                    readOnly={true}
                    // placeholder={userinput || localItems[0]}
                    placeholder={label}
                    value={userinput ?? ""}
                    dense={true}
                    right={
                        <TextInput.Icon
                            onPress={togglePicker}
                            icon={show ? "chevron-up" : "chevron-down"}
                        />
                    }
                />
            </View>
            {show && dropdownPosition && (
                <Portal>
                    <Dialog visible={true} onDismiss={togglePicker} style={{ backgroundColor: "transparent" }}>
                        <FlatList
                            style={{
                                position: 'absolute',
                                top: dropdownPosition.y - dropdownPosition.height - Dimensions.get("window").height / 2,
                                left: dropdownPosition.x,
                                width: dropdownPosition.width,
                                maxHeight: Dimensions.get("window").height / 2,
                                backgroundColor: MD3DarkTheme.colors.background,
                                elevation: 5,
                            }}
                            data={localItems}
                            renderItem={({ item }) => (
                                <View>
                                    <List.Item
                                        style={{
                                            backgroundColor: MD3DarkTheme.colors.elevation.level5,
                                        }}
                                        title={item}
                                        onPress={() => hidePicker(item)}
                                    />
                                    <Divider />
                                </View>
                            )}
                            keyExtractor={(item) => item}
                            keyboardShouldPersistTaps="handled"
                        />
                    </Dialog>
                </Portal>
            )}
        </TouchableOpacity>
    );
};

export default Select;
