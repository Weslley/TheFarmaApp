import EStyleSheet from "react-native-extended-stylesheet";
export default EStyleSheet.create({
    item: {
        marginRight: 24
    },
    label: {
        fontFamily: "Roboto-Regular",
        fontSize: 12,
        color: "rgba(0,0,0,0.80)",
    },
    input: {
        paddingLeft: 0,
        marginLeft: 0,
        fontFamily: "Roboto-Bold",
        fontSize: 16,
        color: "#000000"
    },
    flagContainer: {
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderColor: "#000",
        borderWidth: 1,
        borderRadius: 4,
        position: "absolute",
        right: 1
    },
    flagText: {
        fontFamily: 'Roboto-Bold',
        fontSize: 8,
    },
    inputError: {
        fontFamily: 'Roboto-Regular',
        fontSize: 12,
        color: '#E91E63'
    }
});
