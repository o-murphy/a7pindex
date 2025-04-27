import React, { useState, useCallback } from "react";
import { TouchableOpacity, View, StyleSheet, ViewStyle } from "react-native";
import { Divider, IconButton, Tooltip, Text, Surface } from "react-native-paper";
import ItemDetails from "./ItemDetails";
import { downloadProfile, openInEditor } from "@/hooks/FetchProfile";
import { ProfileIndexType } from "@/hooks/FilterHook";

interface ItemRowProps {
    item: Partial<ProfileIndexType>;
}

interface ActionButtonsProps {
    item: Partial<ProfileIndexType>;
    onShowDetails: () => void;
    onDownload: () => void;
    onOpen: () => void;
}

interface HeaderRowProps { };

export const HeaderRow = React.memo<HeaderRowProps>(() => {

    const labels = ["Product Name", "Caliber", "Vendor", "Bullet Vendor", "Weight", "Diameter", "Drag Model"];
    const flexValues = [1, 1, 1, 1, 0.5, 0.5, 1]; // Match the flex values in ItemRow

    return (
        <Surface style={styles.rowContainer}>
            <View style={styles.iconContainer} />
            <View style={styles.textRow}>
                {labels.map((label, index) => (
                    <Text key={index} style={[styles.text, styles.headerText]}>
                        {label}
                    </Text>
                ))}
            </View>
        </Surface>
    );
});

const ActionButtons = React.memo<ActionButtonsProps>(({ item, onShowDetails, onDownload, onOpen }) => (
    <View style={styles.iconContainer}>
        <Tooltip title="Download" leaveTouchDelay={0.2}>
            <IconButton size={20} icon={"download"} style={styles.icon} onPress={onDownload} />
        </Tooltip>
        <Tooltip title="Details" leaveTouchDelay={0.2}>
            <IconButton size={20} icon={"eye"} style={styles.icon} onPress={onShowDetails} />
        </Tooltip>
        <Tooltip title="Open in editor" leaveTouchDelay={0.2}>
            <IconButton size={20} icon={"arrow-top-right-thick"} style={styles.icon} onPress={onOpen} />
        </Tooltip>
    </View>
), (prevProps, nextProps) => (
    prevProps.item?.path === nextProps.item?.path
));

export const ItemRow = React.memo<ItemRowProps>(({ item }) => {
    const [detailsVisible, setDetailsVisible] = useState(false);

    const onShowDetailsPress = useCallback(() => {
        setDetailsVisible(true);
    }, []);

    const onDownloadPress = useCallback(() => {
        downloadProfile(item.path);
    }, [item.path]);

    const onOpenPress = useCallback(() => {
        openInEditor(item.path);
    }, [item.path]);

    return (
        <TouchableOpacity onPress={onShowDetailsPress}>
            <View style={styles.rowContainer}>
                <ActionButtons
                    item={item}
                    onShowDetails={onShowDetailsPress}
                    onDownload={onDownloadPress}
                    onOpen={onOpenPress}
                />
                <View style={styles.textRow}>
                    <Text style={[styles.text, { flex: 1 }]}>{item.meta?.productName || item.name}</Text>
                    <Text style={[styles.text, { flex: 1 }]}>{item.meta?.caliber || item.caliber}</Text>
                    <Text style={[styles.text, { flex: 1 }]}>{item.meta?.vendor || item.cartridgeVendor}</Text>
                    <Text style={[styles.text, { flex: 1 }]}>{item.meta?.bulletVendor || item.bulletVendor}</Text>
                    <Text style={[styles.text, { flex: 0.5 }]}>{item.weight} {"gr"}</Text>
                    <Text style={[styles.text, { flex: 0.5 }]}>{item.diameter} {"inch"}</Text>
                    <Text style={[styles.text, { flex: 1 }]}>{item.dragModelType}</Text>
                </View>
            </View>
            <Divider />
            {detailsVisible && <ItemDetails item={item} visible={detailsVisible} onDismiss={() => setDetailsVisible(false)} />}
        </TouchableOpacity>
    );
}, (prevProps, nextProps) => (
    prevProps.item === nextProps.item
));

export const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: "row",
        alignItems: "center", // Align buttons and text row vertically
        gap: 8
    },
    iconContainer: {
        flex: 0.2,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        minWidth: 'auto',
    },
    textRow: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap", // Enable wrapping for text elements
        alignItems: "center",
        gap: 8
    },
    icon: {
        width: 20,
        height: 20
    },
    text: {
        paddingVertical: 2,
        marginVertical: 2,
        minWidth: 'auto',
        textAlignVertical: "center",
        textAlign: "left"
    },
    headerText: {
        fontWeight: 'bold',
    },
});
