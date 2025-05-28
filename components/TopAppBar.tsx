import React from "react";
import { Appbar } from "react-native-paper";
import { ThemeToggle } from "./ThemeToggle";

const TopAppBar = () => {
    return (
        <Appbar.Header elevated={true}>
            <Appbar.Content title="Archer Balistic Profiles Library" />
            <ThemeToggle />
        </Appbar.Header>
    );
};

export default TopAppBar;
