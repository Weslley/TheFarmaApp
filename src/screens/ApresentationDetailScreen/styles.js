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
        marginTop: 0,
        paddingTop: 0,
        marginLeft: 0,
        marginBottom: 0,
        paddingBottom: 16,
        paddingLeft: 0,
        paddingRight: 0,
        paddingVertical: 0,
        marginRight: 16,
        borderColor: "#CCCCCC",
        borderWidth: 1,
        borderRadius: 4
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
