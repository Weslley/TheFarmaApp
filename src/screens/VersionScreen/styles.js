import EStyleSheet from "react-native-extended-stylesheet";
export default EStyleSheet.create({
    headerBar: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: 'transparent'
    },
    header: {
        backgroundColor: '#009999',
        alignItems: 'center',
        paddingVertical: 24,
        paddingHorizontal: 20,
    },
    logo: {
        width: 75,
        height: 75,
        marginBottom: 16,
    },
    version: {
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        color: 'rgba(255,255,255,0.80)',
        textAlign: 'center'
    },
    title: {
        fontFamily: 'Roboto-Bold',
        fontSize: 16,
        color: '#FFFFFF',
        marginBottom: 16,
    },
    container: {
        paddingHorizontal: 24,
        paddingVertical: 32,
    },
    text: {
        fontFamily: 'Roboto-Light',
        fontSize: 16,
        color: 'rgba(0, 0, 0, 0.48)',
        marginBottom: 16,
    }
});
