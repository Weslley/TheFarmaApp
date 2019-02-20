import EStyleSheet from "react-native-extended-stylesheet";

export default EStyleSheet.create({
  background: {
    flex: 1,
    width: null,
    height: null,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 8,
  },
  text: {
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 16,
  },
  button: {
    width: "100%",
    marginBottom: 10,
    borderColor: "#FFF",
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    alignItems: 'center', 
    justifyContent: 'center'
  },
  buttonText: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    color: "rgba(0,0,0,0.80)",
    letterSpacing: 0,
  },
  inputError: {
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    color: '#E91E63'
  },
  InfoText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.48)',
    letterSpacing: 0,
    lineHeight: 14,
  },
  InfoTextBold: {
    fontFamily: 'Roboto-Medium',
    color: 'rgba(0, 0, 0, 0.80)',
  }
});
