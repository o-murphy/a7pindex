import React from "react"
import { Appbar } from "react-native-paper"


const TopAppBar = () => {
    return (
        <Appbar.Header elevated={true}>
          {/* <Appbar.BackAction onPress={() => { }} /> */}
          <Appbar.Content title="Archer Balistic Profiles Library" />
          {/* <Appbar.Action icon="calendar" onPress={() => { }} /> */}
          {/* <Appbar.Action icon="magnify" onPress={() => { }} /> */}
        </Appbar.Header>
    )
}

export default TopAppBar;