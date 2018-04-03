import EStyleSheet from "react-native-extended-stylesheet";

export default EStyleSheet.create({
    container: {
        alignItems: "center",
        width: '100%',
    },
    input: {
        position: "absolute",
        width: '100%',
        color: "transparent",
        backgroundColor: "transparent",
        borderBottomColor: "#FFF",
        borderBottomWidth: 0,
    },
    containerBalls: {
        width: '100%',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
    },
    ball: {
        width: 25,
        height: 25,
        backgroundColor: 'rgba(0,0,0,0.08)',
        borderRadius: 100
    },
    text: {
        fontFamily: "Roboto-Bold",
        fontSize: 24,
        color: "$textColorPrimary"
    }
});
