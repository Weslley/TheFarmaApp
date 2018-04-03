import { StyleSheet, PixelRatio } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

export default EStyleSheet.create({
  container: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center"
  },
  icon: {
    width: 24,
    height: 24
  },
  badge: {
    position: "absolute",
    top: 1,
    right: 1,
    backgroundColor: "#FF1967"
  },
  text: {
    fontSize: 11,
    fontFamily: 'Roboto-Bold'
  }
});