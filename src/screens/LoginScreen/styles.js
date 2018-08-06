import EStyleSheet from "react-native-extended-stylesheet";

export default EStyleSheet.create({
    background: {
        flex: 1,
        width: null,
        height: null,
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    },
    logo: {
        width: 75,
        height: 75,
        marginBottom: 8,
    },
    text: {
        fontFamily: 'Roboto-Bold',
        fontSize: 16,
        color: '#FFFFFF',
        marginBottom: 16,
    },
    button: {
        width: "100%",
        marginBottom: 16,
        borderColor: "#FFF",
    },
    buttonText: {
        fontFamily: "Roboto-Medium",
        fontSize: 16,
        color: "#FFFFFF"
    },
    buttonIcon: {
        fontSize: 24,
        color: "#FFFFFF"
    },
    inputError: {
        fontFamily: 'Roboto-Regular',
        fontSize: 12,
        color: '#E91E63'
    }
});
