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
    title: {
        fontFamily: 'Roboto-Black',
        fontSize: 32,
        color: 'rgba(0,0,0,0.80)'
    },
    input: {
        paddingLeft: 0,
        marginLeft: 0,
        fontFamily: "Roboto-Medium",
        fontSize: 20,
        color: "rgba(0,0,0,0.80)",
    },
    button: {
        width: "50%",
        marginBottom: 24,
    },
    buttonText: {
        fontFamily: "Roboto-Bold",
        fontSize: 16,
        color: "#FFF"
    },
    inputError: {
        fontFamily: 'Roboto-Regular',
        fontSize: 12,
        color: '#E91E63',
        marginTop: 8
    },
    codeInput: {
        fontFamily: 'Roboto-Medium',
        fontSize: 20,
        color: 'rgba(0,0,0,0.80)',
        textAlign: 'center'
    }
});
