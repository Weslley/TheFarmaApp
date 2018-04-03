import EStyleSheet from "react-native-extended-stylesheet";
export default EStyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
  background: {
    backgroundColor: "#FFFFFF"
  },
  container: { 
    width: "100%",
    paddingVertical: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8
  },
  addressName: {
    fontFamily: "Roboto-Bold",
    fontSize: 16,
    color: "rgba(0,0,0,0.80)",
  },
  text: {
    width: '100%',
    textAlign: 'left',
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: 'rgba(0,0,0,0.80)'
  }
});