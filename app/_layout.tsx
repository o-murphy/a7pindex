import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PaperProvider, MD3DarkTheme, Surface } from "react-native-paper";
import { View } from "react-native";
import TopAppBar from "@/components/TopAppBar";
import FilterSurface from "@/components/FilterSurface";
import ProfilesDataTable from "@/components/DataTable";
import { FilterProvider } from "@/hooks/FilterHook";
import { ArmyDarkTheme } from "@/theme/theme";


export default function RootLayout() {

  const theme = ArmyDarkTheme;

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <FilterProvider>
          <TopAppBar />
          <View style={{ flex: 1, flexDirection: "column", backgroundColor: theme.colors.background }}>
            <FilterSurface />
            <Surface elevation={2} style={{ flexDirection: "column", flexWrap: "wrap", padding: 8, margin: 8, flex: 1 }}>
              <ProfilesDataTable />
            </Surface>
          </View>
        </FilterProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}