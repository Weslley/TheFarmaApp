import { StyleSheet, PixelRatio } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

export default EStyleSheet.create({
    container: {
        width: '100%',        
        flexDirection: 'row',
        paddingTop: 23,
        paddingBottom: 22
    },
    image: {
        alignSelf: "center",
        height: 24,
        width: 24,
        marginRight: 16
    },
    text: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        color: 'rgba(0,0,0,0.80)'
    }
});
