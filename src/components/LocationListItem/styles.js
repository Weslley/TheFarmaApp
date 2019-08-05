import EStyleSheet from "react-native-extended-stylesheet";
export default EStyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
    },
    icon: {
        paddingRight: 16,
        flex: .5
    },
    title: {
        fontFamily: 'Roboto-Medium',
        fontSize: 14,
        color: '#000000',
        textAlign: 'left'
    },
    subtitle: {
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        color: 'rgba(0,0,0,0.48)',
        textAlign: 'left'
    }
});
