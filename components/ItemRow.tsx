import React, { useState, useCallback } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { IconButton, Tooltip, Text, Card } from "react-native-paper";
import ItemDetails from "./ItemDetails";
import { downloadProfile, openInEditor } from "@/hooks/FetchProfile";
import { ProfileIndexType } from "@/hooks/FilterHook";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";

interface ItemProps {
    item: Partial<ProfileIndexType>;
}

interface ActionButtonsProps {
    item: Partial<ProfileIndexType>;
    onShowDetails: () => void;
}


const ActionButtons = React.memo<ActionButtonsProps>(({ item, onShowDetails }) => {

    const onDownloadPress = useCallback(() => {
        downloadProfile(item.path);
    }, [item.path]);

    const onOpenPress = useCallback(() => {
        openInEditor(item.path);
    }, [item.path]);

    return (
        <Card.Actions style={styles.actionsContainer}>
            <Tooltip title="Download" leaveTouchDelay={0.2}>
                <IconButton size={20} icon={"download"} style={styles.icon} onPress={onDownloadPress} />
            </Tooltip>
            <Tooltip title="Details" leaveTouchDelay={0.2}>
                <IconButton size={20} icon={"eye"} style={styles.icon} onPress={onShowDetails} />
            </Tooltip>
            <Tooltip title="Open in editor" leaveTouchDelay={0.2}>
                <IconButton size={20} icon={"arrow-top-right-thick"} style={styles.icon} onPress={onOpenPress} />
            </Tooltip>
        </Card.Actions>
    )
}, (prevProps, nextProps) => (
    prevProps.item?.path === nextProps.item?.path
));

export const Item = React.memo<ItemProps>(({ item }) => {
    const [detailsVisible, setDetailsVisible] = useState(false);

    const { layout: layoutMode } = useResponsiveLayout()

    const onShowDetailsPress = useCallback(() => {
        setDetailsVisible(true);
    }, []);

    return (
        <TouchableOpacity onPress={onShowDetailsPress} style={[styles.touchable, layoutMode === "mobile" && { width: "auto" }]}>
            <Card elevation={3} style={[styles.card, layoutMode === "mobile" && { width: "auto" }]}>
                <Card.Title title={item.meta?.productName || item.name} />
                <Card.Content style={styles.content}>
                    <View style={styles.row}>
                        <Text style={styles.label}>Product:</Text>
                        <Text style={styles.value} ellipsizeMode="tail" numberOfLines={2}>{item.meta?.productName || item.name}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Caliber:</Text>
                        <Text style={styles.value} ellipsizeMode="tail" numberOfLines={2}>{item.meta?.caliber || item.caliber}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Vendor:</Text>
                        <Text style={styles.value} ellipsizeMode="tail" numberOfLines={2}>{item.meta?.vendor || item.cartridgeVendor}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Bullet Vendor:</Text>
                        <Text style={styles.value} ellipsizeMode="tail" numberOfLines={2}>{item.meta?.bulletVendor || item.bulletVendor}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Weight:</Text>
                        <Text style={styles.value}>{item.weight} {"gr"}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Diameter:</Text>
                        <Text style={styles.value}>{item.diameter} {"inch"}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Drag Model:</Text>
                        <Text style={styles.value}>{item.dragModelType}</Text>
                    </View>
                </Card.Content>

                <View style={styles.actionsWrapper}>
                    <ActionButtons
                        item={item}
                        onShowDetails={onShowDetailsPress}
                    />
                </View>

            </Card>

            {detailsVisible && <ItemDetails item={item} visible={detailsVisible} onDismiss={() => setDetailsVisible(false)} />}
        </TouchableOpacity>
    );
}, (prevProps, nextProps) => (
    prevProps.item === nextProps.item
));

export const styles = StyleSheet.create({
    touchable: {
        width: 350,
        // height: 300,
        margin: 8,
    },
    card: {
        width: 350,
        height: 320,
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        gap: 4,
        paddingVertical: 8,
        paddingHorizontal: 16,
        flexGrow: 1,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 4, // Add some vertical spacing between rows
    },
    label: {
        fontWeight: 'bold',
        marginRight: 8,
        minWidth: 100, // Adjust as needed to align values
        textAlign: 'left',
    },
    value: {
        flex: 1,
        textAlign: 'left',
    },
    actionsWrapper: {
        // No flexGrow here
        flexGrow: 1,
    },
    actionsContainer: {
        padding: 8,
        justifyContent: 'flex-end',
    },
    iconContainer: {
        flex: 0.2,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        minWidth: 'auto',
    },
    icon: {
        width: 20,
        height: 20
    },
    text: {
        // Removed as we are using label and value styles now
    },
});