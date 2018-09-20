import EStyleSheet from "react-native-extended-stylesheet";
export default EStyleSheet.create({
    background: {
        width: null,
        height: null,
        resizeMode: "contain",
        position: "absolute",
        left: 0,
        right: 0,
        top: 370,
        bottom: 0
    },
    title: {
        fontFamily: 'Roboto-Bold',
        fontSize: 24,
        color: 'rgba(0,0,0,0.87)',
        letterSpacing: 0,
        lineHeight: 28,
        marginBottom: 16,
    },
    text: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        color: 'rgba(0,0,0,0.64)',
        letterSpacing: 0,
        lineHeight: 28
    },
    button: {
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.63)',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.48)',
        borderRadius: 4
    },
    buttonText: {
        fontFamily: 'Roboto-Medium',
        fontSize: 16,
        color: 'rgba(0,0,0,0.80)',
        textAlign: "center"
    }
})