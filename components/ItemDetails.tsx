import { ProfileIndexType } from "@/hooks/FilterHook"
import React, { useEffect, useState } from "react"
import { Dialog, Portal } from "react-native-paper"
import { fetchDetails } from "@/hooks/FetchProfile";


type ItemDetailsProps = {
    item: Partial<ProfileIndexType>;
    visible: boolean;
    onDismiss: () => void;
}


const ItemDetails: React.FC<ItemDetailsProps> = ({item, visible, onDismiss}) => {
    
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        fetchDetails({path: item.path, onSuccess: (data) => setData(data), onError: () => setData(null)})
    }, [item])

    return (
        <Portal>
            <Dialog visible={visible} onDismiss={onDismiss} style={{maxWidth: 300, maxHeight: "50%", alignSelf: "center"}}>
                <Dialog.Title>{item?.profileName}</Dialog.Title>
                <Dialog.Content>
                    {data?.profileName}
                    {data?.twistDir}
                </Dialog.Content>
            </Dialog>
        </Portal>
    )
}


export default ItemDetails;