import { StyleSheet, PixelRatio } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
    container: {
        justifyContent: "center",
        backgroundColor: "$background",
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 8,
        overflow: 'visible',
    },
    actions: {
        marginHorizontal: -24,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        minHeight: 48,
    },
    menuLeft: {

    },
    menuRight: {

    },
    image: {
        marginTop: -40,
        alignSelf: 'center',
        height: 144,
        width: 144,
    },
    profileContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    title: {
        paddingTop: 8,
        fontSize: 32,
        fontFamily: 'Roboto-Bold',
        color: '#030303',
    },
    subtitle: {
        fontFamily: 'Roboto-Light',
        fontSize: 14,
        color: 'rgba(0,0,0,0.80)'
    },
    avatarContainer: {
        alignItems: "center",
        justifyContent: "center"
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 100,
    },
    separator: {
        marginTop: 8,
        width: '100%',
        height: 1,
        backgroundColor: '$separator'
    }
})