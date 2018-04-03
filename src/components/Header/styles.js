import { StyleSheet, PixelRatio } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

export default EStyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: "$background",
    paddingVertical: 8
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: 48
  },
  menuLeft: {
    position: "absolute",
    left: 0
  },
  menuRight: {
    position: "absolute",
    right: 0
  }
});
