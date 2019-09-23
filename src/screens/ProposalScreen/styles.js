import EStyleSheet from "react-native-extended-stylesheet";
export default EStyleSheet.create({
    infoContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8
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
        paddingVertical: 2,
        fontSize: 14,
        color: "rgba(0,0,0,0.80)",
    },
    linearGradient: {
        justifyContent: "center",
        alignItems: 'center',
        flex: 1,
        paddingVertical: 12,
        borderRadius: 4
    },
    inputError: {
        fontFamily: 'Roboto-Regular',
        fontSize: 12,
        color: '#E91E63'
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    footer: {
        backgroundColor: "#F8F8F8",
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        paddingHorizontal: 24,
        paddingVertical: 24
    },
    footerTxt: {
        fontFamily: 'Roboto-Regular',
        fontSize: 12,
        color: 'rgba(0,0,0,0.40)'
    },
    footerTxtBold: {
        fontFamily: 'Roboto-Bold',
        fontSize: 18,
        color: 'rgba(0,0,0,0.80)'
    }
});
