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
    item: {
        marginLeft: 0,
        paddingLeft: 0
    },
    itemLabel: {
        fontFamily: "Roboto-Regular",
        fontSize: 12,
        color: "#FFFFFF"
    },
    input: {
        paddingLeft: 0,
        marginLeft: 0,
        fontFamily: "Roboto-Bold",
        fontSize: 16,
        color: "#FFF"
    },
    button: {
        width: "100%",
        marginBottom: 24,
        borderColor: "#FFF",
    },
    buttonText: {
        fontFamily: "Roboto-Bold",
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
