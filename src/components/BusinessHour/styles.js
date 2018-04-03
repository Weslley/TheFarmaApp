import EStyleSheet from "react-native-extended-stylesheet";

export default EStyleSheet.create({
  container: {
    flexDirection: "row",    
    justifyContent: "space-between",
    marginBottom: 16
  },
  label: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "rgba(0,0,0,0.32)"
  },
  value: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    color: "rgba(0,0,0,0.80)"
  }
});
