import EStyleSheet from "react-native-extended-stylesheet";
export default EStyleSheet.create({
    center: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: "center",
    },
    footer: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: "center",
    },
    bottomBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        minHeight: 50,
        paddingHorizontal: 24,
        paddingVertical: 14
    },
    button: {
        width: "100%",
        fontFamily: "Roboto-Regular",
        fontSize: 16,
        color: "#FFFFFF"
    },
    txtDefault: {
        fontFamily: 'Roboto-Bold',
        fontSize: 24,
        color: 'rgba(0, 0, 0, 0.87)',
        letterSpacing: 0,
        textAlign: 'center',
        lineHeight: 32
    },
    counter: {
        fontFamily: 'Roboto-Light',
        fontSize: 40,
        color: 'rgba(0, 0, 0, 0.87)',
        letterSpacing: 0,
        textAlign: 'center',
    }
});
