import React from "react"
import { FAB, Surface, TextInput } from "react-native-paper"


const FilterSurface = () => {
    return (
        <Surface elevation={3} style={{ flexDirection: "row", flexWrap: "wrap", padding: 8, margin: 8 }}>
            <TextInput mode={"outlined"} label={"Caliber"} style={{ margin: 4 }} />
            <TextInput mode={"outlined"} label={"Diameter"} style={{ margin: 4 }} />
            <TextInput mode={"outlined"} label={"Vendor"} style={{ margin: 4 }} />
            <TextInput mode={"outlined"} label={"Weight"} style={{ margin: 4 }} />
            <Surface elevation={0} style={{ flexDirection: "row", flexWrap: "wrap" }}>
                <Surface elevation={0} style={{ justifyContent: "center", margin: 4 }}>
                    <FAB size={"small"} style={{}} icon={"filter"} onPress={() => console.log("apply filter")} />
                </Surface>
                <Surface elevation={0} style={{ justifyContent: "center", margin: 4 }}>
                    <FAB size={"small"} variant={"tertiary"} style={{}} icon={"filter-off"} onPress={() => console.log("apply filter")} />
                </Surface>
            </Surface>
        </Surface>
    )
}

export default FilterSurface;