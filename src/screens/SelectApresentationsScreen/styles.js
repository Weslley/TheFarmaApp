import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
    label: {
        fontFamily: 'Roboto-Regular',
        fontSize: 12,
        color: 'rgba(0,0,0,0.80)',
        marginBottom: 8,
    },
    labelDisabled: {
        color: 'rgba(0,0,0,0.40)',
    },
    labelError: {
        color: '#E91E63'
    },
    placeholder: {
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        color: 'rgba(0,0,0,0.40)'
    },
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
    },
    checkboxDisabled: {
        backgroundColor: 'rgba(0,0,0,0.04)',
        borderWidth: 0
    },
    dialog: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    titleDialog: {
        fontFamily: 'Roboto-Bold',
        fontSize: 16,
        color: '#000000',
        textAlign: 'center',
        paddingVertical: 14,
        borderColor: 'rgba(0,0,0,0.04)',
        borderBottomWidth: 1
    },
    btnDefault: {
        width: '48%', 
        borderColor: 'rgba(0,0,0,0.24)',
        backgroundColor: 'transparent'
    },
    btnSelected: {
        width: '48%', 
        backgroundColor: 'rgba(56,191,192,0.16)',
        borderColor: '#38BFC0'
    },
    btnTextDefault: {
        fontFamily: 'Roboto-Bold',
        fontSize: 14,
        color: '#000'
    },
    btnTextSelected: {
        fontFamily: 'Roboto-Bold',
        fontSize: 14,
        color: '#38BFC0',
        textAlign: 'center'
    },
    ctnGeneric:{
        backgroundColor: '#FFFFFF',
        borderColor: 'rgba(0,0,0,0.16)',
        borderWidth: 0.7,
        borderRadius: 8,
        marginRight: 8,
        padding: 8,
        width: 105,
        height: 130,
        alignItems: 'center',
        justifyContent: 'center'
    },
    ctnGenericSelected:{
        borderColor: '#38BFC0'
    },
    imgGeneric: {
        width: 88,
        height: 88
    }
});

export default styles;