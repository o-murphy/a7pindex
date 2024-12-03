import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PaperProvider, MD3DarkTheme, Surface, Text } from "react-native-paper";
import { ScrollView, View } from "react-native";
import TopAppBar from "@/components/TopAppBar";
import FilterSurface from "@/components/FilterSurface";
import profilesJson from "../assets/profiles.json";


export default function RootLayout() {

  const theme = MD3DarkTheme;
  const {profiles, uniqueKeys} = profilesJson;
  const sortedProfiles = profiles.sort((a, b) => a.id - b.id);
  
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <TopAppBar />
        <View style={{ flex: 1, flexDirection: "column", backgroundColor: theme.colors.background }}>
          <FilterSurface />
          <Surface elevation={2} style={{ flexDirection: "column", flexWrap: "wrap", padding: 8, margin: 8, flex: 1 }}>
            <ScrollView 
            style={{flex: 1}}
            contentContainerStyle={{overflow: "hidden"}}
            >
               {sortedProfiles.map(item => {
                return(
                  <Surface elevation={2} style={{flexDirection: "row"}}>
                    {/* <Text style={{flex: 1, padding: 4}}>{item.id}</Text> */}
                    <Text style={{flex: 2, padding: 4}}>{item.name}</Text>
                    <Text style={{flex: 1, padding: 4}}>{item.caliber}</Text>
                    <Text style={{flex: 1, padding: 4}}>{item.bulletVendor}</Text>
                    <Text style={{flex: 1, padding: 4}}>{item.cartridgeVendor}</Text>
                  </Surface>
                )
               })}
            </ScrollView>
          </Surface>
        </View>
      </PaperProvider>
    </SafeAreaProvider>
  );
}