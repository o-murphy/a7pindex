import React, { useMemo } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PaperProvider, Surface } from "react-native-paper";
import TopAppBar from "@/components/TopAppBar";
import FilterSurface from "@/components/FilterSurface";
import ProfilesDataTable from "@/components/DataTable";
import { FilterProvider } from "@/hooks/FilterHook";
import { ArmyDarkTheme } from "@/theme/theme";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";
import { View } from "react-native";


export default function RootLayout() {

  const theme = ArmyDarkTheme;

  const { layout: layoutMode } = useResponsiveLayout();

  const layoutDirection = useMemo(() => {
    switch (layoutMode) {
      case "desktop":
        return "row"
      case "mobile":
        return "column"
      default:
        return "column"
    }
  }, [layoutMode])

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <FilterProvider>
          <TopAppBar />
          <View style={{ flexDirection: layoutDirection, flex: 1, backgroundColor: theme.colors.background }}> {/* Added flex: 1 here */}
            <FilterSurface />
            <ProfilesDataTable />
          </View>
        </FilterProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}