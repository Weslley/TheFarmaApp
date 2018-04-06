import EStyleSheet from "react-native-extended-stylesheet";
export default EStyleSheet.create({
  icon: {
    width: 24,
    height: 24
  },
  row: {
    paddingVertical: 20,
    marginHorizontal: 24
  },
  label: {
    fontFamily: "Roboto-Regular",
    fontSize: 12,
    color: "rgba(0,0,0,0.48)",
    marginBottom: 8
  },
  info: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    color: "rgba(0,0,0,0.80)"
  },
  button: {
    width: '45%',
    borderRadius: 8,
    borderColor: 'transparent',
    backgroundColor: "#50E3C2",
    shadowOpacity: 0,
  },
  buttonText: {
    fontFamily: "Roboto-Bold",
    fontSize: 16,
    color: "rgba(0,0,0,0.80)"
  },
  buttonDirection: {
    backgroundColor: "#23E5F6"
  },
  footer: {
    borderTopColor: "#CCC",
    borderTopWidth: 1,
    backgroundColor: "#FFFFFF",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 20
  },
});
