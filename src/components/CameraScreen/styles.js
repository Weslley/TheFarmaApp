import EStyleSheet from "react-native-extended-stylesheet";
export default EStyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
    },
    preview: {
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 5,
        backgroundColor: 'transparent',
        borderColor: '#FFF',
        marginTop: 15,
    },
    OK: {
        position: 'absolute',
        right: 100,
        top: 20,
        backgroundColor: 'transparent',
        color: '#FFF',
        fontWeight: '600',
        fontSize: 17,
    },
    cancel: {
        position: 'absolute',
        right: 20,
        top: 20,
        backgroundColor: 'transparent',
        color: '#FFF',
        fontWeight: '600',
        fontSize: 17,
    },
    flipButton: {
        flex: 0.3,
        height: 40,
        marginHorizontal: 2,
        marginBottom: 10,
        marginTop: 10,
        borderRadius: 8,
        borderColor: 'white',
        borderWidth: 1,
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    picButton: {
        backgroundColor: 'darkseagreen',
    },
    galleryButton: {
        backgroundColor: 'indianred',
    },
    viewButton: {
        height: 100,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    viewFoto: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    flipText: {
        color: 'white',
        fontSize: 15,
    },
});
