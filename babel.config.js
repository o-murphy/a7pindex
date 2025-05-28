module.exports = function (api) {
    api.cache(true);
    return {
        presets: ["babel-preset-expo"],
        env: {
            production: {
                plugins: [
                    "react-native-paper/babel",
                    [
                        "babel-plugin-module-resolver",
                        {
                            alias: {
                                "react-native-vector-icons":
                                    "@expo/vector-icons",
                            },
                        },
                    ],
                ],
            },
        },
    };
};
