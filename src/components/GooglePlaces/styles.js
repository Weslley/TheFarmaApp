import EStyleSheet from "react-native-extended-stylesheet";
export default EStyleSheet.create({
    input: {
        width: "100%",
        paddingHorizontal: 20,
        borderBottomColor: "rgba(0,0,0,0.08)",
        borderBottomWidth: 1,
        fontFamily: 'Roboto-Bold',
        fontSize: 24,
        color: 'rgba(0,0,0,0.24)'
    },
    footer: {
        width: "100%",
        paddingHorizontal: 20,
        paddingBottom: 24,
        position: "absolute",
        left: 0,
        bottom: 0,
        right: 0
    },
    btn: {
        width: "100%",
        backgroundColor: "#FFF",
        borderColor: "rgba(0,0,0,0.16)"
    }
});