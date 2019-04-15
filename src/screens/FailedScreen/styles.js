import EStyleSheet from "react-native-extended-stylesheet";
export default EStyleSheet.create({
  title: {
    fontFamily: "Roboto-Light",
    color: "rgba(0,0,0,0.80)",
    fontSize: 24,
    textAlign: "center",
    marginTop: 75,
    marginBottom: 16,
    width: '100%'
  },
  subtitle: {
    fontFamily: "Roboto-Regular",
    color: "rgba(0,0,0,0.80)",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 46,
    width: '100%'
  },
  footer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0
  },
  button: {
    width: "100%"
  },
  buttonText: {
    fontFamily: "Roboto-Bold",
    fontSize: 16,
    color: "rgba(0,0,0,0.80)"
  },
});
