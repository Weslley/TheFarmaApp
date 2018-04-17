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
        opacity: 0.5,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    },
    searchBar: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, .04)",
        marginTop: 24,
        paddingHorizontal: 12,
        paddingVertical: 16,
        borderRadius: 26
    },
    text: {
        flex: 1,
        fontSize: 14,
        paddingHorizontal: 10,
        color: "#000000",
        color: "rgba(0,0,0,0.48)"
    },
    avatarContainer: {
        alignItems: "center",
        justifyContent: "center",
        padding: 12,
    },
    avatar: {
        width: 24,
        height: 24,
        borderRadius: 100,
    }
});
