import { Appbar } from "react-native-paper";

import { PaperProvider, MD3DarkTheme } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";


export default function RootLayout() {

  const theme = MD3DarkTheme;

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => { }} />
          <Appbar.Content title="Title" />
          <Appbar.Action icon="calendar" onPress={() => { }} />
          <Appbar.Action icon="magnify" onPress={() => { }} />
        </Appbar.Header>
      </PaperProvider>
    </SafeAreaProvider>
  );
}