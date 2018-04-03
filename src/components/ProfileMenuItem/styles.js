import EStyleSheet from "react-native-extended-stylesheet";
export default EStyleSheet.create({
    container: {
        width: '100%',        
        flexDirection: 'row',
        paddingTop: 23,
        paddingBottom: 22
    },
    icon: {
        alignSelf: "center",
        marginRight: 16        
    },
    text: {
        fontFamily: "Roboto-Medium",
        fontSize: 16,
        color: '$textColorPrimary'
    },
    badge: {
        backgroundColor: "#FF1967",
        position: "absolute",
        right: 0,
        borderRadius: 25,
        paddingTop: 2,
        width: 24,
        height: 24,
        alignSelf: "center",
        alignItems: "center",
    },
    badgeText: {
        fontFamily: "Roboto-Black",
        fontSize: 12,
        color: "#FFFFFF"
    }
});
