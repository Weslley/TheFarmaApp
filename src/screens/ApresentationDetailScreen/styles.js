import EStyleSheet from "react-native-extended-stylesheet";

export default EStyleSheet.create({
    tabIcon: {
        width: 22,
        height: 22
    },
    containerLabel: {
        paddingHorizontal: 24,
        marginTop: 8,
        marginBottom: 16
    },
    label: {
        fontFamily: "Roboto-Bold",
        fontSize: 16,
        color: "rgba(0,0,0,0.80)"
    },
    list: {
        marginLeft: 24,
        paddingHorizontal: 0,
        paddingLeft: 0
    },
    listItem: {
        width: 312,
        marginRight: 16,
        borderColor: '#F3F3F3',
        borderRadius: 8,
        borderWidth: 1,
    },
    containerDelivery: {
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 32
    },
    titleDialog: {
        fontFamily: "Roboto-Bold",
        fontSize: 22,
        color: "rgba(0,0,0,0.87)",
        marginLeft: 8,
        marginBottom: 24
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    table: {
        paddingHorizontal: 24,
        paddingVertical: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    tableLabel: {
        fontFamily: "Roboto-Regular",
        fontSize: 12,
        color: "rgba(0,0,0,0.40)"
    },
    tableValue: {
        fontFamily: "Roboto-Medium",
        fontSize: 14,
        color: "rgba(0,0,0,0.80)"
    }
});
