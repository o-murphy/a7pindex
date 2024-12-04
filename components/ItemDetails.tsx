import { ProfileIndexType } from "@/hooks/FilterHook"
import React, { useEffect, useState } from "react"
import { Dialog, FAB, Portal, Surface, Text } from "react-native-paper"
import { fetchDetails, downloadProfile } from "@/hooks/FetchProfile";



type ItemDetailsProps = {
    item: Partial<ProfileIndexType>;
    visible: boolean;
    onDismiss: () => void;
}


const DataRow = ({ label, value }) => {
    return (
        <Surface elevation={0} style={{flexDirection: "row", padding: 8, justifyContent: "space-between"}}>
            <Text style={{margin: 4}} >{label}</Text>
            <Text style={{margin: 4}} >{value}</Text>
        </Surface>
    )
}


const ItemDetails: React.FC<ItemDetailsProps> = ({ item, visible, onDismiss }) => {

    const [data, setData] = useState<any>(null);

    useEffect(() => {
        fetchDetails({ path: item.path, onSuccess: (data) => setData(data), onError: () => setData(null) })
    }, [item])

    return (
        <Portal>
            <Dialog visible={visible} onDismiss={onDismiss} style={{ maxWidth: 350, minWidth: 300, maxHeight: "50%", alignSelf: "center" }}>
                <Dialog.Title>{item?.profileName}</Dialog.Title>
                <Dialog.Content>
                    <DataRow label={"Caliber"} value={data?.caliber}/>
                    <DataRow label={"Bullet"} value={data?.bulletName}/>
                </Dialog.Content>
                <Surface style={{ flexDirection: "row", padding: 8, flex: 1 }} elevation={0}>
                    <FAB style={{ margin: 4, flex: 1 }} label={"Download"} icon={"download"} onPress={() => downloadProfile(item.path)} />
                    <FAB style={{ margin: 4, flex: 1 }} label={"Open (beta)"} icon={"download"} onPress={() => console.log("Open (beta)")} disabled />
                </Surface>
            </Dialog>
        </Portal>
    )
}


export default ItemDetails;