import EStyleSheet from "react-native-extended-stylesheet";
export default EStyleSheet.create({
    headerBar: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: 'transparent'
    },
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    containerPhoto: {
    },
    formItem: {
        width: '100%',
        paddingHorizontal: 20,
        marginBottom: 24,
    },
    labelItem: {
        fontFamily: "Roboto-Light",
        fontSize: 14,
        color: "$textColorPrimary",
    },
    input: {
        width: '100%',
        fontFamily: "Roboto-Medium",
        color: "$textColorPrimary",
        fontSize: 16,
        paddingBottom: 0,
    },
    inputError: {
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        color: '#E91E63',
        textAlign: 'left'
    },
    loading: {
        backgroundColor: '#FFF',
        opacity: 0.7,
        flex: 1,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center"
    }
});
