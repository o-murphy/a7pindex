import { ProfileIndexType } from "@/hooks/FilterHook";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Divider, IconButton, Surface, Text } from "react-native-paper";
import ItemDetails from "./ItemDetails";
import { downloadProfile } from "@/hooks/FetchProfile";



const ItemRow = ({item}: {item: Partial<ProfileIndexType>}) => {

    const [detailsVisible, setDetailsVisible] = useState(false);

    return (
        <TouchableOpacity onPress={() => setDetailsVisible(true)}>
        <Surface elevation={0} style={{ flexDirection: "row", flexWrap: "wrap"}}>
            <Surface elevation={0} style={{ flex: 1, flexDirection: "row", justifyContent: "center", margin: 4, padding: 4, minWidth: 60  }}>
                <IconButton size={20} icon={"download"} style={{ padding: 2 }} onPress={() => downloadProfile(item.path)} />
                <IconButton size={20} icon={"eye"} style={{ padding: 2 }} onPress={() => setDetailsVisible(true)} />
            </Surface>
            <Surface elevation={0} style={{ flex: 3, padding: 4, justifyContent: "center", margin: 4, minWidth: 100 }}>
                <Text>{item.meta?.productName || item.name}</Text>
            </Surface>
            <Surface elevation={0} style={{ flex: 2, padding: 4, justifyContent: "center", margin: 4, minWidth: 100 }}>
                <Text>{item.meta?.caliber || item.caliber}</Text>
            </Surface>
            <Surface elevation={0} style={{ flex: 1, padding: 4, justifyContent: "center", margin: 4, minWidth: 50 }}>
                <Text>{item.meta?.vendor || item.cartridgeVendor}</Text>
            </Surface>
            <Surface elevation={0} style={{ flex: 1, padding: 4, justifyContent: "center", margin: 4, minWidth: 50 }}>
                <Text>{item.meta?.bulletVendor || item.bulletVendor}</Text>
            </Surface>
            <Surface elevation={0} style={{ flex: 1, padding: 4, justifyContent: "center", margin: 4, minWidth: 50 }}>
                <Text>{item.weight} {"gr"}</Text>
            </Surface>
            <Surface elevation={0} style={{ flex: 1, padding: 4, justifyContent: "center", margin: 4, minWidth: 50 }}>
                <Text>{item.diameter} {"inch"}</Text>
            </Surface>
            <Surface elevation={0} style={{ flex: 1, padding: 4, justifyContent: "center", margin: 4, minWidth: 50 }}>
                <Text>{item.dragModelType}</Text>
            </Surface>
        </Surface>
        <Divider />
        {detailsVisible && <ItemDetails item={item} visible={detailsVisible} onDismiss={() => setDetailsVisible(false)}/>}
        </TouchableOpacity>
    )
}


export default ItemRow;