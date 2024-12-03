import React from "react"
import { ScrollView, TouchableOpacity } from "react-native"
import { Divider, IconButton, Surface, Text } from "react-native-paper"
import { ProfileIndexType, ProfilesJson, useFilterContext } from "@/hooks/FilterHook";



const filterIndex = (data: Array<Partial<ProfileIndexType>>, criteria: Partial<ProfileIndexType>) => {
    return data.filter(item => {
        // Check if all criteria are met
        return Object.entries(criteria).every(([key, value]) => {
            const itemValue = item[key as keyof ProfileIndexType];

            // Handle string comparison case-insensitively
            if (typeof value === 'string' && typeof itemValue === 'string') {
                return itemValue.toLowerCase() === value.toLowerCase();
            }

            if (!value) {
                return true
            }

            // Handle non-string values normally
            return itemValue === value;
        });
    });
};


const ProfilesDataTable = () => {
    const { profiles } = ProfilesJson;
    const { filter } = useFilterContext()

    const filteredProfiles = filterIndex(profiles, filter)

    return (
        <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ overflow: "hidden" }}
        >
            {filteredProfiles.map((item, index) => {
                return (
                    <TouchableOpacity key={index}>
                    <Surface elevation={0} style={{ flexDirection: "row", flexWrap: "wrap"}}>
                        <Surface elevation={0} style={{ flex: 1, flexDirection: "row", justifyContent: "center", margin: 4, padding: 4, minWidth: 60  }}>
                            <IconButton size={20} icon={"download"} style={{ padding: 2 }} onPress={() => console.log("Download...")} />
                            <IconButton size={20} icon={"eye"} style={{ padding: 2 }} onPress={() => console.log("Details...")} />
                        </Surface>
                        <Surface elevation={0} style={{ flex: 3, padding: 4, justifyContent: "center", margin: 4, minWidth: 100 }}>
                            <Text>{item.name}</Text>
                        </Surface>
                        <Surface elevation={0} style={{ flex: 2, padding: 4, justifyContent: "center", margin: 4, minWidth: 100 }}>
                            <Text>{item.caliber}</Text>
                        </Surface>
                        <Surface elevation={0} style={{ flex: 1, padding: 4, justifyContent: "center", margin: 4, minWidth: 50 }}>
                            <Text>{item.bulletVendor}</Text>
                        </Surface>
                        <Surface elevation={0} style={{ flex: 1, padding: 4, justifyContent: "center", margin: 4, minWidth: 50 }}>
                            <Text>{item.cartridgeVendor}</Text>
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

                    </TouchableOpacity>
                )
            })}
        </ScrollView>
    )
};

export default ProfilesDataTable;

// import React, { useState } from "react";
// import { FlatList, TouchableOpacity } from "react-native";
// import { IconButton, Surface, Text } from "react-native-paper";
// import { ProfileIndexType, ProfilesJson, useFilterContext } from "@/hooks/FilterHook";

// // Filter function
// const filterIndex = (data: Array<Partial<ProfileIndexType>>, criteria: Partial<ProfileIndexType>) => {
//     return data.filter(item => {
//         // Check if all criteria are met
//         return Object.entries(criteria).every(([key, value]) => {
//             const itemValue = item[key as keyof ProfileIndexType];

//             // Handle string comparison case-insensitively
//             if (typeof value === 'string' && typeof itemValue === 'string') {
//                 return itemValue.toLowerCase() === value.toLowerCase();
//             }

//             if (!value) {
//                 return true;
//             }

//             // Handle non-string values normally
//             return itemValue === value;
//         });
//     });
// };

// const ProfilesDataTable = () => {
//     const { profiles } = ProfilesJson;
//     const { filter } = useFilterContext();

//     const [data, setData] = useState(filterIndex(profiles, filter));
//     const [page, setPage] = useState(1); // Track current page for lazy loading
//     const [loading, setLoading] = useState(false);

//     // Function to fetch more data
//     const fetchMoreData = () => {
//         if (loading) return; // Prevent multiple fetches at once
//         setLoading(true);
//         setTimeout(() => {
//             // Simulate fetching more data
//             setPage((prevPage) => prevPage + 1);
//             const newData = filterIndex(profiles.slice(0, page * 100), filter); // Simulate more data
//             setData(newData);
//             setLoading(false);
//         }, 10); // Simulate network delay
//     };

//     const renderItem = ({ item }: { item: Partial<ProfileIndexType> }) => (
//         <TouchableOpacity>
//             <Surface elevation={2} style={{ flexDirection: "row" }}>
//                 <Surface elevation={0} style={{ justifyContent: "center", margin: 4 }}>
//                     <IconButton size={20} icon={"download"} style={{ padding: 4 }} onPress={() => console.log("Download...")} />
//                 </Surface>
//                 <Surface elevation={0} style={{ justifyContent: "center", margin: 4 }}>
//                     <IconButton size={20} icon={"eye"} style={{ padding: 4 }} onPress={() => console.log("Details...")} />
//                 </Surface>
//                 <Surface elevation={0} style={{ flex: 3, padding: 4, justifyContent: "center", margin: 4 }}>
//                     <Text>{item.name}</Text>
//                 </Surface>
//                 <Surface elevation={0} style={{ flex: 2, padding: 4, justifyContent: "center", margin: 4 }}>
//                     <Text>{item.caliber}</Text>
//                 </Surface>
//                 <Surface elevation={0} style={{ flex: 1, padding: 4, justifyContent: "center", margin: 4 }}>
//                     <Text>{item.bulletVendor}</Text>
//                 </Surface>
//                 <Surface elevation={0} style={{ flex: 1, padding: 4, justifyContent: "center", margin: 4 }}>
//                     <Text>{item.cartridgeVendor}</Text>
//                 </Surface>
//                 <Surface elevation={0} style={{ flex: 1, padding: 4, justifyContent: "center", margin: 4 }}>
//                     <Text>{item.weight} {"gr"}</Text>
//                 </Surface>
//                 <Surface elevation={0} style={{ flex: 1, padding: 4, justifyContent: "center", margin: 4 }}>
//                     <Text>{item.diameter} {"inch"}</Text>
//                 </Surface>
//                 <Surface elevation={0} style={{ flex: 1, padding: 4, justifyContent: "center", margin: 4 }}>
//                     <Text>{item.dragModelType}</Text>
//                 </Surface>
//             </Surface>
//         </TouchableOpacity>
//     );

//     return (
//         <FlatList
//             data={data}
//             renderItem={renderItem}
//             keyExtractor={(item, index) => item.profileName + index}
//             onEndReached={fetchMoreData}
//             onEndReachedThreshold={0.5} // Load more when 50% of the list is reached
//             ListFooterComponent={loading ? <Text>Loading...</Text> : null} // Footer to show loading state
//         />
//     );
// };

// export default ProfilesDataTable;