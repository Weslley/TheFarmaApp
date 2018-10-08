import EStyleSheet from "react-native-extended-stylesheet";
export default EStyleSheet.create({
  button: {
    width: "100%",
    borderRadius: 8,
    backgroundColor: "#0077FF",
    borderColor: '#0077FF'
  },
  buttonContent: {
    width: '100%', 
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    color: "#FFF",
    marginRight: 8,
  },
  buttonIcon: {}
});
