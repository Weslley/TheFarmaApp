import EStyleSheet from "react-native-extended-stylesheet";
export default EStyleSheet.create({
    tabIcon: {
        width: 24,
        height: 24
    },
    list: { 
        paddingBottom: 90,
        borderWidth: 1,
    },
    listItem: {
        marginTop: 0,
        paddingTop: 0,
        marginLeft: 0,
        marginBottom: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
        paddingVertical: 0,
        marginRight: 0
    },
    rowFront: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 24,
	},
    rowBack: {
        flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#FFFFFF',
		justifyContent: 'space-between',
		paddingLeft: 15,
    },
    backRightBtn: {
		alignItems: 'center',
		bottom: 0,
		justifyContent: 'center',
		position: 'absolute',
		top: 0,
		width: 75
	},
	backRightBtnLeft: {
		backgroundColor: '#3674d8',
		right: 75
	},
	backRightBtnRight: {
		backgroundColor: '#d83666',
		right: 0
	},
});
