import EStyleSheet from "react-native-extended-stylesheet";
export default EStyleSheet.create({
    bottomBar: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: 50,
        paddingHorizontal: 24,
        paddingVertical: 14
    },
    button: {
        width: "100%",
        fontFamily: "Roboto-Regular",
        fontSize: 16,
        color: "#FFFFFF"
    }
});
