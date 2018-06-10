import EStyleSheet from "react-native-extended-stylesheet";
export default EStyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        backgroundColor: '$background',
    },
    subheader: {
        fontFamily: 'Roboto-Bold',
        fontSize: 12,
        marginTop: 32,
        marginBottom: 8
    },
    tabIcon: {
        width: 22,
        height: 22
    },
    itemContainer: {
        paddingTop: 23,
        paddingBottom: 22,
        paddingLeft: 0,
        marginLeft: 0
    },
    itemIcon: {
        width: 16,
        height: 16,
        marginRight: 16
    },
    button: { width: '100%' },
    buttonDisabled: { opacity: 0.32 },
    buttonEnabled: {},
    buttonText: {
        flex: 1,
        textAlign: "center",
        fontFamily: "Roboto-Bold",
        fontSize: 16,
        color: "rgba(0,0,0,0.80)",
    },
});
