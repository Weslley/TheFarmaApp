import EStyleSheet from "react-native-extended-stylesheet";

export default EStyleSheet.create({
    container: {
        width: 144,
        height: 160,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.20)",
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingTop: 16,
        paddingBottom: 19
    },
    icon: {
        width: 48,
        height: 48
    },
    title: {
        fontFamily: "Roboto-Medium",
        fontSize: 15,
        color: "rgba(0,0,0,0.80)",
        marginTop: 8
    },
    description: {
        textAlign: 'center',
        alignSelf: 'center',
        fontFamily: "Roboto-Regular",
        fontSize: 11,
        color: "rgba(0,0,0,0.80)",
        marginTop: 8
    }
});