import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
    checkbox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

        paddingHorizontal: 16,
        paddingVertical: 12,
        borderWidth: 0.6,
        borderRadius: 4,
        borderColor: 'rgba(0,0,0,0.24)',
    },
    checkboxText: {
        fontFamily: 'Roboto-Black',
        fontSize: 14,
        color: 'rgba(0,0,0,0.80)'
    }
});

export default styles;