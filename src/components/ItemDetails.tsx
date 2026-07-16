import { useEffect, useState } from "react";
import { ArrowUpRight, Download, ExternalLink } from "lucide-react";
import { ProfileIndexType } from "@/hooks/FilterHook";
import { fetchDetails, downloadProfile, openInEditor } from "@/hooks/FetchProfile";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

type ItemDetailsProps = {
    item: Partial<ProfileIndexType>;
    visible: boolean;
    onDismiss: () => void;
};

const DataRow = ({ label, value }: { label: string; value: any }) => {
    return (
        <div className="flex justify-between gap-2 border-b border-outline-variant py-1 last:border-b-0">
            <span className="flex-1 text-sm text-on-surface-variant">
                {label}
            </span>
            <span className="flex-[2] text-sm text-on-surface">{value}</span>
        </div>
    );
};

const ItemDetails: React.FC<ItemDetailsProps> = ({
    item,
    visible,
    onDismiss,
}) => {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const fetchDetailsAsync = async () => {
            try {
                const details = await fetchDetails(item.path);
                setData(details);
            } catch {
                setData(null);
            }
        };
        fetchDetailsAsync();
    }, [item]);

    const mv = item?.meta?.muzzle_velocity
        ? `${item?.meta?.muzzle_velocity.toFixed(0)} m/s`
        : "undefined";
    const dia = item?.diameter
        ? `${item?.diameter?.toFixed(3)} inch`
        : "undefined";
    const wght = item?.weight ? `${item?.weight?.toFixed(1)} gr` : "undefined";

    const onDownloadPress = () => {
        downloadProfile(item.path);
    };

    const onOpenPress = () => {
        openInEditor(item.path);
    };

    return (
        <Modal
            open={visible}
            onClose={onDismiss}
            title={item?.meta?.productName || data?.profileName}
            footer={
                <>
                    <Button
                        variant="fab"
                        color="primary"
                        icon={Download}
                        fullWidth
                        onClick={onDownloadPress}
                    >
                        Download
                    </Button>
                    <Button
                        variant="fab"
                        color="tertiary"
                        icon={ArrowUpRight}
                        fullWidth
                        onClick={onOpenPress}
                    >
                        Open in editor
                    </Button>
                </>
            }
        >
            <div className="flex flex-col gap-1 pb-4">
                <DataRow
                    label="Caliber"
                    value={item?.meta?.caliber || data?.caliber}
                />
                <DataRow
                    label="Cartridge vendor"
                    value={item?.meta?.vendor || item?.cartridgeVendor}
                />
                <DataRow
                    label="Bullet Type"
                    value={item?.meta?.bulletType || item?.bullet}
                />
                <DataRow label="Bullet weight" value={wght} />
                <DataRow label="Bullet diameter" value={dia} />
                <DataRow label="Muzzle velocity" value={mv} />
                <DataRow label="Drag model" value={item?.dragModelType} />
                {item?.meta?.url && (
                    <Button
                        icon={ExternalLink}
                        variant="outlined"
                        className="mt-2"
                        onClick={() => window.open(item?.meta?.url, "_blank")}
                    >
                        Vendor page
                    </Button>
                )}
            </div>
        </Modal>
    );
};

export default ItemDetails;
