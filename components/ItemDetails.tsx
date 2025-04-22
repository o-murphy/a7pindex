import { ProfileIndexType } from "@/hooks/FilterHook"
import React, { useEffect, useState } from "react"
import { Button, Dialog, Divider, FAB, Portal, Surface, Text } from "react-native-paper"
import { fetchDetails, downloadProfile, openInEditor } from "@/hooks/FetchProfile";
import { Linking, Platform } from "react-native";


type ItemDetailsProps = {
    item: Partial<ProfileIndexType>;
    visible: boolean;
    onDismiss: () => void;
}


const DataRow = ({ label, value }: { label: string, value: any }) => {
    return (
        <Surface elevation={0} style={{ flexDirection: "row", paddingVertical: 4, justifyContent: "space-between" }}>
            <Text style={{ marginHorizontal: 4, flex: 1 }} >{label}</Text>
            <Text style={{ marginHorizontal: 4, flex: 2 }} >{value}</Text>
        </Surface>
    )
}


const ItemDetails: React.FC<ItemDetailsProps> = ({ item, visible, onDismiss }) => {

    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const fetchDetailsAsync = async () => {
            try {
                const details = await fetchDetails(item.path)
                setData(details)
            } catch (error) {
                setData(null)
            }
        }
        fetchDetailsAsync()
    }, [item])

    const mv = item?.meta?.muzzle_velocity ? `${item?.meta?.muzzle_velocity.toFixed(0)} m/s` : "undefined";
    const dia = item?.diameter ? `${item?.diameter?.toFixed(3)} inch` : "undefined";
    const wght = item?.weight ? `${item?.weight?.toFixed(1)} gr` : "undefined";

    const onDownloadPress = () => {
        downloadProfile(item.path)
    }

    const onOpenPress = () => {
        openInEditor(item.path);
    };

    return (
        <Portal>
            <Dialog visible={visible} onDismiss={onDismiss} style={{ maxWidth: 350, minWidth: 300, maxHeight: "50%", alignSelf: "center" }}>
                <Dialog.Title>{item?.meta?.productName || data?.profileName}</Dialog.Title>
                <Dialog.Content style={{ paddingBottom: 0 }}>
                    <DataRow label={"Caliber"} value={item?.meta?.caliber || data?.caliber} />
                    <Divider />
                    <DataRow label={"Cartridge vendor"} value={item?.meta?.vendor || item?.cartridgeVendor} />
                    <Divider />
                    <DataRow label={"Bullet Type"} value={item?.meta?.bulletType || item?.bullet} />
                    <Divider />
                    <DataRow label={"Bullet weight"} value={wght} />
                    <Divider />
                    <DataRow label={"Bullet diameter"} value={dia} />
                    <Divider />
                    <DataRow label={"Muzzle velocity"} value={mv} />
                    <Divider />
                    <DataRow label={"Drag model"} value={item?.dragModelType} />
                    {/* <DataRow label={"Source"} value={item?.meta?.url} /> */}
                    {item?.meta?.url && <Button icon={"open-in-new"} mode={"outlined"} onPress={() => Linking.openURL(item?.meta?.url)}>Vendor page</Button>}
                </Dialog.Content>
                <Surface style={{ flexDirection: "row", padding: 8, flex: 1 }} elevation={0}>
                    <FAB style={{ margin: 4, flex: 1 }} variant={"primary"} label={"Download"} icon={"download"} onPress={onDownloadPress} />
                    <FAB style={{ margin: 4, flex: 1 }} variant={"tertiary"} label={"Open in editor"} icon={"arrow-top-right-thick"} onPress={onOpenPress} />
                </Surface>
            </Dialog>
        </Portal>
    )
}


export default ItemDetails;