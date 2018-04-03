import { StyleSheet, PixelRatio } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

export default EStyleSheet.create({
    container: {
        backgroundColor: "$background",
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: 80,
        paddingHorizontal: 24,
        paddingVertical: 16,
        borderColor: "#CCCCCC",
        borderTopWidth: 1,
    },
    label: {
        fontFamily: "Roboto-Light",
        fontSize: 12,
        color: "rgba(0,0,0,0.80)"
    },
    price: {
        fontFamily: "Roboto-Medium",
        fontSize: 22,
        color: "rgba(0,0,0,0.80)"
    },
    buttonText: {
        fontFamily: "Roboto-Bold",
        fontSize: 16,
        color: "#FFFFFF"
    }
});
