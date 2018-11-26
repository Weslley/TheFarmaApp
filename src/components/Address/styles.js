import EStyleSheet from "react-native-extended-stylesheet";
export default EStyleSheet.create({
  background: {
    backgroundColor: "#FFFFFF"
  },
  container: {
    width: "100%",
    paddingVertical: 20,
  },
  header: {
    width: '100%',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 24,
    marginBottom: 10
  },
  addressName: {
    fontFamily: "Roboto-Bold",
    fontSize: 16,
    color: "rgba(0,0,0,0.80)",
  },
  text: {
    fontSize: 14,
    width: '100%',
    textAlign: 'left',
    color: 'rgba(0,0,0,0.80)',
    fontFamily: 'Roboto-Light',
  }
});
