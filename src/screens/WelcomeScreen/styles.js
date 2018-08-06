import EStyleSheet from "react-native-extended-stylesheet";
export default EStyleSheet.create({
    icon: {
        width: 24,
        height: 24
    },
    background: {
        flex: 1,
        width: null,
        height: null,
        position: "absolute",
        opacity: 1,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    },
    searchBar: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, .04)",
        marginTop: 16,
        paddingHorizontal: 12,
        paddingVertical: 12,
        borderRadius: 26
    },
    text: {
        flex: 1,
        fontSize: 14,
        color: "#000000",
        color: "rgba(0,0,0,0.48)",
    },
    avatarContainer: {
        width: 24,
        height: 24,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 100,
        backgroundColor: "#ccc",
        overflow: 'hidden'
    },
    avatar: {
        width: 24,
        height: 24,
    }
});
