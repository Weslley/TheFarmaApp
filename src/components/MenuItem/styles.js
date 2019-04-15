import EStyleSheet from "react-native-extended-stylesheet";

export default EStyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "Roboto-Bold",
    fontSize: 16,
    color: "$textColorPrimary"
  }
});
