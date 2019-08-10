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
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderColor: "#CCCCCC",
        borderTopWidth: 0.7,
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
        paddingVertical: 2,
        fontFamily: "Roboto-Bold",
        fontSize: 15,
        color: "#FFFFFF",
        textAlign: 'center'
    },
    actions: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 1,
        borderRadius: 8,
        borderColor: 'rgba(0,0,0,0.08)'
    },
    icon: {
        width: 24,
        height: 24,
        textAlign: "center"
    },
    quantity: {
        fontFamily: "Roboto-Medium",
        fontSize: 18,
        textAlign: "center",
        width: 24,
        height: 24,
        marginRight: 8
    },
});
