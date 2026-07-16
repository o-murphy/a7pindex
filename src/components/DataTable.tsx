import { ProfileIndexType, useFilterContext } from "@/hooks/FilterHook";
import { Item } from "./ItemRow";

const filterIndex = (
    profiles: Array<Partial<ProfileIndexType>>,
    filter: Partial<ProfileIndexType>,
) => {
    return profiles
        .filter((item) =>
            filter.caliber
                ? item.meta?.caliber?.toLowerCase() ===
                  filter.caliber?.toLowerCase()
                : true,
        )
        .filter((item) =>
            filter.bulletVendor
                ? item.meta?.bulletVendor.toLowerCase() ===
                  filter.bulletVendor?.toLowerCase()
                : true,
        )
        .filter((item) =>
            filter.cartridgeVendor
                ? item.meta?.vendor.toLowerCase() ===
                  filter.cartridgeVendor?.toLowerCase()
                : true,
        )
        .filter((item) =>
            filter.diameter ? item.diameter === filter.diameter : true,
        )
        .filter((item) =>
            filter.weight ? item.weight === filter.weight : true,
        )
        .filter((item) =>
            filter.dragModelType
                ? item.dragModelType === filter.dragModelType
                : true,
        );
};

const ProfilesDataTable = () => {
    const { webHookData: profilesIndex, filter } = useFilterContext();

    if (!profilesIndex || !profilesIndex.profiles) {
        return (
            <div className="flex flex-1 items-center justify-center">
                <span className="text-on-surface-variant">
                    Loading data...
                </span>
            </div>
        );
    }

    const filteredProfiles = filterIndex(profilesIndex.profiles, filter);

    return (
        <div className="flex-1 overflow-y-auto p-2">
            <div className="grid grid-cols-[repeat(auto-fill,350px)] gap-2">
                {filteredProfiles.map((item, index) => (
                    <Item key={index} item={item} />
                ))}
            </div>
        </div>
    );
};

export default ProfilesDataTable;
