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
    form: {
        marginLeft: 0,
        paddingLeft: 0,
        marginBottom: 24
    },
    formitem: {
        marginLeft: 0,
        paddingLeft: 0
    },
    label: {
        fontFamily: "Roboto-Regular",
        fontSize: 12,
        color: "rgba(0,0,0,0.80)"
    },
    input: {
        paddingLeft: 0,
        marginLeft: 0,
        fontFamily: "Roboto-Bold",
        fontSize: 16,
        color: "#000000"
    },
    button: {
        width: "100%",
        marginBottom: 24,
    },
    buttonText: {
        fontFamily: "Roboto-Bold",
        fontSize: 16,
        color: "rgba(0,0,0,0.80)"
    },
    buttonIcon: {
        fontSize: 30
    },
    inputError: {
        fontFamily: 'Roboto-Regular',
        fontSize: 12,
        color: '#E91E63'
    }
});
