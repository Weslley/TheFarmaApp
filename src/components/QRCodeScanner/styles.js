import EStyleSheet from "react-native-extended-stylesheet";
export default EStyleSheet.create({
    mainContainer: {
        flex: 1
    },
    infoView: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    camera: {
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    rectangleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    rectangle: {
        height: 250,
        width: 250,
        borderWidth: 2,
        borderColor: '#00FF00',
        backgroundColor: 'transparent',
    },
});
