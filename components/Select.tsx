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
                    style={{ margin: 4 }}
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


// import React, { useState, useCallback } from 'react';
// import { View, FlatList, Keyboard, TouchableOpacity } from 'react-native';
// import { Divider, List, MD3DarkTheme, Portal, TextInput } from 'react-native-paper';

// type SelectProps = {
//     label?: string,
//     items?: Array<string> | null;
//     onChange?: (value: any) => void;
// }


// const Select = ({ label = "<LABEL>", items, onChange }: SelectProps) => {
//     const [userinput, setUserinput] = useState<string>("");
//     const [show, setShow] = useState(false);

//     const togglePicker = useCallback(() => {
//         Keyboard.dismiss();
//         setShow(!show);
//     }, [show]);

//     const showPicker = useCallback(() => {
//         Keyboard.dismiss();
//         setShow(true);
//     }, [show]);

//     const hideWithDismiss = useCallback(() => {
//         Keyboard.dismiss();
//         setShow(false);
//     }, [show]);

//     const localItems = items ?? ["All", 'Mr', 'Mrs', 'Miss']

//     const hidePicker = useCallback(
//         (item: string) => {
//             setShow(false);
//             setUserinput(item);
//             onChange?.(item);
//         },
//         []
//     );

//     return (
//         <TouchableOpacity onPress={togglePicker}>
//             <TextInput
//                 mode={"outlined"} label={label}
//                 readOnly={true}
//                 placeholder={show ? "All" : localItems[0]}
//                 value={userinput}
//                 style={{ margin: 4 }}
//                 onChangeText={(text) => setUserinput(text)}
//                 right={
//                     <TextInput.Icon
//                         onPress={togglePicker}
//                         icon={show ? "chevron-up" : "chevron-down"}
//                     />
//                 }
//             />
//             {show && (
//                 <Portal theme={MD3DarkTheme}>
//                     <FlatList
//                         style={{
//                             elevation: 5,
//                             zIndex: 1000,
//                             position: 'relative',
//                             marginTop: 50,
//                             width: 250,
//                             height: "50%",
//                             top: 100, // Adjust based on your layout
//                             left: 16,
//                             right: 0,
//                         }}
//                         data={localItems}
//                         renderItem={({ item }) => (
//                             <View>
//                                 <List.Item
//                                     style={{ backgroundColor: MD3DarkTheme.colors.elevation.level5 }}
//                                     title={item}
//                                     onPress={() => hidePicker(item)}
//                                 // description="Item description"
//                                 />
//                                 <Divider />
//                             </View>
//                         )}
//                         keyExtractor={(item) => item}
//                     />
//                 </Portal>
//             )}
//         </TouchableOpacity>
//     );
// };

// export default Select;
