import EStyleSheet from "react-native-extended-stylesheet";
export default EStyleSheet.create({
    container: {
        width: "100%",
        padding: 16
    },
    button: {
        borderRadius: 8,
        backgroundColor: '#38BFC0',
        shadowRadius: 4,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(56,191,192,0.40)',
        shadowOffset: { width: 0, height: 4 },
    },
    text: {
        fontFamily: 'Roboto-Medium',
        fontSize: 14,
        color: '#FFFFFF',
        textAlign: 'center'
    },
    badge: {
        backgroundColor: "#FFF",
        alignItems: 'center',
        justifyContent: 'center',
    },
    badgeText:{
        fontFamily: 'Roboto-Black',
        fontSize: 12,
        color: '#38BFC0',
        textAlign: 'center',
        alignSelf: 'center'
    },
    row: {
        width: "100%",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between"
    },
    bottom: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
    },
})