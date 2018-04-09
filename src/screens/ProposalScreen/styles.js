import EStyleSheet from "react-native-extended-stylesheet";
export default EStyleSheet.create({
    infoContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16
    },
    infoTextBold: {
        fontFamily: "Roboto-Medium",
        fontSize: 14,
        color: "rgba(0,0,0,0.80)"
    },
    infoText: {
        fontSize: 14,
        color: "rgba(0,0,0,0.80)",
        fontFamily: "Roboto-Light"
    },
    button: { width: '45%' },
    buttonDisabled: { opacity: 0.32 },
    buttonEnabled: {},
    buttonText: {
        fontFamily: "Roboto-Bold",
        fontSize: 16,
        color: "rgba(0,0,0,0.80)",
    },
    linearGradient: {
        justifyContent: "center",
        alignItems: 'center',
        flex: 1,
        paddingVertical: 14,
        borderRadius: 4
    },
    inputError: {
        fontFamily: 'Roboto-Regular',
        fontSize: 12,
        color: '#E91E63'
    }
});
