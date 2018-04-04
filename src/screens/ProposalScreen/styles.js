import EStyleSheet from "react-native-extended-stylesheet";
export default EStyleSheet.create({
    tabIcon: {
        width: 24,
        height: 24
    },
    ListItem: {
        marginTop: 0,
        paddingTop: 0,
        marginLeft: 16,
        marginBottom: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
        paddingVertical: 0,
        marginRight: 0
    },
    InfoContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16
    },
    InfoTextBold: {
        fontFamily: "Roboto-Medium",
        fontSize: 14,
        color: "rgba(0,0,0,0.80)"
    },
    InfoText: {
        fontSize: 14,
        color: "rgba(0,0,0,0.80)",
        fontFamily: "Roboto-Light"
    },
    InfoIcon: {
        width: 16,
        height: 16,
        marginRight: 8
    }
});
