import React, { useCallback, useState } from "react";
import { ArrowUpRight, Download, Eye } from "lucide-react";
import ItemDetails from "./ItemDetails";
import { downloadProfile, openInEditor } from "@/hooks/FetchProfile";
import { ProfileIndexType } from "@/hooks/FilterHook";
import { IconButton } from "@/components/ui/IconButton";
import { Button } from "@/components/ui/Button";
import { Tooltip } from "@/components/ui/Tooltip";

interface ItemProps {
    item: Partial<ProfileIndexType>;
}

interface ActionButtonsProps {
    item: Partial<ProfileIndexType>;
    onShowDetails: () => void;
}

const ActionButtons = React.memo<ActionButtonsProps>(
    ({ item, onShowDetails }) => {
        const onDownloadPress = useCallback(() => {
            downloadProfile(item.path);
        }, [item.path]);

        const onOpenPress = useCallback(() => {
            openInEditor(item.path);
        }, [item.path]);

        return (
            <div
                className="flex items-center gap-2 px-4"
                onClick={(e) => e.stopPropagation()}
            >
                <Tooltip title="Download">
                    <IconButton
                        icon={Download}
                        variant="outlined"
                        onClick={onDownloadPress}
                    />
                </Tooltip>
                <Tooltip title="Details">
                    <IconButton
                        icon={Eye}
                        variant="tonal"
                        onClick={onShowDetails}
                    />
                </Tooltip>
                <Button
                    icon={ArrowUpRight}
                    variant="tonal"
                    onClick={onOpenPress}
                >
                    Open in editor
                </Button>
            </div>
        );
    },
    (prevProps, nextProps) => prevProps.item?.path === nextProps.item?.path,
);

const Row = ({ label, value }: { label: string; value: React.ReactNode }) => (
    <div className="mb-1 flex">
        <span className="mr-2 w-[128px] shrink-0 text-left font-bold whitespace-nowrap text-on-surface">
            {label}
        </span>
        <span className="min-w-0 flex-1 truncate text-left text-on-surface-variant">
            {value}
        </span>
    </div>
);

export const Item = React.memo<ItemProps>(
    ({ item }) => {
        const [detailsVisible, setDetailsVisible] = useState(false);

        const onShowDetailsPress = useCallback(() => {
            setDetailsVisible(true);
        }, []);

        return (
            <div
                onClick={onShowDetailsPress}
                className="flex h-[350px] w-[350px] cursor-pointer flex-col rounded-xl bg-elevation-3 shadow-md"
            >
                <div className="px-4 pt-4 pb-2 text-base font-medium text-on-surface">
                    {item.meta?.productName || item.name}
                </div>
                <ActionButtons item={item} onShowDetails={onShowDetailsPress} />
                <div className="flex-1 gap-1 px-4 py-4">
                    <Row
                        label="Product:"
                        value={item.meta?.productName || item.name}
                    />
                    <Row
                        label="Caliber:"
                        value={item.meta?.caliber || item.caliber}
                    />
                    <Row
                        label="Vendor:"
                        value={item.meta?.vendor || item.cartridgeVendor}
                    />
                    <Row
                        label="Bullet Vendor:"
                        value={item.meta?.bulletVendor || item.bulletVendor}
                    />
                    <Row label="Weight:" value={`${item.weight} gr`} />
                    <Row label="Diameter:" value={`${item.diameter} inch`} />
                    <Row label="Drag Model:" value={item.dragModelType} />
                </div>

                {detailsVisible && (
                    <ItemDetails
                        item={item}
                        visible={detailsVisible}
                        onDismiss={() => setDetailsVisible(false)}
                    />
                )}
            </div>
        );
    },
    (prevProps, nextProps) => prevProps.item === nextProps.item,
);
